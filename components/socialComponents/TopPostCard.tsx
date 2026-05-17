import Image from "next/image"
import { Eye, Heart, MessageCircle } from "lucide-react"

type CardProps = {
    top:number,
    img: string,
    alt: string,
    title:string,
    platform: string,
    date: string,
    likes: number,
    comms: number,
    impressions: number
}

const TopPostCard = ({top, img, alt, title, platform, date, likes, comms, impressions}:CardProps) => {
    return(
        <>
        <div className="flex gap-3 p-5 shadow-md rounded-2xl border border-gray-100">
            <div>
                <div className="flex">
                    <Image src={img} alt={alt} width={100} height={100} />
                </div>
            </div>
            <div className="flex flex-col justify-center gap-2">
                <div>
                    <h1 className="font-bold">{title}</h1>
                </div>
                <div className="flex gap-5">
                    <p>{platform}</p>
                    <p>{date}</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex gap-1">
                        <Heart className="w-5 h-5 "/>
                        <p>{likes}</p>
                    </div>
                    <div className="flex gap-1">
                        <MessageCircle  className="w-5 h-5 "/>
                        <p>{comms}</p>
                    </div>
                    <div className="flex gap-1">
                        <Eye className="w-5 h-5"/>
                        <p>{impressions}</p>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default TopPostCard