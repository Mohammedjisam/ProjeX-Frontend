"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../redux/Store"
import { logoutCompanyAdmin } from "../../redux/slice/CompanyAdminSlice"
import { Home, GitBranch, Users, CreditCard, Video, MessageSquare, LogOut, User } from "lucide-react"

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  active?: boolean
  navigate: string
  onClick?: () => void
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active = false, navigate, onClick }) => {
  const navigation = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigation(navigate)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-base ${
        active ? "bg-gray-800/50 text-white" : "text-gray-400 hover:bg-gray-800/30 hover:text-white"
      } transition-colors cursor-pointer`}
    >
      <Icon size={18} className="min-w-[18px]" />
      <span className="truncate">{label}</span>
    </div>
  )
}

const Sidebar: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const companyAdminData = useSelector((state: RootState) => state.companyAdmin.companyAdminData)

  const handleSignout = () => {
    dispatch(logoutCompanyAdmin())
    navigate("/companyadmin/login")
  }

  return (
    <aside className="w-[240px] bg-[#0f1729] h-screen flex flex-col fixed left-0 top-0 z-20">
      <div className="p-5">
        <h1 className="text-2xl font-bold text-white">ProjeX</h1>
      </div>

      <div className="px-4 mt-3 text-sm font-medium text-gray-500 uppercase">MENU</div>

      <nav className="mt-3 px-3 flex flex-col gap-1.5 flex-1 overflow-y-auto">
        <SidebarItem icon={Home} label="Home" navigate="/companyadmin/dashboard" />
        <SidebarItem icon={GitBranch} label="Branch" navigate="/companyadmin/branch" />
        <SidebarItem icon={Users} label="Managers" navigate="/companyadmin/managers" />
        <SidebarItem icon={CreditCard} label="Subscriptions" navigate="/companyadmin/subscriptions" />
        <SidebarItem icon={Video} label="Meeting" navigate="/companyadmin/meeting" />
        <SidebarItem icon={MessageSquare} label="Chats" navigate="/companyadmin/chats" />
        <SidebarItem icon={User} label="Profile" navigate="/companyadmin/profile" />
      </nav>

      <div className="mt-auto px-3 pb-5">
        <div className="px-4 py-3 mb-3 flex flex-row items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 overflow-hidden flex-shrink-0 flex items-center justify-center">
            {companyAdminData?.profileImage ? (
              <img
                src={companyAdminData.profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-base font-medium">
                {companyAdminData?.name ? companyAdminData.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-base font-medium truncate">
              {companyAdminData?.name || "User"}
            </p>
          </div>
        </div>
        <SidebarItem icon={LogOut} label="Signout" navigate="/signout" onClick={handleSignout} />
      </div>
    </aside>
  )
}

export default Sidebar