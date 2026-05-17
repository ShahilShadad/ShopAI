import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers"

export async function GET() {
  try{
    let getUserId = await cookies()
    let userId = getUserId.get("auth")?.value

    if(!userId){
      return Response.json({
        message: "No se encontró Id del usuario"
      }, {status: 401})
    }

    const countSocialMedia = await prisma.socialMediaAccount.count({
      where:{
        userId: userId
      }
    })

    const hasData = countSocialMedia > 0

    const socialMediaData = await prisma.socialMediaAccount.findMany({
      where:{
        userId: userId
      },
      include:{
        posts: {
          include: {
            comments:{
              include:{
                analisis: true
              }
            }
          }
        }
      }
    })

    

    let totalFollowers = 0
    let totalLike = 0
    let totalComments = 0
    let totalShares = 0
    let totalImpression = 0
    for(let socialMedia of socialMediaData){
      totalFollowers += socialMedia.followers
      for(let post of socialMedia.posts){
        totalLike += post.likes
        totalComments += post.comments.length
        totalShares += post.shares
        totalImpression += post.impressions
      }
    }

    const engagement = totalImpression===0 ? 0 : Math.round(((totalLike + totalComments + totalShares)/totalImpression) * 100)

    let actualDate = new Date()
    let last30Days = new Date(actualDate)

    last30Days.setDate(actualDate.getDate() - 30)

    let last60Days = new Date(last30Days)
    last60Days.setDate(last30Days.getDate()-30)

    const actualData = await prisma.socialMediaAccount.findMany({
      where: {
        userId: userId
      },
      include:{
        posts:{
          where:{
            createdAt:{
              gte: last30Days,
              lte: actualDate
            }
          },
          include: {
            comments: true
          }
        }
      }
    })

    const pastData = await prisma.socialMediaAccount.findMany({
      where: {
        userId: userId
      },
      include:{
        posts:{
          where:{
            createdAt:{
              gte: last60Days,
              lt: last30Days
            }
          },
          include: {
            comments: true
          }
        }
      }
    })

    let postLast30Days = 0
    let impressionsLast30Days = 0
    for(let socialMedia of actualData){
      for(let post of socialMedia.posts){
        postLast30Days++
        impressionsLast30Days += post.impressions
      }
    }

    let postLast60Days = 0
    let impressionsLast60Days = 0
    for(let socialMedia of pastData){
      for(let post of socialMedia.posts){
        postLast60Days++
        impressionsLast60Days += post.impressions
      }
    }

    const percentagePosts = postLast60Days === 0 ? 0 : Math.round(((postLast30Days - postLast60Days) / postLast60Days) * 100)
    const impressionPercentage = impressionsLast60Days === 0 ? 0 : Math.round(((impressionsLast30Days - impressionsLast60Days) / impressionsLast60Days) * 100)

    let arrayFollowers:any[] = []
    socialMediaData.forEach((socialAcc:any)=>{
      let thingInArrayFollowers = arrayFollowers.find((item:any)=>(socialAcc.platform === item.platform))
      
        if(!thingInArrayFollowers){
            arrayFollowers.push({
              platform: socialAcc.platform,
              followers: socialAcc.followers
            })
        }else{
          thingInArrayFollowers.followers += socialAcc.followers
        }
    })

    const commentsAnalisis = await prisma.commentsContentGenerated.findMany({
      where: {
        comment: {
          post: {
            socialMediaAccount: {
              userId: userId
            }
          }
        }
      },
      distinct: ["summary", "improvement"],
      select: {
        summary: true,
        improvement: true
      }
    })

    const posts = socialMediaData.flatMap((acc:any)=>{
      return acc.posts.map((post:any)=>{
        let interactions = post.likes + post.comments.length + post.shares
        const engagement = post.impressions === 0 ? 0 : Math.round((interactions / post.impressions) * 100)

        return{
          date: post.createdAt,
          title: post.title,
          content: post.content,
          image: post.image,
          likes: post.likes,
          comments: post.comments.length,
          shares: post.shares,
          impressions: post.impressions,
          socialMedia: acc.platform,
          engagement: engagement,
        }
      })
    })

    const best15Posts = posts
    .sort((a:any, b:any) => b.engagement - a.engagement)
    .slice(0, 15)

    let graph:any[] = []

    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    socialMediaData.forEach((socialAcc:any) => {
      socialAcc.posts.forEach((post:any)=>{
        const month = months[new Date(post.createdAt).getMonth()]
        let thingsInGraph = graph.find((data:any)=> data.month === month)

        if(!thingsInGraph){
          thingsInGraph = {
            month,
            likes: 0,
            comments: 0,
            shares: 0,
            impressions: 0,
            followers: 0
          }
          graph.push(thingsInGraph)
        }
        thingsInGraph.likes += post.likes
        thingsInGraph.comments += post.comments.length
        thingsInGraph.followers += socialAcc.followers
        thingsInGraph.impressions += post.impressions
        thingsInGraph.shares += post.shares
      })
    })

    return Response.json({
      hasData: hasData,
      kpis: {
        totalFollowers: totalFollowers,
        totalEngagement: engagement,
        posts: postLast30Days,
        impressions: impressionsLast30Days
      },
      percentage:{
        postPercentage: percentagePosts,
        impressionsPercentage:impressionPercentage
      },
      followersBySocialMedia:arrayFollowers,
      graphData: graph,
      commentsAnalisis: commentsAnalisis,
      bestPosts: best15Posts,
      allPosts: posts,

    })
  }catch(error){
    console.error(error)
    return Response.json({
      message: "Error al obtener datos de redes sociales"
    }, { status: 500 })
  }
}