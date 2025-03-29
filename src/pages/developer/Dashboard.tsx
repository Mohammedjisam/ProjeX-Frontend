import { useState } from 'react';
import Sidebar from '../../components/developer/Sidebar';
import Header from '../../components/developer/Header';
import { DashboardPage } from '../../components/developer/Dashboard/DashboardPage';

export const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-hidden">
          <DashboardPage />
        </main>
      </div>
    </div>
  );
};