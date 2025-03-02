import type React from "react"

type DonutChartData = {
  name: string
  value: number
  color: string
}

type DonutChartProps = {
  data: DonutChartData[]
  className?: string
}

export const DonutChart: React.FC<DonutChartProps> = ({ data, className = "" }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0)
  let cumulativePercentage = 0

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100
            const startAngle = cumulativePercentage * 3.6 // 3.6 = 360 / 100
            cumulativePercentage += percentage
            const endAngle = cumulativePercentage * 3.6

            // Calculate the SVG arc path
            const x1 = 50 + 40 * Math.cos((startAngle - 90) * (Math.PI / 180))
            const y1 = 50 + 40 * Math.sin((startAngle - 90) * (Math.PI / 180))
            const x2 = 50 + 40 * Math.cos((endAngle - 90) * (Math.PI / 180))
            const y2 = 50 + 40 * Math.sin((endAngle - 90) * (Math.PI / 180))

            const largeArcFlag = percentage > 50 ? 1 : 0

            const pathData = [`M 50 50`, `L ${x1} ${y1}`, `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`, `Z`].join(" ")

            return <path key={index} d={pathData} fill={item.color} />
          })}
          <circle cx="50" cy="50" r="25" fill="#1a1a1a" />
        </svg>
      </div>

      <div className="flex justify-center mt-4 gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-1`} style={{ backgroundColor: item.color }}></div>
            <span className="text-xs text-gray-400">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

