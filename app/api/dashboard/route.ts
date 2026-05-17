import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers"
import type { Sale, Review, Post, SocialMediaAccount, Product } from "@prisma/client"

export async function GET() {
    try{
    let getUserId = await cookies()
    const userId = getUserId.get("auth")?.value

    if(!userId){
        return Response.json({
            message: "Id del usuario no encontrado"
        }, {status: 401}
    )}

    const user = await prisma.user.findUnique({
        where:{
            id: userId
        }
    })

    const salesCount = await prisma.sale.count({
        where: {
            userId: userId
        }
    })

    const hasData = salesCount > 0

    if(!hasData){
        return Response.json({
            hasData: false,
            message: "No se encontro datos"
        }, {status: 200})
    }

    const todayDate = new Date()
    const last30Day = new Date(todayDate)
    last30Day.setDate(todayDate.getDate() - 30)

    const last60Day = new Date(last30Day)
    last60Day.setDate(last30Day.getDate() - 30)

    const actualSales = await prisma.sale.findMany({
        where: {
            userId: userId,
            createdAt: {
                gte: last30Day,
                lte: todayDate
            }
        }
    })

    const pastSales = await prisma.sale.findMany({
        where: {
            userId: userId,
            createdAt: {
                gte: last60Day,
                lt: last30Day
            }
        }
    })

    const actualReviews = await prisma.review.findMany({
        where:{
            userId: userId,
            createdAt: {
                gte: last30Day,
                lt: todayDate
            },
            analisis:{
                isNot: null
            }
        }
    })

    const pastReviews = await prisma.review.findMany({
        where:{
            userId: userId,
            createdAt:{
                gte:last60Day,
                lt:last30Day
            },
            analisis:{
                isNot:null
            }
        }
    })

    
    let actualTotalSales = 0
    actualSales.forEach((sale) => {
        actualTotalSales += sale.quantity
    })

    let pastTotalSales = 0
    pastSales.forEach((sale) => {
        pastTotalSales += sale.quantity
    })

    let actualIncome = 0
    actualSales.forEach((sale)=>{
        actualIncome += Number(sale.totalSelled)
    })


    let pastIncome = 0
    pastSales.forEach((sale)=>{
        pastIncome += Number(sale.totalSelled)
    })
    
    let actualReviewsAnalised = 0
    actualReviews.forEach((review)=>{
        actualReviewsAnalised++
    })

    let pastReviewsAnalised = 0
    pastReviews.forEach((review)=>{
        pastReviewsAnalised++
    })    

    const calculatePercentaje = (past:number, actual:number) => {
        if(past === 0 && actual === 0){
            return 0
        }else if(past === 0){
            return 100
        }else{
            return Math.round(((actual - past) / past) * 100)
        }
    }

    const actualPosts = await prisma.post.findMany({
        where:{
            createdAt: {
                gte: last30Day,
                lte: todayDate
            },
            socialMediaAccount:{
                userId: userId
            }
        }
    }) 

    const pastPosts = await prisma.post.findMany({
        where:{
            createdAt: {
                gte: last60Day,
                lt: last30Day
            },
            socialMediaAccount:{
                userId: userId
            }
        }
    }) 

    const totalPosts = await prisma.post.findMany({
        where:{
            socialMediaAccount:{
                userId: userId
            }
        }
    })

    let totalPostsCounter = 0
    totalPosts.forEach((post)=>{
        totalPostsCounter++
    })

    let actualTotalSocialMediaStats = 0

    actualPosts.forEach((element) => {
        actualTotalSocialMediaStats += (
            element.likes +
            element.totalComments +
            element.shares
        )

    })

    let pastTotalSocialMediaStats = 0

    pastPosts.forEach((element) => {
        pastTotalSocialMediaStats += (
            element.likes +
            element.totalComments +
            element.shares
        )
        
    })

    const socialMedia = await prisma.socialMediaAccount.findMany({
        where:{
            userId: userId,
        }
    })

    let followers = 0
    socialMedia.forEach((element)=>{
        followers += element.followers
    })

    const calculateEngagement = (followers:number, stats:number) => {
        let engagement = 0
        if(followers === 0 || totalPostsCounter === 0){
            engagement = 0
        }else{
            engagement = Math.round((stats / (followers * totalPostsCounter)) * 100)
        }

        return engagement
    }

    const actualEngagement = calculateEngagement(followers, actualTotalSocialMediaStats)
    const pastEngagement = calculateEngagement(followers, pastTotalSocialMediaStats)

    const salesPercentage = calculatePercentaje(pastTotalSales,actualTotalSales)
    const incomePercentage = calculatePercentaje(pastIncome, actualIncome)
    const reviewsAnalizedPercentage = calculatePercentaje(pastReviewsAnalised, actualReviewsAnalised)
    const engagementPercentage = calculatePercentaje(pastEngagement, actualEngagement)


    const getStatsFotSalesGraph = async () => { 

        const totalProducts = await prisma.product.findMany({
            where: {
                userId: userId,
            },
            include: 
            {
                sales:{
                    orderBy:{
                        createdAt:"asc"
                    }
                },
                reviews:{
                    orderBy:{
                        createdAt:"asc"
                    }
                } 
            }
        })

        let saleStatsArray:any[] = []
        let reviewStatsArray:any[] = []
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

        const higestSelledProducts:any[] = []
        totalProducts.forEach((product)=>{
            //Precio productos vendidos totales

            let thingsInhigestSelledProducts = higestSelledProducts.find(
                (item) => item.product === product.name
            )

            if(!thingsInhigestSelledProducts){
                thingsInhigestSelledProducts = {
                    product: product.name,
                    image: product.image,
                    totalSelled: 0,
                }
                higestSelledProducts.push(thingsInhigestSelledProducts)
            }

            //ProductosVendidos por Mes
            product.sales.forEach(sale => {
                const saleMonth = months[sale.createdAt.getMonth()]
                let thingsInSaleArray = saleStatsArray.find((item) => item.month === saleMonth)
                if(!thingsInSaleArray){
                    thingsInSaleArray = {
                        month: saleMonth,
                        totalSales: 0 
                    }
                    saleStatsArray.push(thingsInSaleArray)
                }
                thingsInSaleArray.totalSales += sale.quantity
                
                thingsInhigestSelledProducts.totalSelled += Number(sale.totalSelled)
            }); 

            product.reviews.forEach((review)=>{
                const reviewMonth = months[review.createdAt.getMonth()]
                let thingsInReviewArray = reviewStatsArray.find((item) => item.month === reviewMonth)

                if(!thingsInReviewArray){
                    thingsInReviewArray = {
                        month: reviewMonth,
                        totalReviews: 0 
                    }
                    reviewStatsArray.push(thingsInReviewArray)
                }
                thingsInReviewArray.totalReviews++

            })
            higestSelledProducts.forEach((product) => {
                product.totalSelled = Math.round(product.totalSelled)
            })
        })
        return{
            saleStatsArray, reviewStatsArray, higestSelledProducts
        }
    }

    const graphStats = await getStatsFotSalesGraph()

    graphStats.higestSelledProducts.sort((a,b) => b.totalSelled - a.totalSelled)

    const top3Products = graphStats.higestSelledProducts.slice(0,3)

    actualIncome = Math.round(actualIncome)
    pastIncome = Math.round(pastIncome)
    
    return Response.json({
        hasData: true,
        user: user?.name,
        kpis: {
            totalSales: actualTotalSales,
            income: actualIncome,
            reviewsAnalised: actualReviewsAnalised,
            engagement: actualEngagement
        },
        percentages: {
            sales: salesPercentage,
            income: incomePercentage,
            reviewsAnalised: reviewsAnalizedPercentage,
            engagement: engagementPercentage,
        },
        graphs: {
            sales: graphStats.saleStatsArray,
            reviews: graphStats.reviewStatsArray
        },
        topProducts:{
            products: top3Products
        }
    })

    }catch (error) {
        console.error("ERROR API DASHBOARD:", error)

        return Response.json({
            message: "Error en API dashboard",
            error: String(error)
        }, { status: 500 })
    }
}