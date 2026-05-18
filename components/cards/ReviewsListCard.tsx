'"use client"'

import Image from "next/image"
import { Star, ArrowLeft, ArrowRight, Maximize2, X, Box, Tag, CalendarDays, Smile, MessagesSquare, ScanText, Lightbulb, Tags } from "lucide-react"

import { useState } from "react"
type CardProps = {
    reviews: Reviews[]

}
type Reviews = {
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
}

const reviewsShown = 5
const ReviewsListCard = ({reviews}: CardProps) => {
    const [full, setFull] = useState(false)
    const [reviewSelected, setReviewSelected] = useState<Reviews | null>(null)
    const [actualPage, setactualPage] = useState(1)

    const allPages = Math.ceil(reviews.length / reviewsShown)

    const startIndex = (actualPage - 1) * reviewsShown
    const endIndex = startIndex + reviewsShown

    const fiveReviewsShownNow = reviews.slice(startIndex, endIndex)

    const randomDashboardColor = () => {
  const hue = Math.random() * 120 + 180
  return `hsl(${hue}, 65%, 65%)`
}
    return(
        <>
        <div className="text-black flex flex-col bg-white shadow-xl rounded-xl gap-5 pb-10">
            <p className="font-bold text-[15px] lg:text-[22px] p-5">Lista de Reseñas</p>
            <table className="w-full text-black">
                <thead>
                    <tr className="border-b border-gray-100 py-3">
                        <th className="text-left p-4 xl:text-base text-sm truncate max-w-[100px]">Reseñas</th>
                        <th className="text-left p-4 xl:text-base text-sm truncate max-w-[100px]">Producto</th>
                        <th className="text-left p-4 hidden xl:table-cell xl:text-base">Sentimiento</th>
                        <th className="text-left p-4 hidden xl:table-cell xl:text-base">Estrellas</th>
                        <th className="text-left p-4 hidden xl:table-cell xl:text-base">Fecha</th>
                        <th className="text-left p-4 xl:text-base text-sm truncate max-w-[100px]">Más</th>
                    </tr>
                </thead>
                <tbody>
                {fiveReviewsShownNow.map((review, index)=>(
                <tr key={index} className="border-b border-gray-100 py-3">
                    <td className="p-4 truncate max-w-[100px] text-sm lg:text-base">{review.content}</td>
                    <td className="p-4 truncate max-w-[100px] text-sm lg:text-base">{review.productName}</td>
                    <td className="p-4 hidden xl:table-cell">{review.sentiment}</td>
                    <td className="p-4 hidden xl:table-cell">
                        <div className="flex gap-1">
                            {[1,2,3,4,5].map((star) => (
                                <Star
                                    key={star}
                                    size={16}
                                    className={star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300" }
                                />
                            ))}
                        </div>
                    </td>
                    <td className="p-4 hidden xl:table-cell">{new Date(review.date).toLocaleDateString("es-ES")}</td>
                    <td className="p-4">
                        <div onClick={() => {
                            setFull(true) 
                            setReviewSelected(review)
                        }} 
                        className="flex justify-center items-center w-6 w-4 lg:w-9 lg:h-7 shadow rounded-lg cursor-pointer">
                            <Maximize2 className="w-3 w-3 lg:w-4 lg:h-4 text-[#411EF5] cursor-pointer" />
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            <div className="flex justify-end items-center gap-3 p-4">

                <button
                    onClick={() => setactualPage(prev => prev - 1)}
                    disabled={actualPage === 1}
                    className="w-9 h-9 rounded-lg bg-gray-100 disabled:opacity-40 flex items-center justify-center"
                >
                    <ArrowLeft size={20} />
                </button>

                <p className="text-sm font-medium">
                    {actualPage} / {allPages}
                </p>

                <button
                    onClick={() => setactualPage(prev => prev + 1)}
                    disabled={actualPage === allPages}
                    className="w-9 h-9 rounded-lg bg-gray-100 disabled:opacity-40 flex items-center justify-center"
                >
                    <ArrowRight size={20} />
                </button>

            </div>
        </div>
        {full && reviewSelected &&
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 text-black">
                <div className="relative bg-white w-[90%] max-w-7xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 flex flex-col gap-5 overflow-y-scroll no-scrollbar">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <h1 className="font-bold text-lg xl:text-2xl">Detalles de la reseña</h1>
                        <button onClick={() => setFull(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition">
                            <X className="w-6 h-6 xl:w-7 xl:h-7 text-gray-600 cursor-pointer" />
                        </button>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row">
                        <div className="flex flex-col lg:min-w-lg">
                            <div className="flex gap-10 lg:flex-col">
                                <div className="lg:px-15">
                                    <Image src={reviewSelected.image} alt={reviewSelected.productName} width={500} height={500} className="rounded-xl w-[200px] h-auto"/>
                                </div>
                                <div className="flex flex-col lg:flex-row lg:flex lg:flex-col lg:gap-10">
                                    <div className="lg:flex lg:flex-col gap-5">
                                        <div className="flex flex-col">
                                            <span className="flex items-center gap-2 items-center">
                                                <aside><Box className="w-4 h-4 md:w-5 md:h-5"/></aside>
                                                <h1 className="text-sm md:text-base">Producto</h1>
                                            </span>
                                            <span className="px-7 font-bold text-sm md:base">{reviewSelected.productName}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="flex items-center gap-2">
                                                <aside><Tag className="w-4 h-4 md:w-5 md:h-5 items-center"/></aside>
                                                <h1 className="text-sm md:text-base">Categoria</h1>
                                            </span>
                                            <span className="px-7 font-bold text-sm md:base">{reviewSelected.productCategory}</span>
                                        </div>
                                    </div>
                                    <div className="lg:flex lg:flex-col gap-5">
                                        <div className="flex flex-col">
                                            <span className="flex items-center gap-2 items-center">
                                                <aside><CalendarDays className="w-4 h-4 md:w-5 md:h-5"/></aside>
                                                <h1 className="text-sm md:text-base">Fecha</h1>
                                            </span>
                                            <span className="px-7 font-bold text-sm md:base">{new Date(reviewSelected.date).toLocaleDateString("en-GB", {day: "numeric",month: "short",year: "numeric"})}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="flex items-center gap-2 items-center">
                                                <aside><Smile className="w-4 h-4 md:w-5 md:h-5"/></aside>
                                                <h1 className="text-sm md:text-base">Sentimiento</h1>
                                            </span>
                                            <span className="flex flex-col px-7 py-1"> 
                                                <p 
                                                className={`flex items-center justify-center font-bold rounded-lg max-w-[100px] text-sm md:base ${reviewSelected.sentiment === "positive" ? "bg-green-100 text-green-700" : reviewSelected.sentiment === "negative" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"} `}
                                                >
                                                {reviewSelected.sentiment} 
                                                </p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col p-3 gap-2">
                                <div className="flex gap-2">
                                    <aside><Star className="w-4 h-4 md:w-5 md:h-5 items-center"/> </aside>
                                    <h1 className="md:text-base text-sm">Calificación</h1>
                                </div>
                                <div className="rounded-lg gap-2 border border-gray-100 p-3 flex items-center justify-around">
                                    <aside className="flex">
                                        {[1,2,3,4,5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-5 h-5 md:w-7 md:h-7 ${star <= reviewSelected.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                            />
                                        ))}
                                    </aside>
                                    <aside className="font-bold text-base md:text-lg">{reviewSelected.rating} / 5</aside>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-col p-3 gap-2">
                                <div className="flex gap-2 items-center">
                                    <aside><MessagesSquare className="w-4 h-4 md:w-5 md:h-5"/> </aside>
                                    <h1 className="md:text-base text-sm">Contenido reseña</h1>
                                </div>
                                <div className="rounded-lg gap-2 bg-gray-100 p-3">
                                    <p className="md:text-base text-sm">{reviewSelected.content}</p>
                                </div>
                            </div>
                            <div className="flex flex-col p-3 gap-2">
                                <div className="flex gap-2 items-center">
                                    <aside><ScanText  className="w-4 h-4 md:w-5 md:h-5"/> </aside>
                                    <h1 className="md:text-base text-sm">Resumen IA</h1>
                                </div>
                                <div className="rounded-lg gap-2 bg-[#f4f1fd] p-3">
                                    <p className="md:text-base text-sm">{reviewSelected.summary}</p>
                                </div>
                            </div>
                            <div className="flex flex-col p-3 gap-2">
                                <div className="flex gap-2 items-center">
                                    <aside><Tags className="w-4 h-4 md:w-5 md:h-5"/> </aside>
                                    <h1 className="md:text-base text-sm">Temas identificados</h1>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {reviewSelected.themes?.map((theme, key)=>(
                                        <p key={key} className="md:text-base text-sm inline-flex items-center px-2 py-0.5 xl:px-2 rounded-lg bg-[#efebfd] text-[#7b68e6]">{theme}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col p-3 gap-2">
                                <div className="flex gap-2 items-center">
                                    <aside><Lightbulb className="w-4 h-4 md:w-5 md:h-5"/> </aside>
                                    <h1 className="md:text-base text-sm">Recomendación IA</h1>
                                </div>
                                <div className="rounded-lg gap-2 bg-[#f3faf6] p-3">
                                    <p className="md:text-base text-sm">{reviewSelected.recomendations}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default ReviewsListCard