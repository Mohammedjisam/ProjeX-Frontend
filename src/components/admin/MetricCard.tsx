import type React from "react"

type MetricCardProps = {
  title: string
  value: string | number
  className?: string
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, className = "" }) => {
  return (
    <div className={`bg-blue-900 rounded-lg p-6 text-white ${className}`}>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  )
}

