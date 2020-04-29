import React from 'react'
import {
  LineChart, XAxis,
  YAxis,
  Tooltip,
  Line
} from 'recharts'

export default function CasesChart({data: chartData}) {
  const chartDataMapped = chartData.map(({Date: date, Cases})=>({date: `${new Date(date).getUTCFullYear()}-${new Date(date).getUTCMonth()}-${new Date(date).getUTCDay()}`, cases: Cases}))

  return (
    <div
      style={{
        width: '400px',
        height: '300px'
      }}
    >
      <LineChart
        width={600} height={400} data={chartDataMapped}
        margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
      >
        <XAxis dataKey="date" label="Date"/>
        <YAxis label="Stock Price" domain={['auto', 'auto']}/>
        <Tooltip />
        <Line dot={false}  dataKey="cases" stroke="#ff7300" />
      </LineChart>
    </div>
  )
}