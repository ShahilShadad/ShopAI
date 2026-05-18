'use client'
import KpiCards from "@/components/cards/KpiCards"
import GraphicsCard from "@/components/cards/GraphicsCard"
import ReviewsListCard from "@/components/cards/ReviewsListCard"
import VsReviewsGraph from "@/components/reviewComponents/VsReviewsGraphic"
import ReviewsPieChart from "@/components/reviewComponents/ReviewsPieChart"
import ReviewBarChart from "@/components/reviewComponents/ReviewBarChart"
import AppreciationBarChart from "@/components/reviewComponents/AppreciationBarChart"
import SummaryAI from "@/components/reviewComponents/SummaryAI"
import {FaceSmileIcon, FaceFrownIcon, ChatBubbleOvalLeftIcon, MinusIcon} from '@heroicons/react/24/outline'
import { useEffect, useState,} from "react"
import { toast } from "sonner"


const Review = () => {
    
    useEffect(() => {
        graphsData()
    }, [])

    type StatsResponse = {
        kpis: {
            totalReviews: number
            positiveReviews: number
            negativeReviews: number
            neutralReviews: number
        }

        percentaje: {
            totalReviewsPercentaje: number
            positiveReviewsPercentaje: number
            negativeReviewsPercentaje: number
            neutralReviewsPercentaje: number
        }

        totalSentiments: {
            positive: number
            negative: number
            neutral: number
            total: number
        }

        themes: {
            delivery: number
            quality: number
            price: number
            product: number
            refund: number
            other: number
        }

        table: {
            date: string
            sentiment?: string
            rating: number
            content: string
            themes?: string[]
            summary?: string
            recomendations: string
            productName: string
            productCategory: string
            image: string
        }[]

        mothsArray: {
            month: string
            positive: number
            negative: number
            neutral: number
        }[]

        stars: {
            1: number,
            2: number,
            3: number,
            4: number,
            5: number
        }
    }

    const [stats, setStats] = useState<StatsResponse | null>(null)
    const [hasData, setHasData] = useState<boolean>(true)
    const [loading, setLoading] = useState(true)

    async function graphsData(){
        try{
            const responseUpdateReviewDatabase = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await responseUpdateReviewDatabase.json()
            
            if(data){

                if(data.hasData === false){
                    setHasData(false)
                    toast.warning("No hay datos disponibles", {
                        description: "No se encontraron datos de la tienda",
                    })
                }
            }

            const responseFinalStatsFotGraphs = await fetch('/api/reviews/stats', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const response = await responseFinalStatsFotGraphs.json()

            if(response){
                if(responseFinalStatsFotGraphs.status === 200){
                    setStats(response)
                }
            }

        }

        catch(error){
            console.error(error)  
        }
        finally{
            setLoading(false)
        }
    }

    let arrayRamdomized = (stats?.table ?? []).sort (() => Math.random() - 0.5)

    let selectedArrays = arrayRamdomized.slice(0,4)

    let recommendation1 = selectedArrays[0]?.recomendations ?? ""
    let recommendation2 = selectedArrays[1]?.recomendations ?? ""
    let recommendation3 = selectedArrays[2]?.recomendations ?? ""
    let recommendation4 = selectedArrays[3]?.recomendations ?? ""

    if (loading) {
        return (
            <div className="flex h-[300px] items-center justify-center text-gray-500">Cargando estadísticas...</div>
        )
    }
    if(!hasData){
        return (
            <div className="flex h-[300px] flex-col items-center justify-center text-center text-gray-500">
                <p className="font-semibold text-gray-700">No hay datos disponibles</p>
                <p className="text-sm">Carga datos de ejemplo para visualizar las estadísticas.</p>
            </div>
        )
    }
    if(!stats){
        return null
    }
    return (
        <>
        <div className="flex flex-col gap-9 mb-15">
            <div className="text-black lg:mx-5 lg:mt-10 mx-5 mt-7">
                <p className="text-xl lg:text-4xl font-bold">Reseñas</p>
                <p className="text-sm">Analiza lo que opinan tus clientes y mejora su experiencia</p>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 lg:gap-5 mx-2 sm:mx-5 lg:mx-5">
                <KpiCards 
                    bgColorClassName="bg-[rgb(241,238,254)]" 
                    icon={ChatBubbleOvalLeftIcon}
                    color="text-[#411EF5]"
                    alt="Total de reseñas"
                    title="Total de reseñas"
                    price={stats?.kpis?.totalReviews ?? 0}
                />
                <KpiCards 
                    bgColorClassName="bg-[rgb(234,250,239)]" 
                    icon={FaceSmileIcon}
                    color="text-[#00b440]"
                    alt="Reseñas positivas"
                    title="Reseñas positivas"
                    price={stats?.kpis.positiveReviews ?? 0}
                    percentaje= {stats?.percentaje.positiveReviewsPercentaje ?? 0}
                    equal="vs periodo anterior"
                />
                <KpiCards 
                    bgColorClassName="bg-[rgb(253,234,236)]" 
                    icon={FaceFrownIcon}
                    color="text-[#f14757]"
                    alt="Ventas"
                    title="Reseñas negativas"
                    price={stats?.kpis.negativeReviews ?? 0}
                    percentaje={stats?.percentaje.negativeReviewsPercentaje ?? 0}
                    equal="vs periodo anterior"
                />
                <KpiCards 
                    bgColorClassName="bg-[rgb(234,243,254)]" 
                    icon={MinusIcon}
                    color="text-[#2b90fe]"
                    alt="Ventas"
                    title="Reseñas neutras"
                    price={stats?.kpis.neutralReviews ?? 0}
                    percentaje={stats?.percentaje.neutralReviewsPercentaje ?? 0}
                    equal="vs periodo anterior"
                />
            </div>
            <div className="mx-2 sm:mx-5 grid grid-cols-1 xl:grid-cols-3 gap-5">
                <GraphicsCard title="Comparación de sentimiento" >
                    <VsReviewsGraph 
                    arrayStats={stats?.mothsArray ?? []}
                    />
                </GraphicsCard>

                <GraphicsCard title="Sentimiento general" >
                    <ReviewsPieChart 
                    positive={stats?.totalSentiments.positive ?? 0}
                    negative={stats?.totalSentiments.negative ?? 0}
                    neutro={stats?.totalSentiments.neutral ?? 0}
                    />
                </GraphicsCard>

                <GraphicsCard title="Temas Principales">
                    <ReviewBarChart 
                    delivery={stats?.themes.delivery ?? 0}
                    quality={stats?.themes.quality ?? 0}
                    price={stats?.themes.price ?? 0}
                    product={stats?.themes.product ?? 0}
                    refund={stats?.themes.refund ?? 0}
                    other={stats?.themes.other ?? 0}
                    />
                </GraphicsCard>
            </div>
            <div className="mx-2 sm:mx-5">
                <ReviewsListCard 
                reviews={stats?.table ?? []}
                />
            </div>
            <div className="grid lg:grid-cols-2 mx-2 sm:mx-5 gap-5">
                <SummaryAI 
                 recomendations1={recommendation1 ?? ""}
                 recomendations2={recommendation2 ?? ""}
                 recomendations3={recommendation3 ?? ""}
                 recomendations4={recommendation4 ?? ""}
                />
                <GraphicsCard title="Distibución de valoraciones">
                    <AppreciationBarChart 
                    oneStar={stats?.stars[1] ?? 0}
                    twoStar={stats?.stars[2] ?? 0}
                    threeStar={stats?.stars[3] ?? 0}
                    fourStar={stats?.stars[4] ?? 0}
                    fiveStar={stats?.stars[5] ?? 0}
                    />
                </GraphicsCard>
            </div>
        </div>
        </>
    )
}
export default Review