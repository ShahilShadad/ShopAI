'use client'
import Image from "next/image";
import Link from 'next/link'
import { use, useState } from "react";
import { useRouter } from 'next/navigation'

const Signup = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState(true)

    const router = useRouter()

    async function handleAuth(event:React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        try{
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name
                })
            })

            const data = await response.json()
            
            if(data){
                if(response.status === 201) {
                    setMessage(data.message)
                    router.push('/login')
                }else{
                    setSuccess(false)
                    setMessage(data.message)
                }
            }
        }
        catch (error){
            console.error(error)
        }
    }
    return (
        <>
            <div className="flex flex-col gap-5 text-black bg-white min-h-screen px-4 lg:bg-gray-200 lg:flex lg:items-center lg:justify-center lg:p-5">
                <div className="flex flex-col text-black bg-white w-full lg:max-w-6xl lg:rounded-2xl lg:flex lg:flex-row lg:p-4 lg:gap-18">
                    <div className="flex flex-col gap-5 w-full lg:w-43/100 p-4 lg:p-10">
                        <div className="flex flex-col">
                            <Image src="/logo-black-shopai.svg" alt="Logo de ShopAI" width={100} height={20}/>
                            <div className="flex flex-col gap-3">
                                <h1 className="text-4xl">Todo tu negocio, en un solo lugar</h1>
                                <p className="text-gray-500">Empieza a analizar y mejorar tu rendimiento</p>
                            </div>
                        </div>

                        <form className="flex flex-col gap-5" onSubmit={handleAuth}>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm">Nombre</p>
                                <input 
                                    type="text" placeholder="Introduce nombre" 
                                    className="border border-gray-300 rounded-xl h-12 px-2 text-sm"
                                    onChange={(e) => {
                                        setName(e.target.value)
                                        setSuccess(true)
                                    }}
                                ></input>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm">Email</p>
                                <input 
                                    type="text" placeholder="Introduce correo" 
                                    className="border border-gray-300 rounded-xl h-12 px-2 text-sm"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        setSuccess(true)
                                    }}
                                ></input>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm">Contraseña</p>
                                <input 
                                    type="password"
                                    placeholder="Introduce contraseña" 
                                    className="border border-gray-300 rounded-xl h-12  px-2 text-sm"
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        setSuccess(true)
                                    }}
                                />
                            </div>
                            <p className={`text-xs text-red-400 ${success ? 'hidden' : 'block'}`}>{message}</p>
                            <button 
                                type="submit" 
                                className="bg-black text-white rounded-xl h-12 w-full cursor-pointer"
                            >Registrarse</button>
                        <p className="text-gray-500 text-sm flex justify-center gap-2">Ya tienes cuenta? <Link href="/login" className="text-black font-semibold">Inicia Sesión</Link> </p>
                        </form>
                        {/* <div className="flex items-center my-2">
                            <div className="flex-1 h-[1px] bg-gray-300"></div>
                                <span className="mx-4 text-gray-500 text-sm">or</span>
                            <div className="flex-1 h-[1px] bg-gray-300"></div>
                        </div> */}
                        {/* <button className="flex justify-center items-center h-12 border border-gray-300 mt-1 w-full rounded-xl gap-3">
                            <img src="/logo-google.png" className="w-5 h-5" />
                            <span>Sign in with Google</span>
                        </button> */}
                    </div>

                    <div className="hidden lg:block lg:w-1/2 lg:bg-purple-300 lg:rounded-2xl"></div>
                </div>
            </div>
        </>
    )
}

export default Signup