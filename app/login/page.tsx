"use client"

import Image from "next/image"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import FakeReviewGraph from "@/components/authMockCards/Graphic"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState(true)

    async function handleAuth(event:React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        try{
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            const data = await response.json()
            
            if(data){
                if(response.status === 200) {
                    router.push('/dashboard')
                }else{
                    setSuccess(false)
                    setMessage(data.message)
                }
                
            }
        }
        
        catch (error) {
            console.error(error)
        }
    } 


    
    return (
        <>
            <div className="flex flex-col gap-5 text-black bg-white min-h-screen px-4 lg:bg-gray-200 lg:flex lg:items-center lg:justify-center lg:p-5">
                <div className="flex flex-col text-black bg-white w-full lg:max-w-6xl lg:min-h-[700px] lg:rounded-2xl lg:flex lg:flex-row lg:p-4 lg:gap-18">
                    <div className="flex flex-col gap-5 w-full lg:w-43/100 p-4 lg:p-10">
                        <div className="flex flex-col">
                            <Image src="/logo-black-shopai.svg" alt="Logo de ShopAI" width={100} height={20}/>
                            <div className="flex flex-col gap-3">
                                <h1 className="text-4xl">Tus métricas te esperan</h1>
                                <p className="text-gray-500">Entra y revisa el rendimiento de tu tienda</p>
                            </div>
                        </div>

                        <form onSubmit={handleAuth} className="flex flex-col gap-5 relative">
                            <div className="flex flex-col gap-2">
                                <p className="text-sm">Email</p>
                                <input 
                                    type="email" 
                                    placeholder="Introduce correo" 
                                    className={`border rounded-xl h-12 px-2 text-sm ${success? 'border-gray-300' : 'border-red-400'}`}
                                    value={email}
                                    onChange={(e)=> {
                                        setEmail(e.target.value)
                                        setSuccess(true)}
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm">Contraseña</p>
                                <input 
                                    type="password"
                                    placeholder="Introduce contraseña" 
                                    className={`border rounded-xl h-12  px-2 text-sm ${success ? 'border-gray-300' : 'border-red-400'}`}
                                    value={password}
                                    onChange={(e)=> {
                                        setPassword(e.target.value)
                                        setSuccess(true)}
                                    }
                                />
                            </div>
                            <p className={`text-xs text-red-400 ${success ? 'hidden' : 'block'}`}>{message}</p>
                            <button 
                                type="submit" 
                                className="bg-black text-white rounded-xl h-12 w-full cursor-pointer"
                            >Iniciar Sesión</button>
                        </form>
                        {/* <div className="flex items-center my-2">
                            <div className="flex-1 h-[1px] bg-gray-300"></div>
                                <span className="mx-4 text-gray-500 text-sm">or</span>
                            <div className="flex-1 h-[1px] bg-gray-300"></div>
                        </div>
                        <button type="button" className="flex justify-center items-center h-12 border border-gray-300 mt-1 w-full rounded-xl gap-3">
                            <Image src="/logo-google.png" alt= "Logo Google" width={21} height={21} />
                            <span>Sign in with Google</span>
                        </button>  */}

                        
                        <p className="text-gray-500 text-sm flex justify-center gap-2">Aún no tienes cuenta? <Link href="/signup" className="text-black font-semibold">Registrate</Link> </p>
                    </div>

                    <div className="hidden lg:block lg:w-1/2 lg:rounded-2xl lg:bg-gradient-to-b lg:from-gray-900 lg:via-indigo-950 lg:to-indigo-900 border border-white/10 shadow-2xl">
                        <FakeReviewGraph />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login