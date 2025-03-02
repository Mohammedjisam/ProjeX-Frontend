import type React from "react"
import { Sidebar } from "./Sidebar"
import { MetricCard } from "./MetricCard"
import { BarChart } from "./BarChart"
import { DonutChart } from "./DonutChart"

export const AdminDashboard: React.FC = () => {
  const barChartData = [
    { month: "Jan", value: 20, type: "low" },
    { month: "Feb", value: 60, type: "high" },
    { month: "Mar", value: 40, type: "medium" },
    { month: "Apr", value: 70, type: "high" },
    { month: "May", value: 30, type: "low" },
    { month: "Jun", value: 50, type: "medium" },
    { month: "July", value: 65, type: "high" },
  ]

  const donutChartData = [
    { name: "Basic plan", value: 30, color: "#6366f1" },
    { name: "Business plan", value: 45, color: "#60a5fa" },
    { name: "Pro plan", value: 25, color: "#d946ef" },
  ]

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />

      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <MetricCard title="Revenue" value="$ 500" />
          <MetricCard title="Users" value="300" />
          <MetricCard title="Active Tenants" value="200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-lg p-4">
            <h2 className="text-lg font-medium mb-4">Monthly Revenue</h2>
            <BarChart data={barChartData} />
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h2 className="text-lg font-medium mb-4 text-center">Popular Plans</h2>
            <DonutChart data={donutChartData} />
          </div>
        </div>
      </div>
    </div>
  )
}

