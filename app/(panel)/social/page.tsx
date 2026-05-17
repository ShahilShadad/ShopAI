'use client'
import KpiCards from "@/components/cards/KpiCards"
import { UserGroupIcon, HeartIcon, ArrowTrendingUpIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline"
import VSEngagmentLikesComms from "@/components/socialComponents/VSEngagmentLikesComms"
import GraphicsCard from "@/components/cards/GraphicsCard"
import SocialTopPostsCard from "@/components/cards/SocialTopPostsCard"
import AIRecomendations from "@/components/socialComponents/AIRecomendations"
import SocialPublicationCard from "@/components/cards/SocialPublicationsCard"
import { useEffect, useState } from "react"
import SocialPieChart from "@/components/socialComponents/SocialPieChart"
import { toast } from "sonner"


const SocialMedia = () => {

    type StatsResponse = {
        hasData: boolean,
        kpis: {
            totalFollowers: number,
            totalEngagement: number,
            posts: number,
            impressions: number
        },
        percentage:{
            postPercentage: number,
            impressionsPercentage:number
        },
        followersBySocialMedia:{
            platform: string,
            followers: number
        }[],
        graphData: {
            month: string,
            likes: number,
            comments: number,
            shares: number,
            impressions: number,
            followers: number
        }[],
        commentsAnalisis: {
            summary: string,
            improvement: string
        }[],
        bestPosts: {
            id: string,
            title: string,
            content: string,
            image: string,
            likes: number,
            comments: number,
            shares: number,
            impressions: number,
            engagement: number
        }[]

        allPosts: {
            date: number,
            title: string,
            content: string,
            image: string,
            likes: number,
            comments: number,
            shares: number,
            impressions: number,
            socialMedia: string
            engagement: number,
        }[]
    }
    useEffect(
        () => { graphsData() }, []
    )
    const [stats, setStats] = useState<StatsResponse | null>(null)

    const [loading, setLoading] = useState(true)
    async function graphsData() {
        try{
            setLoading(true)
            const responseCreateAnlisis = await fetch('api/social/analisis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        
            const responseGetDataBaseStats = await fetch('api/social',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            let response = await responseGetDataBaseStats.json()

            if(responseGetDataBaseStats.status === 200){
                setStats(response)

                if(response.hasData === false){
                    toast.warning("No hay datos disponibles", {
                        description: "No se encontraron datos para mostrar en el dashboard"
                    })
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

    let arrayRamdomized = (stats?.commentsAnalisis ?? []).sort (() => Math.random() - 0.5)

    let selectedArrays = arrayRamdomized.slice(0,5)

    let recommendation1 = selectedArrays[0]?.improvement ?? ""
    let recommendation2 = selectedArrays[1]?.improvement ?? ""
    let recommendation3 = selectedArrays[2]?.improvement ?? ""
    let recommendation4 = selectedArrays[3]?.improvement ?? ""
    let recommendation5 = selectedArrays[4]?.improvement ?? ""

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
                <p className="text-xl lg:text-4xl font-bold">Redes Sociales</p>
                <p className="text-sm">Analiza el rendimiento de tus redes y mejora tu visibilidad</p>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 lg:gap-5 mx-2 sm:mx-5 lg:mx-5">
                <KpiCards 
                    bgColorClassName="bg-[#EEF2FF]" 
                    icon={UserGroupIcon}
                    color="text-[#4F46E5]"
                    alt="Seguidores totales"
                    title="Seguidores Totales"
                    price={stats?.kpis.totalFollowers ?? 0}
                />
                <KpiCards 
                    bgColorClassName="bg-[#FFF7ED]" 
                    icon={HeartIcon}
                    color="text-[#EA580C]"
                    alt="Posts"
                    title="Posts"
                    price={stats?.kpis.posts ?? 0}
                    percentaje={stats?.percentage.postPercentage ?? 0}
                    equal="vs periodo anterior"
                />
                <KpiCards 
                    bgColorClassName="bg-[#F0FDFA]" 
                    icon={ChatBubbleLeftRightIcon}
                    color="text-[#0F766E]"
                    alt="Impresiones"
                    title="Impresiones"
                    price={stats?.kpis.impressions ?? 0}
                    percentaje={stats?.percentage.impressionsPercentage ?? 0}
                    equal="vs periodo anterior"
                />
                <KpiCards 
                    bgColorClassName="bg-[#FEF2F2]" 
                    icon={ArrowTrendingUpIcon}
                    color="text-[#DC2626]"
                    alt="Engagement General"
                    title="Engagement General"
                    price={stats?.kpis.totalEngagement ?? 0}
                    symbol="%"
                />
            </div>
            <div className="mx-2 sm:mx-5 lg:mx-5 grid grid-cols-1 xl:grid-cols-2 gap-5">
                <GraphicsCard title="Likes vs Comentarios">
                    <VSEngagmentLikesComms 
                    data={stats?.graphData ?? []}
                    />
                </GraphicsCard>
                <GraphicsCard title="Seguidores por red social">
                    <SocialPieChart
                    data={stats?.followersBySocialMedia ?? []}
                    />
                </GraphicsCard>
            </div>
            <div className="mx-2 sm:mx-5 lg:mx-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                <AIRecomendations 
                recomendation1={recommendation1 ?? ""}
                recomendation2={recommendation2 ?? ""}
                recomendation3={recommendation3 ?? ""}
                recomendation4={recommendation4 ?? ""}
                recomendation5={recommendation5 ?? ""}
                />
                <SocialTopPostsCard
                bestPosts={stats?.bestPosts ?? []}
                /> 
            </div>
            <div className="mx-2 sm:mx-5 lg:mx-5">
                <SocialPublicationCard 
                allPosts={stats?.allPosts ?? []}
                />
            </div>
        </div>
        </>
    )
}

export default SocialMedia