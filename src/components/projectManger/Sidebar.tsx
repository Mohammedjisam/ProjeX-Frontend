import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  MessageSquare, 
  Calendar, 
  UserCircle
} from 'lucide-react';

type NavItem = {
  icon: React.ElementType;
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Developers', path: '/developers' },
  { icon: FolderKanban, label: 'Projects', path: '/projects' },
  { icon: MessageSquare, label: 'Chats', path: '/chats' },
  { icon: Calendar, label: 'Meetings', path: '/meetings' },
  { icon: UserCircle, label: 'Profile', path: '/profile' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  return (
    <aside className="w-[240px] min-h-screen bg-sidebar flex flex-col fixed left-0 top-0 z-10">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold text-white">ProjeX</h1>
      </div>
      
      <nav className="flex-1 py-6 space-y-2 px-3">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`sidebar-link flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${isActive ? 'active' : ''}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <item.icon size={20} className="flex-shrink-0" />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-white/10 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-dashboard-blue flex items-center justify-center text-white font-medium flex-shrink-0">
            R
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Ram</p>
            <p className="text-xs text-white/50 truncate">ram@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
