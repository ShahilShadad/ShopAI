"use client"

import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, LabelList, Tooltip } from "recharts"
import { Star } from "lucide-react"

type CardProps = {
  oneStar:number,
  twoStar:number, 
  threeStar:number,
  fourStar:number,
  fiveStar:number
}

const AppreciationBarChart = ({oneStar,twoStar, threeStar,fourStar,fiveStar}:CardProps) => {
  const data = [
    { category: "⭐⭐⭐⭐⭐", reviews: fiveStar},
    { category: "⭐⭐⭐⭐", reviews: fourStar},
    { category: "⭐⭐⭐", reviews: threeStar},
    { category: "⭐⭐", reviews: twoStar},
    { category: "⭐", reviews: oneStar},    
  ]
  return (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 100, left: 100, bottom: 10 }}
        >
        <XAxis type="number" hide />
        <YAxis
            dataKey="category"
            type="category"
            axisLine={false}
            tickLine={false}
        />
        <Tooltip />
        <Bar
            dataKey="reviews"
            fill="#7c3aed"
            radius={[6, 6, 6, 6]}
            barSize={15}
        >
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default AppreciationBarChart