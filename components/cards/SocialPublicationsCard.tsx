
import Image from "next/image"
import { FaInstagram, FaFacebook, FaLinkedin, FaPinterest, FaReddit, FaSnapchat, FaYoutube, FaTiktok } from "react-icons/fa"
import {FaThreads, FaXTwitter } from "react-icons/fa6"
import { useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, X, Heart, MessageCircle, TrendingUp, Eye, Share2, Calendar, Captions, MessageSquareText, Globe,MessageSquare,Send, ChartNoAxesColumn,Activity } from "lucide-react"

type Post = {
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
}

type CardProps = {
  allPosts: Post[]
}

const reviewsShown = 5
const SocialPublicationCard = ({allPosts}:CardProps) => {
    const [full, setFull] = useState(false)
    const [postSelected, setpostSelected] = useState<Post | null>(null)
    const [actualPage, setactualPage] = useState(1)
    
    const allPages = Math.ceil(allPosts.length / reviewsShown)
    
    const startIndex = (actualPage - 1) * reviewsShown
    const endIndex = startIndex + reviewsShown
    
    const fiveReviewsShownNow = allPosts.slice(startIndex, endIndex)
    const socialMediaIcons = {
        Instagram: <FaInstagram className="text-pink-500 w-5 h-5" />,
        Facebook: <FaFacebook className="text-blue-500 w-5 h-5" />,
        LinkedIn: <FaLinkedin className="text-blue-700 w-5 h-5" />,
        TikTok: <FaTiktok className="text-black w-5 h-5" />,
        Twitter: <FaXTwitter className="text-sky-500 w-5 h-5" />,
        X: <FaXTwitter className="text-black w-5 h-5" />,
        YouTube: <FaYoutube className="text-red-500 w-5 h-5" />,
        Pinterest: <FaPinterest className="text-red-600 w-5 h-5" />,
        Reddit: <FaReddit className="text-orange-500 w-5 h-5" />,
        Snapchat: <FaSnapchat className="text-yellow-400 w-5 h-5" />,
        Threads: <FaThreads className="text-black w-5 h-5" />
    }
    return(
        <>
        <div className="text-black flex flex-col bg-white shadow-xl rounded-xl gap-5 pb-10">
            <p className="font-bold text-[15px] lg:text-[22px] p-5">Lista de Publicaciones</p>
            <table className="w-full text-black">
                <thead>
                    <tr className="border-b border-gray-100 py-3">
                        <th className="text-left p-4 xl:text-base text-sm">Publicación</th>
                        <th className="text-left p-4 hidden xl:table-cell xl:text-base">Plataforma</th>
                        <th className="text-left p-4 hidden xl:table-cell xl:text-base">Fecha</th>
                        <th className="text-left p-4 xl:text-base text-sm">Engagement</th>
                        <th className="text-left p-4 xl:text-base text-sm">Más</th>
                    </tr>
                </thead>
                <tbody>
                    {fiveReviewsShownNow.map((post, index)=>(
                    <tr key={index} className="border-b border-gray-100">
                        <td className="p-4">
                            <div className="flex items-center gap-4">
                                <Image src={post.image} alt={post.title} width={80} height={80} className="rounded-lg hidden xl:table-cell" />
                                <div className="min-w-0">
                                    <h1 className="font-bold p-4 truncate max-w-[150px] md:max-w-[350px] text-sm lg:text-base">{post.title}</h1>
                                    <p className="text-gray-500 p-4 truncate max-w-[150px] md:max-w-[350px] text-sm lg:text-base">{post.content}</p>
                                </div>
                            </div>
                        </td>
                        <td className="p-4 hidden xl:table-cell">
                            <div className="flex items-center gap-2">
                                 {socialMediaIcons[post.socialMedia as keyof typeof socialMediaIcons]}
                                <p>{post.socialMedia}</p>
                            </div>
                        </td>
                        <td className="p-4 hidden xl:table-cell">
                            <p>{new Date(post.date).toLocaleDateString("en-GB", {day: "numeric", month: "short"})}</p>
                        </td>
                        <td className="p-4">
                            <span className={`inline-flex items-center rounded-lg  px-2.5 py-1 text-xs lg:text-base font-semibold ${post.engagement >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{post.engagement}%</span>
                        </td>
                        <td className="p-4">
                            <div onClick={() => {
                            setFull(true) 
                            setpostSelected(post)
                            }} 
                            className="flex justify-center items-center w-6 w-4 md:w-9 md:h-7 shadow rounded-lg cursor-pointer">
                                <Maximize2 className="w-3 w-3 md:w-4 md:h-4 text-[#411EF5] cursor-pointer" />
                            </div>
                        </td>
                    </tr>
                        )
                    )}
                </tbody>
            </table>
            <div className="flex justify-end items-center gap-3 p-4">

                <button
                    onClick={() => setactualPage(prev => prev - 1)}
                    disabled={actualPage === 1}
                    className="w-9 h-9 rounded-lg bg-gray-100 disabled:opacity-40 flex items-center justify-center cursor-pointer"
                >
                    <ArrowLeft size={20} />
                </button>

                <p className="text-sm font-medium">
                    {actualPage} / {allPages}
                </p>

                <button
                    onClick={() => setactualPage(prev => prev + 1)}
                    disabled={actualPage === allPages}
                    className="w-9 h-9 rounded-lg bg-gray-100 disabled:opacity-40 flex items-center justify-center cursor-pointer"
                >
                    <ArrowRight size={20} />
                </button>

            </div>
        </div>
        {full && postSelected &&
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 text-black">
                <div className="relative bg-white w-[90%] max-w-7xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 flex flex-col overflow-y-scroll no-scrollbar ">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <h1 className="font-bold text-base sm:text-lg xl:text-2xl">Detalles de publicación</h1>
                        <button onClick={() => setFull(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition">
                            <X className="w-6 h-6 xl:w-7 xl:h-7 text-gray-600 cursor-pointer" />
                        </button>
                    </div>
                    <div className="flex flex-col gap-3 lg:flex-row lg:mt-10 lg:justify-center">
                        <div className="flex flex-col gap-3 lg:max-w-lg">
                            <div className="flex flex-col gap-10 justify-center items-center lg:items-start mb-3 lg:mb-2">
                                <Image src={postSelected.image} width={500} height={400} alt={postSelected.title} className="h-auto border rounded-2xl lg:w-[400px] lg:h-[300px]"/>
                            </div>
                            <div className="flex flex-col">
                                <span className="flex items-center gap-2">
                                    <aside><Calendar size={20} /></aside>
                                    <h1>Fecha de publicación</h1>
                                </span>
                                <span className="px-7 font-bold">{new Date(postSelected.date).toLocaleDateString("en-GB", {day: "numeric", month: "short"})}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="flex items-center gap-2">
                                    <aside><Captions className="w-5 h-5" /></aside>
                                    <h1>Título</h1>
                                </span>
                                <span className="px-7 font-bold">{postSelected.title}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="flex items-center gap-2">
                                    <aside><MessageSquareText className="w-5 h-5" /></aside>
                                    <h1>Contenido</h1>
                                </span>
                                <span className="px-7">{postSelected.content}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <h1>Plataforma</h1>
                                <span className="flex gap-2 bg-gray-100 shadow rounded-xl p-4 items-center">
                                    <aside>{socialMediaIcons[postSelected.socialMedia as keyof typeof socialMediaIcons]}</aside>
                                    <p>{postSelected.socialMedia}</p>
                                </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="w-full lg:min-w-[200px] flex flex-col gap-2 border border-gray-200 shadow rounded-xl p-4">
                                    <span className="flex items-center gap-5">
                                        <aside><Heart className="w-7 h-7 text-red-500" /></aside>
                                        <h1>Me gusta</h1>
                                    </span>
                                    <span className="px-13 text-2xl">{postSelected.likes}</span>
                                </div>
                                <div className="w-full lg:min-w-[200px] flex flex-col gap-2 border border-gray-200 shadow rounded-xl p-4 ">
                                    <span className="flex items-center gap-5">
                                        <aside><MessageSquare  className="w-7 h-7 text-blue-500" /></aside>
                                        <h1>Comentarios</h1>
                                    </span>
                                    <span className="px-13 text-2xl">{postSelected.comments}</span>
                                </div>
                                <div className="w-full lg:min-w-[200px] flex flex-col gap-2 border border-gray-200 shadow rounded-xl p-4 ">
                                    <span className="flex items-center gap-5">
                                        <aside><Send    className="w-7 h-7 text-amber-500" /></aside>
                                        <h1>Compartidos</h1>
                                    </span>
                                    <span className="px-13 text-2xl">{postSelected.shares}</span>
                                </div>
                                <div className="w-full lg:min-w-[200px] flex flex-col gap-2 border border-gray-200 shadow rounded-xl p-4 ">
                                    <span className="flex items-center gap-5">
                                        <aside><ChartNoAxesColumn className="w-7 h-7 text-purple-500" /></aside>
                                        <h1>Impresiones</h1>
                                    </span>
                                    <span className="px-13 text-2xl">{postSelected.impressions}</span>
                                </div>
                            </div>
                            <div className={`flex ${postSelected.engagement >= 0 ? "bg-green-100 border border-green-200" : "bg-red-100 border border-red-200"} rounded-xl p-4 justify-between shadow`}>
                                <span className="flex items-center gap-5">
                                    <aside><Activity  className={`w-7 h-7 ${postSelected.engagement >= 0 ? "text-green-500" : "text-red-500"}`} /></aside>
                                    <h1>Engagement</h1>
                                </span>
                                <span className={`px-13 text-2xl  ${postSelected.engagement >= 0 ? "text-green-500" : "text-red-500"}`}>{postSelected.engagement}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default SocialPublicationCard