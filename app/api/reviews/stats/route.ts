import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers"


export async function GET ()  {
    let getUserId = await cookies()
    const userId = getUserId.get("auth")?.value

    if(!userId){
        return Response.json({
            message: "Id del usuario no encontrado"
        }, {status: 401}
    )}

    const todayDate = new Date()
    const last30Day = new Date(todayDate)

    last30Day.setDate(todayDate.getDate() - 30)
    
    const last60Day = new Date(last30Day)

    last60Day.setDate(last30Day.getDate() - 30)

    const actualReviews = await prisma.review.findMany({
        where: {
            userId: userId,
            createdAt: {
                gte:last30Day,
                lte: todayDate
            }
        },
        include: {
            analisis: true,
        },
    })

    const pastReviews = await prisma.review.findMany({
        where: {
            userId: userId,
            createdAt:{
                gte:last60Day,
                lt:last30Day
            }
        },
        include: {
            analisis: true,
        },
    })

    //Funcion para calcular numero total de sentimientos
    const calculateSentiments = (reviewPeriods:any[]) => {
        let positiveReviews = 0
        let negativeReviews = 0
        let neutralReviews = 0

        reviewPeriods.forEach((reviewPeriod:any) => {
            if(reviewPeriod.analisis?.sentiment === "positive"){
                positiveReviews++
            }else if(reviewPeriod.analisis?.sentiment === "negative"){
                negativeReviews++
            }else if(reviewPeriod.analisis?.sentiment === "neutral"){
                neutralReviews++
            }
        })

        let totalReviews = positiveReviews + negativeReviews + neutralReviews
        
        return{
            positiveReviews,
            negativeReviews,
            neutralReviews,
            totalReviews
        }
    }
    
    //Datos para KPIS
    const actualStats = calculateSentiments(actualReviews)

    const pastStats = calculateSentiments(pastReviews)

    //Funcion para calcular diferencia de porcentaje respecto periodo anterior 
    const calculatePercentaje = (past:number, actual:number) => {
        if(past === 0 && actual === 0){
            return 0
        }else if(past === 0){
            return 100
        }else{
            return Math.round(((actual - past) / past) * 100)
        }
    }
    //Datos para KPIS
    const positivePercentajeDifferenceVSLastPeriod = calculatePercentaje(pastStats.positiveReviews, actualStats.positiveReviews)
    const negativePercentajeDifferenceVSLastPeriod = calculatePercentaje(pastStats.negativeReviews, actualStats.negativeReviews)
    const neutralPercentajeDifferenceVSLastPeriod = calculatePercentaje(pastStats.neutralReviews, actualStats.neutralReviews)
    const totalPercentajeDifferenceVSLastPeriod = calculatePercentaje(pastStats.totalReviews, actualStats.totalReviews)


    const totalOfTotalReviews = await prisma.review.count({
        where: {
            userId: userId
        }
    })
    //Para calcular datos totales
    const totalReviews = await prisma.review.findMany({
        where: {
            userId: userId,
        },
        include: {
            analisis: true,
            product: true
        },
    })

    //Datos de Graficas
    const totalStats = calculateSentiments(totalReviews)
    
    let delivery = 0
    let quality = 0
    let price = 0
    let product = 0
    let refund = 0
    let other = 0
    
    totalReviews.forEach(totalReview => {
        totalReview.analisis?.themes?.forEach((theme:string) => {
            if(theme === "delivery"){
                    delivery++
            }else if(theme === "quality"){
                    quality++
            }else if(theme === "price"){
                    price++
            }else if(theme === "product"){
                    product++
            }else if(theme === "refund"){
                    refund++
            }else if(theme === "other"){
                    other++
            }
        })
    });

    const reviewsTable = totalReviews.map((review:any) => ({
        date: review.createdAt,
        sentiment: review.analisis?.sentiment,
        rating: review.rating,
        content: review.content,
        themes: review.analisis?.themes,
        summary: review.analisis?.summary,
        recomendations: review.analisis?.recommendations,
        productName: review.product.name,
        productCategory: review.product.category,
        image: review.product.image
    }))

    

    const getStatsForGraph = async () => {
        const totalReviewsForGraph = await prisma.review.findMany({
            where: {
                userId: userId,
            },
            include: {
                analisis: true,
            },
            orderBy:{
                createdAt:"asc"
            }
        })
        
        let statsArray:any[] = []

        totalReviewsForGraph.forEach((review:any) => {
    
            const months = [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ]

            const month = months[review.createdAt.getMonth()]

            let thingsInArray = statsArray.find((item:any) => item.month === month)
            
            if(!thingsInArray){
                thingsInArray = {
                    month: month,
                    positive: 0,
                    negative: 0,
                    neutral: 0
                }

                statsArray.push(thingsInArray)
            }

            if (review.analisis?.sentiment === "positive") {
                thingsInArray.positive++
            } else if (review.analisis?.sentiment === "negative") {
                thingsInArray.negative++
            } else if (review.analisis?.sentiment === "neutral") {
                thingsInArray.neutral++
            }
        })
        return statsArray
    }

    const reviews = await prisma.review.findMany({
        where:{
            userId: userId
        }
    })

    const stars: Record<number, number>= {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    }

    reviews.forEach((review:any) => {
        if(review.rating >= 1 && review.rating <= 5){
            stars[review.rating]++
        }

    })
    
    const monthsStatsArray = await getStatsForGraph()
    
    return Response.json({
        kpis:{
            totalReviews: totalOfTotalReviews,
            positiveReviews: actualStats.positiveReviews,
            negativeReviews: actualStats.negativeReviews,
            neutralReviews: actualStats.neutralReviews
        },
        percentaje:{
            totalReviewsPercentaje: totalPercentajeDifferenceVSLastPeriod,
            positiveReviewsPercentaje: positivePercentajeDifferenceVSLastPeriod,
            negativeReviewsPercentaje: negativePercentajeDifferenceVSLastPeriod,
            neutralReviewsPercentaje: neutralPercentajeDifferenceVSLastPeriod
        },
        totalSentiments:{
            positive: totalStats.positiveReviews,
            negative:totalStats.negativeReviews,
            neutral:totalStats.neutralReviews,
            total: totalStats.totalReviews
        },
        themes:{
            delivery: delivery,
            quality: quality,
            price: price,
            product: product,
            refund: refund,
            other: other

        },
        table: reviewsTable,
        mothsArray: monthsStatsArray,
        stars: stars
    })
}