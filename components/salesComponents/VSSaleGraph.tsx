"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type CardProps = {
    salesGraph: {
        month: string
        sales: number,
        income: number
   }[]
}

const VSSaleGraph = ({salesGraph}:CardProps) => {
    return(
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesGraph} 
            >
                <XAxis 
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 13 }}
                padding={{ left: 30, right: 10}}
                />
                <YAxis 
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 13 }}
                width={50}
                />
                <YAxis 
                yAxisId="right" 
                orientation="right" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 13 }}
                width={50}
                />
                <Line 
                yAxisId="left" 
                dataKey="income"
                stroke="#4caf50" 
                type={"monotone"}
                strokeWidth={3}
                />
                <Line 
                yAxisId="right" 
                dataKey="sales" 
                stroke="#2898c4" 
                type={"monotone"}
                strokeWidth={3}
                />
                <Tooltip
                    contentStyle={{
                    borderRadius: "10px",
                    border: "none"
                }}
    />
            </LineChart>

        </ResponsiveContainer>
    )
}

export default VSSaleGraph