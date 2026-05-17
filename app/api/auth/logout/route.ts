import { cookies } from "next/headers"

export async function POST() {

    let saveLogin = await cookies()
    saveLogin.delete("auth")

    return Response.json({
        message: "Usuario Deslogeado"
    }, {status: 200})
}