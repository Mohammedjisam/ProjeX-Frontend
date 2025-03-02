import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  GitBranch, 
  Users, 
  CreditCard, 
  Video, 
  MessageSquare, 
  LogOut 
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  navigate: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  active = false,
  navigate 
}) => {
  const navigation = useNavigate();

  return (
    <div 
      onClick={() => navigation(navigate)} 
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
        active 
          ? 'bg-gray-700/50 text-white' 
          : 'text-gray-400 hover:bg-gray-700/30 hover:text-white'
      } transition-colors cursor-pointer`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="w-[220px] bg-gray-800 h-screen flex flex-col fixed left-0 top-0 z-20 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white">ProjeX</h1>
      </div>
      
      <div className="mt-2 px-4 text-xs font-medium text-gray-500 uppercase">
        MENU
      </div>
      
      <nav className="mt-2 px-3 flex flex-col gap-1">
        <SidebarItem icon={Home} label="Home" navigate="/companyadmin/dashboard" />
        <SidebarItem icon={GitBranch} label="Branch" navigate="/companyadmin/branch" />
        <SidebarItem icon={Users} label="Managers"  navigate="/companyadmin/managers" />
        <SidebarItem icon={CreditCard} label="Subscriptions" navigate="/companyadmin/subscriptions" />
        <SidebarItem icon={Video} label="Meeting" navigate="/companyadmin/meeting" />
        <SidebarItem icon={MessageSquare} label="Chats" navigate="/companyadmin/chats" />
      </nav>
      
      <div className="mt-auto px-3 mb-6">
        <SidebarItem icon={LogOut} label="Signout" navigate="/signout" />
      </div>
    </aside>
  );
};

export default Sidebar;
