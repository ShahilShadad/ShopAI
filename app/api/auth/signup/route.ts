import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request:Request) {
    const data = await request.json()
    
    const searchUser = await prisma.user.findUnique({
        where: ({
            email: data.email
        })
    })
    
    const rgexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
    
    if(!data.name || !data.email|| !data.password){
        return Response.json({
            message: "Datos incorrectos" 
        }, {status: 400})
    }
    
    if(searchUser){
        return Response.json({
            message: "Usuario existe"
        }, {status: 400})
    }

    if(!rgexPass.test(data.password)){
        return Response.json({
            message: "Contraseña inválida "
        }, {status: 400})
    }
    
    const encryptedPass = await bcrypt.hash(data.password, 10)

    await prisma.user.create({
        data:{
            email: data.email,
            password: encryptedPass,
            name: data.name
        }
    })

    return Response.json({
        message: "Usuario registrado"
    }, {status: 201})
    
}