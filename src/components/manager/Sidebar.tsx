import type React from "react"
import { Home, Users, FolderKanban, MessageSquare, Calendar, Settings, UserCircle } from "lucide-react"
import { cn } from "../../lib/utils"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/Store"

export default function Sidebar() {
  const managerData = useSelector((state: RootState) => state.manager.managerData)
  const currentPath = window.location.pathname

  return (
    <aside className="w-52 bg-gray-900 flex flex-col h-screen border-r border-gray-800 shadow-xl">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">ProjeX</h1>
      </div>

      <nav className="flex-1 py-4 space-y-1 overflow-hidden">
        {navItems.map((item) => (
          <NavItem 
            key={item.label} 
            {...item} 
            active={currentPath === item.path} 
          />
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-xs text-gray-400">Online</span>
        </div>
      </div>
    </aside>
  )
}

interface NavItemProps {
  icon: React.ElementType
  label: string
  path: string
  active?: boolean
}

function NavItem({ icon: Icon, label, path, active }: NavItemProps) {
  const navigate = useNavigate()

  const handleNavigation = () => {
    navigate(path)
  }

  return (
    <button
      onClick={handleNavigation}
      className={cn(
        "flex items-center px-4 py-3 mx-2 rounded-md transition-colors duration-200 w-full text-left",
        active ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-gray-100",
      )}
    >
      <Icon className="h-5 w-5 mr-3" />
      <span>{label}</span>
    </button>
  )
}

const navItems = [
  { icon: Home, label: "Dashboard", path: "/manager/dashboard" },
  { icon: Users, label: "Developers", path: "/manager/developers" },
  { icon: FolderKanban, label: "Project Managers", path: "/manager/projectmanagers" },
  { icon: FolderKanban, label: "Projects", path: "/manager/projects" },
  { icon: MessageSquare, label: "Chats", path: "/manager/chats" },
  { icon: Calendar, label: "Meetings", path: "/manager/meetings" },
  { icon: UserCircle, label: "Profile", path: "/manager/profile" },
]