import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers"
import OpenAI from "openai"

export async function POST () {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })

    let getUserId = await cookies()
    const userId = getUserId.get("auth")?.value
    
    if(!userId){
        return Response.json({
            message: "Id del usuario no encontrado"
        }, {status: 401}
    )}
    const searchReviews = await prisma.review.findMany({
        where: {
            userId: userId,
        },
        include: {
            analisis: true,
            product: true
        },
    })

    if(searchReviews.length === 0){
        return Response.json({
            hasData: false,
            message: "No hay reseñas"
        }, {status: 200})
    }

    const reviwesNoAnalized = searchReviews.filter((review:any) => {
        if(review.analisis == null){
            return true
        }
    })

    if (reviwesNoAnalized.length === 0){
        return Response.json({
                message: "Todas las reviews ya están analizadas"
            })
    }
    for (let review of reviwesNoAnalized){
        const prompt = 
        `
            Analyze this ecommerce review.

            Review: "${review.content}"
            Rating: ${review.rating}/5
            Product: "${review.product.name}"

            Allowed themes:["delivery","quality","price","product","refund","other"]
            Allowed sentiments:["positive","neutral","negative"]
            Rules:
            - Use only allowed themes
            - Use only allowed sentiments
            - Themes must be lowercase
            - JSON only

            {
                "sentiment":"",
                "summary":"short customer opinion in spanish",
                "recommendations":"Generate one short, highly specific and actionable business recommendation in Spanish for the store owner based on the customer review. Avoid generic advice like 'improve quality' or 'improve customer service'. The recommendation must explain exactly what should be improved.",
                "themes":[]
            }
        `

        const OpenAIResponse = await openai.chat.completions.create({
            model: 
                "gpt-4o-mini",
            messages: 
            [{
                role: "system",
                content: "You are an expert ecommerce review analyst"
            },
            {
                role: "user",
                content: prompt
            }],
            response_format: { type: "json_object" },
            temperature: 0.2,
            max_completion_tokens: 120

        })

        const JSONStringResponse = OpenAIResponse.choices[0].message.content

        if (!JSONStringResponse){
            return Response.json({
            message: "JSON devuelto por OPENAI vacío"
            }, {status: 500})
        }
        
        let ResponseJSONfied

        try{
            ResponseJSONfied = JSON.parse(JSONStringResponse)
        }
        catch(error){
            console.error(error)
            return Response.json({
                message: "Error al convertir la respuesta de OpenAI a JSON"
            }, { status: 500 })
        }
        try{
        await prisma.contentGenerated.upsert({
            where: {
                reviewId: review.id,
            },
            update: {},
            create: {
                sentiment: ResponseJSONfied.sentiment,
                summary: ResponseJSONfied.summary,
                recommendations: ResponseJSONfied.recommendations,
                themes: ResponseJSONfied.themes,
                reviewId: review.id,
                userId: userId
            }
        })
        } catch (error: any) {
            if (error.code === "P2002"){
                console.log("Análisis ya existente para esta review:", review.id)
                continue
            }
            throw error
        }
    }

    return Response.json({
        message: "Reviews analizadas correctamente"
    }, { status: 200 })
      
}