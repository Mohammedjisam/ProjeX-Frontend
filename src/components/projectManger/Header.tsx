import React from 'react';
import { Search, Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="h-16 flex items-center justify-between mb-8 animate-fade-in">
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      
     
    </header>
  );
};

export default Header;
