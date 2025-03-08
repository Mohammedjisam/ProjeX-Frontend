import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  MessageSquare, 
  Calendar, 
  UserCircle
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";

type NavItem = {
  icon: React.ElementType;
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/projectmanager/dashboard' },
  { icon: Users, label: 'Developers', path: '/projectmanager/developers' },
  { icon: FolderKanban, label: 'Projects', path: '/projectmanager/projects' },
  { icon: MessageSquare, label: 'Chats', path: '/projectmanager/chats' },
  { icon: Calendar, label: 'Meetings', path: '/projectmanager/meetings' },
  { icon: UserCircle, label: 'Profile', path: '/projectmanager/profile' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const projectManagerData = useSelector((state: RootState) => state.projectManager.projectManagerData);
  
  // Get first letter of name for avatar fallback
  const getInitial = () => {
    if (projectManagerData?.name) {
      return projectManagerData.name.charAt(0).toUpperCase();
    }
    return 'PM';
  };
  
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
          <Avatar className="w-9 h-9 flex-shrink-0">
            {projectManagerData?.profileImage ? (
              <AvatarImage src={projectManagerData.profileImage} alt="Profile" />
            ) : (
              <AvatarFallback className="bg-dashboard-blue flex items-center justify-center text-white font-medium">
                {getInitial()}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {projectManagerData?.name || 'Project Manager'}
            </p>
            <p className="text-xs text-white/50 truncate">
              {projectManagerData?.email || 'email@example.com'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;