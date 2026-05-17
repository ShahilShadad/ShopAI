"use client"

import { LayoutDashboard, BarChart3,MessagesSquare,Share2, LogOut } from "lucide-react"
import Link from 'next/link'
import { usePathname } from "next/navigation";
import Image from 'next/image';
import { useRouter } from 'next/navigation'

const Sidebar = () => {
    const pathname = usePathname()
    const router = useRouter()

    async function handleClick() {
        try{
            const response = await fetch('/api/auth/logout', {method: 'POST'})

            const data = await response.json()

            if (response.ok) {
                router.push("/login")
            }

        }
        catch(error){
            console.error(error)
        }
    }

    return(
        <>
            <div className='flex flex-col lg:gap-5 px-3 pt-3 fixed bottom-0 left-0 z-50 w-full h-[72px] bg-[#0F172A] xl:top-0 xl:bottom-auto xl:w-[260px] xl:h-screen'>
                <div className="flex justify-center">
                    <Image src={"/logo-shopai.svg"} alt="Logo shopAI"  width={150} height={150} className='hidden xl:block'/>
                </div>
                <div className="flex flex-row xl:flex-col items-center xl:items-stretch justify-center xl:justify-between h-full px-3 xl:px-3 xl:py-6 text-xs lg:text-base">
                    <div className="flex flex-row xl:flex-col gap-2 xl:gap-3">
                    <Link 
                        href="/dashboard" 
                        className={`px-4 py-3 rounded-2xl transition-all duration-200 
                            ${pathname === "/dashboard" ? "bg-[#7C3AED]/15 text-white font-semibold border border-[#A855F7]/20 shadow-lg shadow-violet-500/10" : "text-[#CBD5E1] hover:bg-[#1E293B] hover:text-[#F8FAFC]"}`
                        }>
                        <div className="flex items-center gap-2">
                            <LayoutDashboard size={25} />
                            <p className="hidden xl:block">Dashboard</p>
                        </div>
                    </Link>
                
                    <Link
                        href="/sales"
                        className={`px-4 py-3 rounded-2xl transition-all duration-200 
                            ${pathname === "/sales" ? "bg-[#7C3AED]/15 text-white font-semibold border border-[#A855F7]/20 shadow-lg shadow-violet-500/10" : "text-[#CBD5E1] hover:bg-[#1E293B] hover:text-[#F8FAFC]"}`
                        }>
                        <div className="flex items-center gap-2">
                            <BarChart3 size={25}/>
                        <p className="hidden xl:block">Ventas</p>
                        </div>
                    </Link>
                
                    <Link
                        href="/review"
                        className={`px-4 py-3 rounded-2xl transition-all duration-200 
                            ${pathname === "/review" ? "bg-[#7C3AED]/15 text-white font-semibold border border-[#A855F7]/20 shadow-lg shadow-violet-500/10" : "text-[#CBD5E1] hover:bg-[#1E293B] hover:text-[#F8FAFC]"}`
                        }> 
                        <div className="flex items-center gap-2">
                            <MessagesSquare size={25}/>
                            <p className="hidden xl:block">Reseñas</p>
                        </div>
                    </Link>
                
                    <Link
                        href="/social"
                        className={`px-4 py-3 rounded-2xl transition-all duration-200 
                            ${pathname === "/social" ? "bg-[#7C3AED]/15 text-white font-semibold border border-[#A855F7]/20 shadow-lg shadow-violet-500/10" : "text-[#CBD5E1] hover:bg-[#1E293B] hover:text-[#F8FAFC]"}`
                        }>
                        <div className="flex items-center gap-2">
                            <Share2 size={25}/>
                            <p className="hidden xl:block">Redes Sociales</p>
                        </div>
                    </Link>
                    </div>
                    <div>
                    <button
                        onClick={handleClick}
                        className="text-left px-4 py-3 rounded-2xl transition-all duration-200 text-[#CBD5E1] hover:bg-[#1E293B] hover:text-[#F8FAFC] cursor-pointer"
                        >
                        <div className="flex items-center gap-2">
                            <LogOut size={25}/>
                            <p className="hidden xl:block">Cerrar Sesión</p>
                        </div>
                    </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar