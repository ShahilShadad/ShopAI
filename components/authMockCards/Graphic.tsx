'use client'

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const fakeReviews = [
  { month: "Ene", totalReviews: 120 },
  { month: "Feb", totalReviews: 190 },
  { month: "Mar", totalReviews: 260 },
  { month: "Abr", totalReviews: 220 },
  { month: "May", totalReviews: 340 },
  { month: "Jun", totalReviews: 480 },
  { month: "Jul", totalReviews: 620 },
  { month: "Ago", totalReviews: 580 },
  { month: "Sep", totalReviews: 760 },
  { month: "Oct", totalReviews: 920 },
  { month: "Nov", totalReviews: 1150 },
  { month: "Dic", totalReviews: 1480 },
]

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


const FakeReviewGraph = ()=> {
  return (
   <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={fakeReviews}>
        <defs>
            <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
        </defs>
      <Area dataKey="totalReviews"
      type={"monotone"}
      stroke="#a78bfa"
      fill="url(#purpleGradient)"
      strokeWidth={2}
      style={{
    filter: "drop-shadow(0 0 8px rgba(167,139,250,0.7))"
  }}
      />
    <XAxis 
    dataKey={"month"}
    axisLine={false}
    tickLine={false}
    tick={{ fontSize: 11, fill: "#cbd5e1" }}
    padding={{ left: 10, right: 10}}
    interval={1}
    />
    <YAxis 
    axisLine={false}
    tickLine={false}
    tick={{ fontSize: 11, fill: "#cbd5e1" }}
    width={50}
    domain={[0, "dataMax"]}
    tickCount={6}
    tickFormatter={YAxisNumber}
    />
    </AreaChart>
   </ResponsiveContainer> 
  );
}

export default FakeReviewGraph