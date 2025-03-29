import type React from "react"
import { Sidebar } from "../Sidebar"
import { BarChart } from "./BarChart"
import { DonutChart } from "./DonutChart"

export const AdminDashboard: React.FC = () => {
  // Bar chart data with clear values
  const barChartData = [
    { month: "Jan", value: 45, type: "medium" },
    { month: "Feb", value: 80, type: "high" },
    { month: "Mar", value: 65, type: "high" },
    { month: "Apr", value: 30, type: "low" },
    { month: "May", value: 55, type: "medium" },
    { month: "Jun", value: 90, type: "high" },
    { month: "Jul", value: 40, type: "medium" },
  ]

  // Donut chart data with clear distribution
  const donutChartData = [
    { name: "Basic plan", value: 350, color: "#6366f1" },
    { name: "Business plan", value: 520, color: "#60a5fa" },
    { name: "Pro plan", value: 230, color: "#d946ef" },
  ]

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />

      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, Admin!</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Quick Overview</h2>
            <p className="text-gray-300 mb-4">
              <span className="font-bold">₹82,500</span> revenue this month <span className="text-green-400">(+15%)</span>
            </p>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-300">All systems operational</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-300">
                  <span className="font-medium">12</span> new signups today
                </span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-300">
                  <span className="font-medium">7</span> projects completed
                </span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-300">
                  <span className="font-medium">8</span> new tasks assigned
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Monthly Performance</h2>
            <div className="h-64"> {/* Fixed height container */}
              <BarChart data={barChartData} />
            </div>
            
          </div>

          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-center pt-3">Subscription Distribution</h2>
            <div className="flex justify-center h-64 pt-5"> {/* Fixed height container */}
              <DonutChart data={donutChartData} size={200} />
            </div>
            <div className="mt-4 text-center text-sm text-gray-400">
              Total subscribers: <span className="font-medium">1,100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}