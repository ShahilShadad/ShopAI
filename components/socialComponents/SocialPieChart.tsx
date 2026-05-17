'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

type CardProps = {
    data: {
        platform: string,
        followers: number
    }[]
}


const colores = ["#00C49F","#fe0000" ,"#287aff", "#ed28ff"]

const SocialPieChart = ({data}:CardProps) => {
    return (
        <>
        <div className="w-[100%] h-[100%] flex">
            <div className="w-[60%] h-[100%]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie 
                            data={data}
                            dataKey="followers"
                            nameKey="platform"
                            cx="50%"
                            cy="50%"
                            outerRadius="80%"
                            innerRadius="50%"
                            fill="#8884d8"
                            stroke="#fff"
                        >
                        {data.map((sale, index) => (
                            <Cell key={sale.platform} fill={colores[index]} />
                        ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center">
                <ul className="space-y-2 text-xs lg:text-xl">
                    {data.map((sale, index) => (
                        <li key={sale.platform} className="flex items-center gap-2">
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: colores[index] }}
                            />
                            {sale.platform}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
            
        </>
    )
}

export default SocialPieChart