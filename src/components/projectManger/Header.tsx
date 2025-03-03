import React from 'react';
import { Search, Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="h-16 flex items-center justify-between mb-8 animate-fade-in">
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-muted rounded-full pl-10 pr-4 py-2 text-sm border border-white/10 focus:outline-none focus:border-dashboard-blue focus:ring-1 focus:ring-dashboard-blue text-white/90 transition-all duration-200 w-64"
          />
        </div>
        
        <button className="relative p-2 rounded-md hover:bg-white/10 transition-all duration-200">
          <Bell size={20} className="text-white/80" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-dashboard-red rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
