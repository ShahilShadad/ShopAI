"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type CardProps = {
    arrayStats: {
      month: string
      positive: number
      negative: number
      neutral: number
   }[]
}

const VsReviewsGraph = ({arrayStats}:CardProps) => {
    const data = {arrayStats}
    return(
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={arrayStats} 
            >
                <XAxis 
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 13 }}
                padding={{ left: 30, right: 10}}
                />
                <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 13 }}
                width={50}
                />
                <Line 
                dataKey="positive" 
                stroke="#4caf50" 
                type={"monotone"}
                strokeWidth={3}
                dot={false}
                />
                <Line 
                dataKey="neutral" 
                stroke="#ff9800"
                type={"monotone"}
                strokeWidth={3} 
                dot={false}
                />
                <Line 
                dataKey="negative" 
                stroke="#f44336"
                type={"monotone"}
                strokeWidth={3} 
                dot={false}
                />
                <Tooltip />
            </LineChart>

        </ResponsiveContainer>
    )
}

export default VsReviewsGraph