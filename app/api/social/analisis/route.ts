import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers"
import OpenAI from "openai"

export async function POST() {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })
    const getUserId = cookies()
    const userId = (await getUserId).get("auth")?.value

    if(!userId){
        return Response.json({
            message: "Usuario no encontrado"
        }, {status:401})
    }

    const socialMedias = await prisma.socialMediaAccount.findMany({
        where:{
            userId: userId
        },
        include:{
            posts: {
                include: {
                    comments: {
                        include: {
                            analisis: true
                        }
                    }
                }
            }
        }
    })

    let noAnalisedComments:any[] = []
    for(let socialMedia of socialMedias){
        for(let post of socialMedia.posts){
            for(let comment of post.comments){
                if(comment.analisis == null){
                    let dataToAnalise = {
                        postId: post.id,
                        postTitle: post.title,
                        postContent: post.content,
                        comment: comment
                    }

                    noAnalisedComments.push(dataToAnalise)
                }
            }
        }
    }

    if(noAnalisedComments.length === 0){
        return Response.json({
            message: "Todos los comentarios analizados"
        })
    }

    let arrayOfDataForAnalisis:any[] = []

    noAnalisedComments.forEach((item)=>{

        let thingsInArrayOfDataForAnalisis = arrayOfDataForAnalisis.find((data)=> data.postId === item.postId)

        if(!thingsInArrayOfDataForAnalisis){
            arrayOfDataForAnalisis.push({
                postId: item.postId,
                postTitle: item.postTitle,
                postContent: item.postContent,
                comments: [item.comment]
            })
        }else{
            thingsInArrayOfDataForAnalisis.comments.push(item.comment)
        }
    })

    for (let dataForAnalisis of arrayOfDataForAnalisis){
        const prompt = 
        `
            Analyze this social media post and its comments.

            The post is promoting a product.

            Post title: "${dataForAnalisis.postTitle}"
            Post content: "${dataForAnalisis.postContent}"
            Comments: ${JSON.stringify(dataForAnalisis.comments.map((comment:any) => comment.content))}

            Return ONLY valid JSON:

            {
                "summary": "short summary of audience opinion in spanish",
                "improvement": "one specific improvement based on repeated feedback in spanish"
            }
        `

        const OpenAIResponse = await openai.chat.completions.create({
        model:
            "gpt-4.1-mini",
        messages:
        [{
            role: "system",
            content: 
                `You analyze audience feedback for product promotion posts.
                    Rules:
                        - Return concise answers.
                        - Base the improvement ONLY on repeated user feedback.
                        - Avoid generic marketing advice.
                        - Give different improvements for different posts.
                `
        },
        {
            role:"user",
            content: prompt
        }],
        response_format: {type: "json_object"},
        temperature: 0.2,
        max_completion_tokens: 250
    })

    const JSONStringResponse = OpenAIResponse.choices[0].message.content

    if(!JSONStringResponse){
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

    for (let comment of dataForAnalisis.comments) {
        try {
            await prisma.commentsContentGenerated.create({
                data: {
                    summary: ResponseJSONfied.summary,
                    improvement: ResponseJSONfied.improvement,
                    commentId: comment.id
                }
            })
        }
        catch (error: any) {
            if (error.code === "P2002") {
                console.log("Análisis ya existente para este comentario:", comment.id)
                continue
            }
            throw error
        }
    }
}
    return Response.json({
        message: "Análisis generados correctamente"
    })
}