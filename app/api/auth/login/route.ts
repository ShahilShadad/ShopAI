import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

export async function POST(request:Request) {
    const data = await request.json()

    if (!data.email || !data.password){
        return Response.json({
            message: "Faltan Datos"
        }, {status: 400})
    }
    
    const seachUser = await prisma.user.findUnique({
        where: ({
            email: data.email
        })
    })

    if(!seachUser){
        return Response.json({
            message: "Datos incorrectos"
        }, {status: 401})
    }

    const correctPass = await bcrypt.compare(data.password, seachUser.password)

    if (!correctPass){
        return Response.json({
            message: "Datos incorrectos"
        }, {status: 401}
    )}

    let saveLogin = await cookies()
    saveLogin.set(
        "auth", seachUser.id
    )
    return Response.json({
        message: "Usuario Correcto"
    }, {status: 200})
}