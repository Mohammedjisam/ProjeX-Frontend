import React from "react"
import { HomeIcon, DocumentTextIcon, CreditCardIcon, UsersIcon } from "../ui/icon"

type NavItem = {
  name: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  href: string
  current: boolean
}

type SidebarProps = {
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  const [navigation, setNavigation] = React.useState<NavItem[]>([
    { name: "Dashboard", icon: HomeIcon, href: "#", current: true },
    { name: "Plans", icon: DocumentTextIcon, href: "#", current: false },
    { name: "Subscriptions", icon: CreditCardIcon, href: "#", current: false },
    { name: "Users", icon: UsersIcon, href: "#", current: false },
  ])

  const handleNavClick = (index: number) => {
    setNavigation(
      navigation.map((item, i) => ({
        ...item,
        current: i === index,
      })),
    )
  }

  return (
    <div className={`flex flex-col h-screen w-48 bg-black text-white ${className}`}>
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">ProjeX</h1>
      </div>
      <nav className="flex-1 pt-4">
        <ul className="space-y-1">
          {navigation.map((item, index) => (
            <li key={item.name}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(index)
                }}
                className={`flex items-center px-4 py-2 text-sm ${
                  item.current ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center">
          <span className="text-sm text-gray-400">Admin</span>
        </div>
      </div>
    </div>
  )
}

