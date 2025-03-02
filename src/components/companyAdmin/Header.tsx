
import React from 'react';
import { PlusCircle } from 'lucide-react';

interface HeaderProps {
  userAvatar?: string;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({
  userAvatar = "https://ui-avatars.com/api/?name=Thomas&background=0D8ABC&color=fff",
  userName = "Thomas"
}) => {
  return (
    <header className="flex justify-end items-center h-16 px-6 bg-sidebar-bg/50 border-b border-white/5">
      <div className="flex items-center gap-2">
        <span className="text-sm text-white/80">{userName}</span>
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img 
            src={userAvatar} 
            alt={userName} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <button className="fixed bottom-6 right-6 p-2 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-200">
        <PlusCircle size={24} />
      </button>
    </header>
  );
};

export default Header;
