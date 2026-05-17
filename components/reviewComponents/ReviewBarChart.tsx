"use client"

import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, LabelList, Tooltip } from "recharts"

type CardProps = {
  delivery: number,
  quality: number,
  price: number,
  product: number,
  refund?: number,
  other: number
}

const ReviewBarChart = ({delivery,quality, price,product,refund,other}:CardProps) => {
  const data = [
    { category: "Envio/Entrega", reviews: delivery},
    { category: "Calidad", reviews: quality},
    { category: "Precio", reviews: price },
    { category: "Producto", reviews: product},
    { category: "Otros", reviews: other},
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

export default ReviewBarChart