import Image from "next/image"
import SalesGraph from "../salesComponents/SalesGraph"


type CardProps = {
        title:string
        children: React.ReactNode

    }

const GraphicsCard = ({title, children }:CardProps) => {
    const hasChildren = children
    return(
        <>
        <div className="flex flex-col bg-white shadow-md rounded-xl text-black p-5 w-full min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] gap-5">
            <div className="flex gap-3 items-center">
                <h1 className="font-bold text-[15px] lg:text-[22px]">{title}</h1>
            </div>
            <div className="rounded border-gray-400 w-full h-[220px] sm:h-[260px] lg:h-[350px]">
                {hasChildren ? (
                    children
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-500">
                        No hay datos disponibles
                    </div>
                )}
            </div>
        </div>
        </>
    )
}

export default GraphicsCard