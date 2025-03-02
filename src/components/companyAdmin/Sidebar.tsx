"use client"

import { Home, GitBranch, Users, CreditCard, Video, MessageSquare, LogOut } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"

export default function Sidebar() {
    const location = useLocation()
  
    const navItems = [
      { icon: Home, label: "Home", href: "/" },
      { icon: GitBranch, label: "Branch", href: "/branch" },
      { icon: Users, label: "Managers", href: "/managers" },
      { icon: CreditCard, label: "Subscriptions", href: "/subscriptions" },
      { icon: Video, label: "Meeting", href: "/meeting" },
      { icon: MessageSquare, label: "Chats", href: "/chats" },
    ]
  
    return (
      <div className="w-64 bg-[#1a1b2e] border-r border-gray-800 flex flex-col">
        <div className="p-4">
          <h1 className="text-2xl font-bold">ProjeX</h1>
        </div>
  
        <div className="mt-6 px-4">
          <p className="text-xs font-medium text-gray-400 mb-2">MENU</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm rounded-lg transition-colors",
                    isActive
                      ? "bg-[#ff5b4f]/10 text-[#ff5b4f]"
                      : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-lg mr-3",
                      isActive ? "bg-[#ff5b4f]" : "bg-gray-800",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
  
        <div className="mt-auto p-4">
          <button className="flex items-center px-4 py-3 text-sm text-gray-400 hover:text-gray-200 w-full">
            <LogOut className="h-5 w-5 mr-3" />
            Signout
          </button>
        </div>
      </div>
    )
  }
  

