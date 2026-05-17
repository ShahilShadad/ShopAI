import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest){
    const isLogged = request.cookies.get("auth")

    const path = request.nextUrl.pathname

    const routedPrivate = ["/dashboard", "/sales", "/review", "/social"]

    const routeFind = routedPrivate.find ((route) =>
        path.startsWith(route)
    )

    const urlNext = new URL("/login", request.url)

    console.log(path)
    if(!isLogged && routeFind){
        return NextResponse.redirect(urlNext)
    }else{
        return NextResponse.next()
    }
}