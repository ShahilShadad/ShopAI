import Image from "next/image"

type CardProps = {
    color:string
    rank:number
    product:string
    alt:string
    title: string
    price: number
}
const TopProductsCard = ({rank, color, product, alt, title, price}:CardProps) => {
    return (
        <div className="text-black bg-white shadow-xl rounded-xl w-full min-h-[200px] xl:min-h-[250px] relative flex justify-center items-center">
            <div className={`absolute left-2 top-2 lg:top-5 lg:left-5 ${color} text-white w-6 h-6 flex items-center justify-center rounded-full text-sm font-semibold`}>
                {rank}
            </div>
            <div className="flex flex-col gap-1 justify-center items-center ">
                <div className="flex">
                    <Image src={product} alt={alt} width={200} height={200} className="w-36 md:w-40 lg:w-45 h-auto rounded-xl"/>
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="text-[13px] lg:text-xl font-bold">{title}</h1>
                    <p className="text-[13px] lg:text-lg">{price}€ Vendidos</p>
                </div>
            </div>
        </div>
    )
}

export default TopProductsCard