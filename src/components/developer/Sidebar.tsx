import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  FolderKanban, 
  Ticket, 
  MessageSquare, 
  Calendar, 
  UserCircle,
  LogOut
} from 'lucide-react';

const sidebarItems = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/'
  },
  {
    name: 'Tasks',
    icon: CheckSquare,
    path: '/tasks'
  },
  {
    name: 'Projects',
    icon: FolderKanban,
    path: '/projects'
  },
  {
    name: 'Chats',
    icon: MessageSquare,
    path: '/chats'
  },
  {
    name: 'Meetings',
    icon: Calendar,
    path: '/meetings'
  },
  {
    name: 'Profile',
    icon: UserCircle,
    path: '/profile'
  }
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onToggle }) => {
  const location = useLocation();
  
  return (
    <aside className={`h-screen bg-[#0f121b] flex flex-col transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-64'} border-r border-gray-800`}>
      <div className="flex items-center h-16 px-6 border-b border-gray-800">
        {!collapsed && <h1 className="font-bold text-white text-xl">ProjeX</h1>}
        {collapsed && <span className="text-xl font-bold text-white mx-auto">P</span>}
      </div>
      
      <nav className="flex-1 py-6 px-4 overflow-y-auto">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-[#1e293b] text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-[#1e293b]'
                  }`}
                >
                  <item.icon size={20} className={`${isActive ? 'text-blue-400' : ''} min-w-[20px]`} />
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center">
            <span className="text-white font-medium">R</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-white font-medium">Ram</span>
              <span className="text-xs text-gray-400">ram@projex.com</span>
            </div>
          )}
          {!collapsed && (
            <button className="ml-auto text-gray-400 hover:text-white transition-colors">
              <LogOut size={18} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;