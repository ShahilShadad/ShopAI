import type { ComponentType, SVGProps } from "react";
import { ArrowUp, ArrowDown } from "lucide-react"

type CardProps = {
        bgColorClassName: string
        icon: ComponentType<SVGProps<SVGSVGElement>>
        color?: string
        alt: string
        title:string 
        price: number
        percentaje?:number
        equal?: string
        symbol?: string
    }

const KpiCards = ({bgColorClassName, icon: IconComponent, color = "", alt, title, price, percentaje, equal, symbol}: CardProps) => {
    
    return (
        <>
            <div className="text-black bg-white shadow-md rounded-xl flex flex-col items-center justify-center min-h-[150px] w-full lg:items-start lg:gap-5 lg:p-5">
                <div className="flex flex-col justify-center items-center gap-3 lg:flex-row pt-5 lg:pt-0">
                    <div className="relative flex items-center justify-center min-h-[70px] min-w-[70px]">
                        <div className={`absolute inset-0 ${bgColorClassName} rounded-full`}></div>
                        <IconComponent
                            className={`relative z-10 w-10 h-10 ${color}`}
                            aria-label={alt}
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-sm lg:text-base text-center">{title}</h1>
                        <p className="text-lg font-bold lg:text-4xl">{price}{symbol}</p>
                    </div>
                </div>
                {percentaje !== undefined && (
                <div className="flex gap-2">
                    <div className="flex items-center justify-center lg:gap-1">
                        {percentaje >= 0 ? (<ArrowUp className="w-3 h-3 lg:w-4 lg:h-4 text-green-500" />) : (<ArrowDown className="w-3 h-3 lg:w-4 lg:h-4 text-red-500" />)}
                        <p className="text-[9px] lg:text-base text-center break-words">
                            <span className={`mx-1 ${percentaje >= 0 ? "text-green-500" : "text-red-500"}`}>{percentaje}%</span> {equal}
                        </p>
                    </div>
                </div>
                )}
            </div>
        </>
    )
}

export default KpiCards