import type React from "react"

type BarChartData = {
  month: string
  value: number
  type: "high" | "medium" | "low"
}

type BarChartProps = {
  data: BarChartData[]
  className?: string
}

export const BarChart: React.FC<BarChartProps> = ({ data, className = "" }) => {
  const maxValue = Math.max(...data.map((item) => item.value))

  const getBarColor = (type: string) => {
    switch (type) {
      case "high":
        return "bg-green-400"
      case "medium":
        return "bg-blue-400"
      case "low":
        return "bg-pink-400"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className={`${className}`}>
      <div className="flex items-end h-48 gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className={`w-full ${getBarColor(item.type)}`}
              style={{ height: `${(item.value / maxValue) * 100}%` }}
            ></div>
            <div className="text-xs text-gray-400 mt-1">{item.month}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-start mt-4 gap-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-1"></div>
          <span className="text-xs text-gray-400">High revenue</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-400 rounded-full mr-1"></div>
          <span className="text-xs text-gray-400">Medium revenue</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-pink-400 rounded-full mr-1"></div>
          <span className="text-xs text-gray-400">Low revenue</span>
        </div>
      </div>
    </div>
  )
}

