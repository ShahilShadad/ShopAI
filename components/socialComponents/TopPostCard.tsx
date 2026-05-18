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
                    <h1 className="font-bold text-sm lg:text-base">{title}</h1>
                </div>
                <div className="flex gap-5 items-center">
                    <p className="text-sm lg:text-base">{platform}</p>
                    <p className="text-sm lg:text-base">{date}</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex gap-1 items-center">
                        <Heart className="w-4 h-4 lg:w-5 lg:h-5"/>
                        <p className="text-sm lg:text-base">{likes}</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <MessageCircle  className="w-4 h-4 lg:w-5 lg:h-5"/>
                        <p className="text-sm lg:text-base">{comms}</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Eye className="w-4 h-4 lg:w-5 lg:h-5"/>
                        <p className="text-sm lg:text-base">{impressions}</p>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default TopPostCard