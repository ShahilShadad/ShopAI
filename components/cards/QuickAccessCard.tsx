import type { ComponentType, SVGProps } from "react";

type CardProps = {
    icon: ComponentType<SVGProps<SVGSVGElement>>
    color?: string
    bgColor:string
    alt:string
    title: string
    text: string
}
const QuickAccessCard = ({icon: IconComponent, color = "", alt, bgColor, title, text}:CardProps) => {
    return(
    <div className="text-black bg-white shadow-xl rounded-xl p-4 lg:min-h-[70px] w-full">
        <div className="flex flex-col lg:flex-row gap-3 items-center">
            <div className="relative w-7 h-7 lg:w-15 lg:h-15 shrink-0 rounded-xl overflow-hidden">
                <IconComponent
                    className={`relative z-10  lg:w-15 lg:h-15 ${color}`}
                    aria-label={alt}
                    />
                <div className={`absolute inset-0 ${bgColor}`} />
            </div>
            <div className="flex flex-col items-start justify-center">
                <h1 className="font-semibold text-[10px] lg:text-base">{title}</h1>
                <p className="text-gray-600 hidden lg:block text-center line-clamp-2">{text}</p>
            </div>
        </div>
    </div>
    )
}

export default QuickAccessCard