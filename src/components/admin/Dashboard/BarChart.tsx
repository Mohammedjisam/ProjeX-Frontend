import type React from "react"

type BarChartData = {
  month: string
  value: number
  type: "high" | "medium" | "low"
}

type BarChartProps = {
  data: BarChartData[]
  className?: string
  showLegend?: boolean
  showValues?: boolean
}

export const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  className = "", 
  showLegend = true, 
  showValues = true 
}) => {
  const maxValue = Math.max(...data.map((item) => item.value), 1) // Ensure at least 1 to prevent division by zero

  const getBarColor = (type: string) => {
    switch (type) {
      case "high":
        return "bg-gradient-to-t from-green-500 to-green-400"
      case "medium":
        return "bg-gradient-to-t from-blue-500 to-blue-400"
      case "low":
        return "bg-gradient-to-t from-pink-500 to-pink-400"
      default:
        return "bg-gradient-to-t from-gray-500 to-gray-400"
    }
  }

  return (
    <div className={`${className}`}>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
      
      <div className="flex items-end h-64 gap-3 px-4 border-b border-l border-gray-700">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 group">
            <div className="relative w-full h-full flex flex-col justify-end min-h-[20px]">
              <div
                className={`${getBarColor(item.type)} rounded-t-md transition-all duration-500 ease-out animate-fade-in-up min-h-[2px]`}
                style={{ 
                  height: `${(item.value / maxValue) * 100}%`,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {showValues && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap shadow-lg">
                      {item.value}
                      <div className="absolute w-2 h-2 bg-gray-800 rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-400 mt-2 font-medium">{item.month}</div>
            </div>
          </div>
        ))}
      </div>

      {showLegend && (
        <div className="flex justify-center mt-6 gap-4 flex-wrap">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
            <span className="text-sm text-gray-300">High</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
            <span className="text-sm text-gray-300">Medium</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-pink-400 rounded-full mr-2"></div>
            <span className="text-sm text-gray-300">Low</span>
          </div>
        </div>
      )}
    </div>
  )
}