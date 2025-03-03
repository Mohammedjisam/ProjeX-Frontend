import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="h-16 border-b border-sidebar-border flex items-center justify-between px-6 animate-fade-in">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-6 p-1 rounded-md hover:bg-sidebar-accent hover:bg-opacity-80 transition-colors"
        >
          <Menu size={20} className="text-gray-400" />
        </button>
        
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="py-2 pl-10 pr-4 rounded-md bg-secondary/30 border border-sidebar-border focus:outline-none focus:ring-1 focus:ring-primary w-64"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-full hover:bg-sidebar-accent hover:bg-opacity-80 transition-colors">
          <Bell size={20} className="text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;