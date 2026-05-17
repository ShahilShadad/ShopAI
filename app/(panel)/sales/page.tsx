'use client'

import KpiCards from "@/components/cards/KpiCards"
import GraphicsCard from "@/components/cards/GraphicsCard"

import SaleBarChart from "@/components/salesComponents/SaleBarChart"
import SalesTopProducsCard from "@/components/cards/SalesTopProducsCard"
import { ArrowTrendingUpIcon, ShoppingCartIcon, CubeIcon, CreditCardIcon} from '@heroicons/react/24/outline'

import SalePieChart from "@/components/salesComponents/SalePieChart"
import VSSaleGraph from "@/components/salesComponents/VSSaleGraph"

import { useState, useEffect } from "react"
import { toast } from "sonner"



const Sales = () => {
    useEffect(() => {
            graphsData()
        }, [])

    type StatsResponse = {
        hasData: boolean,
        kpis:{
            totalSales:number,
            totalIncome: number,
            averageTicket: number,
            actualSales: number
        },
        percentages:{
            averageTicket: number,
            productSelled: number
        },
        channels: {
            channel: string,
            channelSells: number
        }[]
        salesGraph: {
            month: string,
            sales: number,
            income: number
        }[]
        topSelledCategories: {
            category: string,
            productsSelled: number
        }[]
        products:{
            name: string,
            image: string,
            price: number,
            category: string,
            totalEarned: number,
            totalProductsSold: number,
        }[]

    }
    const [stats, setStats] = useState<StatsResponse | null>(null)
    const [loading, setLoading] = useState(true)

    async function graphsData(){
        try{
             const responseUpdateReviewDatabase = await fetch('/api/sales', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const response = await responseUpdateReviewDatabase.json()

            if(response){
                if(responseUpdateReviewDatabase.status === 200){
                    setStats(response)

                    if(response.hasData === false){
                        toast.warning("No hay datos disponibles", {
                            description: "No se encontraron datos para mostrar en el dashboard"
                        })
                    }
                }
            }

        }catch(error){
            console.error(error)
        }
        finally{
            setLoading(false)
        }
    }
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
    return (
        <>
        <div className="flex flex-col gap-9 mb-15">
            <div className="text-black lg:mx-5 lg:mt-10 mx-5 mt-7">
                <p className="text-xl lg:text-4xl font-bold">Ventas</p>
                <p className="text-sm">Analiza el rendimiento de tus ventas</p>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 lg:gap-5 mx-2 sm:mx-5 lg:mx-5">
                <KpiCards 
                    bgColorClassName="bg-[rgb(234,250,239)]" 
                    icon={ArrowTrendingUpIcon}
                    color="text-[#00b440]"
                    alt="Ventas Totales"
                    title="Ventas Totales"
                    price={stats?.kpis.totalSales ?? 0}

                />
                <KpiCards 
                    bgColorClassName="bg-[rgb(241,238,254)]" 
                    icon={ShoppingCartIcon}
                    color="text-[#411EF5]"
                    alt="Ingresos Totales"
                    title="Ingresos Totales"
                    price={stats?.kpis.totalIncome ?? 0}
                    symbol="€"

                />
                <KpiCards 
                    bgColorClassName="bg-[rgb(255,243,204)]" 
                    icon={CreditCardIcon}
                    color="text-[#FFBB28]"
                    alt="Ventas"
                    title="Ticket promedio"
                    price={stats?.kpis.averageTicket ?? 0}
                    percentaje={stats?.percentages.averageTicket}
                    equal="vs mes anterior"
                    symbol="€"
                />
                <KpiCards 
                    bgColorClassName="bg-[rgb(234,243,254)]" 
                    icon={CubeIcon}
                    color="text-[#2b90fe]"
                    alt="Ventas"
                    title="Productos vendidos"
                    price={stats?.kpis.actualSales ?? 0}
                    percentaje={stats?.percentages.productSelled ?? 0}
                    equal="vs mes anterior"
                />
            </div>
            <div className="sm:mx-5 mx-2 lg:mx-5 grid lg:grid-cols-2 lg:gap-5 lg:mx-5 gap-5">
                <GraphicsCard title="Ingresos vs Productos">
                    <VSSaleGraph 
                    salesGraph={stats?.salesGraph ?? []}
                    />
                </GraphicsCard>
                <GraphicsCard title="Ventas por Canal" >
                    <SalePieChart 
                    channels={stats?.channels ?? []}
                    /> 
                </GraphicsCard>
            </div>
            <div className="sm:mx-5 mx-2 lg:mx-5 grid lg:grid-cols-2 lg:gap-5 lg:mx-5 gap-5">
                <SalesTopProducsCard 
                    title="Productos vendidos"
                    products={stats?.products ?? []}
                />
                <GraphicsCard title="Categorías más vendidas">
                    <SaleBarChart 
                    data={stats?.topSelledCategories ?? []}
                    />
                </GraphicsCard>
            </div>
        </div>
        </>
    )
}
export default Sales