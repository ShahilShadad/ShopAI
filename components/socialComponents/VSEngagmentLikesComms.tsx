"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type CardProps = {
    data:{
        month: string,
        likes: number,
        comments: number,
        shares: number,
        impressions: number,
        followers: number
    }[]
}

const VSEngagmentLikesComms = ({data}:CardProps) => {
    return(
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} 
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
                dataKey="likes" 
                stroke="#EA580C"
                type={"monotone"}
                strokeWidth={3} 
                dot={false}
                />
                <Line 
                yAxisId="right"
                dataKey="comments" 
                stroke="#0F766E"
                type={"monotone"}
                strokeWidth={3} 
                dot={false}
                />
                
                <Tooltip />
            </LineChart>

        </ResponsiveContainer>
    )
}

export default VSEngagmentLikesComms