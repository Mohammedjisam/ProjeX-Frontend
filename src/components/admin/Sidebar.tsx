import React from "react";
import { HomeIcon, DocumentTextIcon, CreditCardIcon, UsersIcon } from "../ui/icon";
import { useNavigate } from "react-router-dom";

type NavItem = {
  name: string;
  icon: React.FC<React.ComponentProps<"svg">>;
  path: string;
  current: boolean;
}

type SidebarProps = {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  
  const [navigation, setNavigation] = React.useState<NavItem[]>([
    { name: "Dashboard", icon: HomeIcon, path: "/admin/dashboard", current: true },
    { name: "Plans", icon: DocumentTextIcon, path: "/admin/plans", current: false },
    { name: "Subscriptions", icon: CreditCardIcon, path: "/admin/subscriptions", current: false },
    { name: "CompanyAdmin", icon: HomeIcon, path: "/admin/companyadmin", current: false },
    { name: "Manager", icon: DocumentTextIcon, path: "/admin/manager", current: false },
    { name: "ProjectManager", icon: CreditCardIcon, path: "/admin/projectmanager", current: false },
    { name: "Developer", icon: UsersIcon, path: "/admin/developer", current: false },
  ]);
  
  const handleNavClick = (index: number) => {
    const newNavigation = navigation.map((item, i) => ({
      ...item,
      current: i === index,
    }));
    
    setNavigation(newNavigation);
    navigate(navigation[index].path);
  }
  
  return (
    <div className={`flex flex-col w-64 bg-gray-900 ${className}`}>
      <div className="flex items-center h-16 px-4">
        <h1 className="text-xl font-bold text-white">ProjeX</h1>
      </div>
      
      <nav className="flex-1 mt-5">
        <ul>
          {navigation.map((item, index) => (
            <li key={item.name}>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(index);
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
      
      <div className="px-4 py-4">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Admin
        </h2>
      </div>
    </div>
  );
};