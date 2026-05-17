"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"


type CardProps = {
    title:string
    products: Product[]

}

type Product = {
    name: string,
    image: string,
    price: number,
    category: string,
    totalEarned: number,
    totalProductsSold: number,
}

const SalesTopProducsCard = ({title, products}:CardProps) => {
    const [fullTable, setfullTable] = useState(false)
    return(
        <>
        <div className="flex flex-col bg-white shadow-md rounded-xl text-black p-5 w-full min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] gap-5">
            <div className="flex gap-3 items-center">
                <h1 className="font-bold text-[15px] lg:text-[22px]">{title}</h1>                
            </div>
            <div className="rounded w-full h-[200px] lg:h-[270px]">
                <table className="w-full ">
                    <thead>
                        <tr className="border-b border-gray-200 py-3">
                            <th className="text-left text-[11px] xl:text-sm font-semibold text-gray-600 uppercase tracking-wide ">Producto</th>
                            <th className="text-[11px] text-sm font-semibold text-gray-600 uppercase tracking-wide truncate max-w-[50px]">Unidades Vendidas</th>
                            <th className="text-[11px] text-sm font-semibold text-gray-600 uppercase tracking-wide truncate max-w-[50px]">Ingresos</th>
                            <th className="text-[11px] text-sm font-semibold text-gray-600 uppercase tracking-wide hidden xl:block">Precio Unitario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.slice(0, 5).map((product, index)=>(
                            <tr key={index} className="border-b border-gray-100 py-3">
                                <td className="flex text-center items-center h-15 gap-5"> 
                                    <Image src={product.image} alt={product.name} width={40} height={40} className="hidden xl:block"/>
                                    <span className="text-[13px] font-medium text-gray-900 truncate max-w-[120px]">{product.name}</span>
                                </td>
                                <td className="text-[13px] font-medium text-gray-600 text-center">{product.totalProductsSold}</td>
                                <td className="text-[13px] font-medium text-gray-600 text-center">{product.totalEarned}€</td>
                                <td className="text-[13px] font-medium text-gray-600 hidden xl:table-cell text-center">{product.price}€</td>
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            </div>
            <div onClick={()=>setfullTable(true)}className="flex justify-center text-sm lg:text-lg underline text-[#7c3aed] mt-30 lg:mt-15 cursor-pointer">
                Ver todos los productos
            </div>

            {fullTable &&
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">  
                <div className="relative bg-white w-[90%] max-w-6xl h-[80vh] rounded-2xl p-8">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <h2 className="text-base font-semibold text-gray-800">Detalle de productos</h2>
                        <button onClick={() => setfullTable(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition">
                            <X className="w-6 h-6 xl:w-7 xl:h-7 text-gray-600 cursor-pointer" />
                        </button>
                    </div>
                    <div className="h-full overflow-y-scroll no-scrollbar p-7">
                    <table className="w-full ">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left text-[11px] xl:text-sm font-semibold text-gray-600 uppercase tracking-wide ">Producto</th>
                                <th className="text-[11px] xl:text-xs text-sm font-semibold text-gray-600 uppercase tracking-wide truncate max-w-[50px]">Unidades Vendidas</th>
                                <th className="text-[11px] xl:text-xs text-sm font-semibold text-gray-600 uppercase tracking-wide truncate max-w-[50px]">Ingresos</th>
                                <th className="text-[11px] xl:text-xs text-sm font-semibold text-gray-600 uppercase tracking-wide hidden xl:table-cell">Precio Unitario</th>
                                <th className="text-[11px] text-sm font-semibold text-gray-600 uppercase tracking-wide hidden xl:table-cell">Categoria</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index)=>(
                                <tr key={index} className="border-b border-gray-100 py-3">
                                    <td className="flex text-center items-center h-15 gap-5"> 
                                        <Image src={product.image} alt={product.name} width={40} height={40} className="hidden xl:block"/>
                                        <span className="text-[13px] font-medium text-gray-900 truncate max-w-[120px]">{product.name}</span>
                                    </td>
                                    <td className="text-[13px] font-medium text-gray-600 text-center">{product.totalProductsSold}</td>
                                    <td className="text-[13px] font-medium text-gray-600 text-center">{product.totalEarned}€</td>
                                    <td className="text-[13px] font-medium text-gray-600 hidden xl:table-cell text-center">{product.price}€</td>
                                    <td className="text-[13px] font-medium text-gray-600 hidden xl:table-cell text-center">{product.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            }
        </div>
        </>
    )
}

export default SalesTopProducsCard