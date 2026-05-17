import { products } from "@/lib/mockData/products";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers"

export async function GET() {
  try{
    let getUserId = await cookies()
    let userId = getUserId.get("auth")?.value

    if(!userId){
      return Response.json({
        menssage: "No se encontro usuario"
      }, {status: 401})
    }

    const salesCount = await prisma.sale.count({
      where: {
        userId: userId
      }
    })

    const hasData = salesCount > 0

    const statsDataBase = await prisma.product.findMany({
      where:{
        userId: userId
      },
      include:{
        sales:true
      }
    })

   

    const products = statsDataBase.map((product)=>{
      let totalSales = 0
      let quantitySold = 0

      product.sales.forEach((sale)=>{
        totalSales += sale.totalSelled
        quantitySold += sale.quantity
      })
      return{
        name: product.name,
        image: product.image,
        price: product.price,
        category: product.category,
        totalEarned: Math.round(totalSales),
        totalProductsSold: Math.round(totalSales),

      }
    })


    let mostSelledCategories: any = []
    for(let products of statsDataBase){
      for(let sales of products.sales){
        let thingsInArray = mostSelledCategories.find((item:any)=>(item.category === products.category))

        if(!thingsInArray){
          mostSelledCategories.push({
            category: products.category,
            productsSelled: sales.quantity
          })
        }else{
          thingsInArray.productsSelled += sales.quantity
        }
      }
    }
    mostSelledCategories.sort((a:any, b:any) => {
      return b.productsSelled - a.productsSelled
    })

    const top5SelledCategories = mostSelledCategories.slice(0,5)

    let totalSales = 0
    let totalIncome = 0
    statsDataBase.forEach((product)=>{
      product.sales.forEach(element => {
        totalSales += element.quantity
        totalIncome += element.totalSelled
      });
    })

    totalIncome = Math.round(totalIncome)
  
    let actualDate = new Date()
    let past30Days = new Date(actualDate)

    past30Days.setDate(actualDate.getDate() - 30)

    let past60Days = new Date(past30Days)
    past60Days.setDate(past30Days.getDate() - 30)

    const actualDataBaseStats = await prisma.sale.findMany({
      where:{
        userId: userId,
        createdAt:{
          gte:past30Days,
          lte:actualDate
        }
      },
      include:{
        product:true
      }
    })

    const pastDataBaseStats = await prisma.sale.findMany({
      where:{
        userId: userId,
        createdAt:{
          gte:past60Days,
          lt:past30Days
        }
      },
      include:{
        product: true
      }
    })

    let actualIncome = 0
    let actualSales = 0

    const channels:any[] = []
    actualDataBaseStats.forEach((sale)=>{
      actualIncome += sale.totalSelled
      actualSales += sale.quantity

      let findChannel = channels.find((item) => item.channel === sale.channel)

      if(findChannel){
        findChannel.channelSells += sale.quantity
      }else{
        channels.push({ channel: sale.channel, channelSells: sale.quantity})
      }
    })

    let pastIncome = 0
    let pastSales = 0

    pastDataBaseStats.forEach((sale)=>{
      pastIncome += sale.totalSelled
      pastSales += sale.quantity
    })

    //Datos KPIs
    const actualAverageTicket = (actualSales === 0 ? 0 : Number((actualIncome / actualSales).toFixed(2)))
    const pastAverageTicket = (pastSales === 0 ? 0 : Number((pastIncome / pastSales).toFixed(2)))


    const calculatePercentaje = (past:number, actual:number) => {
        if(past === 0 && actual === 0){
            return 0
        }else if(past === 0){
            return 100
        }else{
            return Math.round(((actual - past) / past) * 100)
        }
    }

    //Datos KPIs
    const percentageAverageTicket = calculatePercentaje(pastAverageTicket, actualAverageTicket) 
    const percentageProductSelled = calculatePercentaje(pastSales, actualSales)

    const getStatsForSalesGraph = async () => {
      const statsDataBase = await prisma.sale.findMany({
        where:{
          userId: userId
        },
        orderBy:{
          createdAt:"asc"
        }
      })

      const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

      let saleStatsArray:any[] = []
    
      statsDataBase.forEach((sale)=>{
        const monthIndex = sale.createdAt.getMonth()
        const monthName = months[monthIndex]

        const searchIfMonthInArray = saleStatsArray.find((item)=> item.month === monthName)

        if(searchIfMonthInArray){
          searchIfMonthInArray.sales += sale.quantity
          searchIfMonthInArray.income += sale.totalSelled
        }
        else{
          saleStatsArray.push({
            month:monthName,
            sales:sale.quantity,
            income: sale.totalSelled
          })
        }
      })

      saleStatsArray = saleStatsArray.map((item) => {
        return {
          ...item,
          income: Number(item.income.toFixed(2))
        }
      })

      return saleStatsArray
    }

    const salesGraph = await getStatsForSalesGraph()

    

    return Response.json({
      hasData: hasData,
      kpis:{
        totalSales:totalSales,
        totalIncome: totalIncome,
        averageTicket: actualAverageTicket,
        actualSales: actualSales
      },
      percentages:{
        averageTicket: percentageAverageTicket,
        productSelled: percentageProductSelled
      },
      channels: channels,
      salesGraph: salesGraph,
      topSelledCategories: top5SelledCategories,
      products: products
    })
  }

  catch(error){
    console.error(error)
  }

}