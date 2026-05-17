'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

type CardProps = {
    channels: {
        channel: string,
        channelSells: number
    }[]
}

const colores = [ "#0088FE", "#00C49F","#FFBB28","#FF8042","#A28CFF","#FF6699","#33CC99","#FF4444","#00B8D9","#FF9933" ]

const SalePieChart = ({channels}:CardProps) => {
    return (
        <>
        <div className="flex flex-row w-full h-full items-center">
        <div className="w-full lg:w-1/2 h-full">
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie 
                    data={channels}
                    dataKey="channelSells"
                    nameKey="channel"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    innerRadius="50%"
                    fill="#8884d8"
                    stroke="#fff"
                >
                {channels.map((sale, index) => (
                    <Cell key={sale.channel} fill={colores[index]} />
                ))}
                
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center">
            <ul className="space-y-2 text-xs lg:text-xl text-center">
                {channels.map((sale, index) => (
                    <li key={sale.channel} className="flex items-center gap-2">
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: colores[index] }}
                        />
                        {sale.channel}
                    </li>

                ))}
            </ul>
        </div>
        </div>
            
        </>
    )
}

export default SalePieChart