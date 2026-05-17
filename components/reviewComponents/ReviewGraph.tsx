'use client'

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type CardProps = {
  reviews: {
    month: string,
    totalReviews: number
  }[]
}

const YAxisNumber = (price:number) => {
  if(price >= 1000000) {
    const value = price / 1000000
    return `${value % 1 === 0 ? value : value.toFixed(1)}M`
  }else if (price >= 1000){
    const value = price / 1_000
    return `${value % 1 === 0 ? value : value.toFixed(1)}k`
  }else{
    return price.toString()
  }
}


const ReviewGraph = ({reviews}:CardProps)=> {
  return (
   <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={reviews}>
      <Area dataKey="totalReviews"
      type={"monotone"}
      stroke="#8884d8"
      fill="rgba(136, 132, 216, 0.3)"
      strokeWidth={2}
      />
    <XAxis 
    dataKey={"month"}
    axisLine={false}
    tickLine={false}
    tick={{ fontSize: 11 }}
    padding={{ left: 10, right: 10}}
    interval={Math.floor(reviews.length / 5)}
    />
    <YAxis 
    axisLine={false}
    tickLine={false}
    tick={{ fontSize: 11 }}
    width={50}
    domain={[0, "dataMax"]}
    tickCount={6}
    tickFormatter={YAxisNumber}
    />
    <Tooltip 
    formatter={YAxisNumber}
    />
    </AreaChart>
   </ResponsiveContainer> 
  );
}

export default ReviewGraph