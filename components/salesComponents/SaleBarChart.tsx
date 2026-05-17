"use client"

import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, LabelList, Tooltip } from "recharts"

type CardProps = {
  data: {
    category: string,
    productsSelled: number
  }[]
}



const SaleBarChart = ({data}:CardProps) => {
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
            dataKey="productsSelled"
            fill="#7c3aed"
            radius={[6, 6, 6, 6]}
            barSize={15}
        >
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default SaleBarChart