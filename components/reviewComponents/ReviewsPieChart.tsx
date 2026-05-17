'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

type CardProps = {
        positive: number,
        negative : number,
        neutro: number
    }

const colores = ["#00C49F","#fe0000" ,"#287aff"]

const ReviewsPieChart = ({positive, negative, neutro}: CardProps) => {
    const sales = [
        { name: "Positivas", value: positive },
        { name: "Negativas", value: negative },
        { name: "Neutros", value: neutro },
    ]
    return (
        <>
        <div className="w-[100%] h-[100%] flex">
            <div className="w-[60%] h-[100%]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie 
                            data={sales}
                            dataKey={"value"}
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius="80%"
                            innerRadius="50%"
                            fill="#8884d8"
                            stroke="#fff"
                        >
                        {sales.map((sale, index) => (
                            <Cell key={sale.name} fill={colores[index]} />
                        ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center">
                <ul className="space-y-2 text-xs lg:text-xl">
                    {sales.map((sale, index) => (
                        <li key={sale.name} className="flex items-center gap-2">
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: colores[index] }}
                            />
                            {sale.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
            
        </>
    )
}

export default ReviewsPieChart