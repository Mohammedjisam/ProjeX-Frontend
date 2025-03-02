
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#0f0f19]">
      <Sidebar />
      <div className="flex-1 ml-[220px]">
        <Header />
        <main className="p-6">
          <div className="max-w-5xl mx-auto mt-8">
            {children}
          </div>
          
        </main>
      </div>
    </div>
  );
};

export default Layout;
