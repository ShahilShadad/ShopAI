'use client'
import KpiCards from "@/components/cards/KpiCards"
import GraphicsCard from "@/components/cards/GraphicsCard"
import ReviewGraph from "@/components/reviewComponents/ReviewGraph"
import TopProductsCard from "@/components/cards/TopProductsCard"
import SalesGraph from "@/components/salesComponents/SalesGraph"
import { ArrowTrendingUpIcon, ShoppingCartIcon, UserIcon, ChatBubbleLeftRightIcon} from '@heroicons/react/24/outline'
import { useState, useEffect } from "react"
import { toast } from "sonner"

const Dashboard = () => {
    type StatsResponse = {
        hasData: boolean,
        user:string,
        kpis: {
            totalSales: number,
            income: number,
            reviewsAnalised: number,
            engagement: number
        },
        percentages: {
            sales: number,
            income: number,
            reviewsAnalised: number,
            engagement: number,
        },
        graphs:{
            sales: {
                month: string
                totalSales:number
            }[]
            reviews: {
                month: string
                totalReviews: number
            }[]
        }
        topProducts: {
            products: {
                product: string
                totalSelled: number
                image: string
            }[]
        }
    }
    const [stats, setStats] = useState<StatsResponse | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        statsDataBase()
    }, [])

    async function statsDataBase () {
        try{
            const responseStatsDataBase = await fetch('/api/dashboard', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const response = await responseStatsDataBase.json()

            if(response){
                if(responseStatsDataBase.status === 200){
                    setStats(response)
                    if(response.hasData === false){
                        toast.warning("No hay datos disponibles", {
                            description: "No se encontraron datos para mostrar en el dashboard"
                        })
                    }
                }
            }
        }
        catch (error){
            console.error(error)
        }
        finally{
            setLoading(false)
        }
    }

    const topProducts = stats?.topProducts?.products ?? []

    if (loading) {
        return (
            <div className="flex h-[300px] items-center justify-center text-gray-500">Cargando estadísticas...</div>
        )
    }
    if(stats?.hasData === false){
        return (
            <div className="flex h-[300px] flex-col items-center justify-center text-center text-gray-500">
                <p className="font-semibold text-gray-700">No hay datos disponibles</p>
                <p className="text-sm">Carga datos de ejemplo para visualizar las estadísticas.</p>
            </div>
        )
    }
    if(!stats){return null}
    return (
        <>
        <div className="flex flex-col gap-5">
            <div className="text-black lg:mx-5 lg:mt-10 mx-5 mt-7">
                <p className="text-xl lg:text-4xl font-bold">Dashboard</p>
                <p className="">Hola, {stats?.user}</p>
                <p className="text-sm">Aquí tienes el resumen de tu negocio</p>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 lg:gap-5 mx-2 sm:mx-5 lg:mx-5"> 
                <KpiCards
                    bgColorClassName="bg-[rgb(241,238,254)]" 
                    icon={ShoppingCartIcon}
                    color="text-[#411EF5]"
                    alt="Ventas"
                    title="Ventas"
                    price={stats?.kpis.totalSales ?? 0}
                    percentaje={stats?.percentages.sales ?? 0}
                    equal="vs mes anterior"
                />
                <KpiCards
                    bgColorClassName="bg-[rgb(234,250,239)]"  
                    icon={ArrowTrendingUpIcon}
                    color="text-[#00b440]"
                    alt="Ingresos"
                    title="Ingresos"
                    price={stats?.kpis.income ?? 0}
                    percentaje={stats?.percentages.income ?? 0}
                    equal="vs mes anterior"
                    symbol="€"
                />
                <KpiCards
                    bgColorClassName="bg-[rgb(254,244,235)]"  
                    icon={UserIcon}
                    color="text-[#fe7c16]"
                    alt="Reviews Analizadas"
                    title="Reviews Analizadas"
                    price={stats?.kpis.reviewsAnalised ?? 0}
                    percentaje={stats?.percentages.reviewsAnalised ?? 0}
                    equal="vs mes anterior"
                />
                <KpiCards 
                    bgColorClassName="bg-[rgb(234,243,254)]"
                    icon={ChatBubbleLeftRightIcon}
                    color="text-[#2b90fe]"
                    alt="Engagement"
                    title="Engagement"
                    price={stats?.kpis.engagement ?? 0}
                    percentaje={stats?.percentages.engagement ?? 0}
                    equal="vs mes anterior"
                    symbol="%"
                />
            </div>
            <div className="sm:mx-5 mx-2 lg:mx-5 grid lg:grid-cols-2 lg:gap-5 lg:mx-5 gap-5">
                <GraphicsCard title="Ventas en el tiempo">
                    <SalesGraph 
                    sales={stats?.graphs.sales ?? []}
                    />
                </GraphicsCard>
                <GraphicsCard title="Reseñas en el tiempo">
                    <ReviewGraph
                    reviews={stats?.graphs.reviews ?? []}
                    />
                </GraphicsCard>
            </div>
                <div className="flex flex-col gap-3">
                    <h1 className="text-black text-lg sm:gap-4 lg:gap-5 mx-2 sm:mx-5 lg:mx-5 font-bold">Top Productos Vendidos</h1>
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-5 mx-2 sm:mx-5 lg:mx-5">
                        <TopProductsCard
                            product={topProducts?.[0]?.image ?? "/placeholder.png"}
                            alt="Primer Producto más vendido"
                            rank={1}
                            color="bg-red-400" 
                            title={topProducts?.[0]?.product ?? ""}
                            price={topProducts?.[0]?.totalSelled ?? 0}
                        />
                        <TopProductsCard
                            product={topProducts?.[1]?.image ?? "/placeholder.png"}
                            alt=""
                            rank={2}
                            color="bg-orange-500"  
                            title={topProducts?.[1]?.product ?? ""}
                            price={topProducts?.[1]?.totalSelled ?? 0}
                        />
                        <TopProductsCard
                            product={topProducts?.[2]?.image ?? "/placeholder.png"}
                            alt=""
                            rank={3}
                            color="bg-blue-500" 
                            title={topProducts?.[2]?.product ?? ""}
                            price={topProducts?.[2]?.totalSelled ?? 0}

                        />
                    </div>  
                </div>  
        </div>
        </>
    )
}
export default Dashboard