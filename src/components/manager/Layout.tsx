// src/components/manager/Layout.tsx
import Sidebar from "./Sidebar";
import Header from "./Header";

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen bg-[#0f121b]">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0f121b] p-6">
        {children}
      </main>
    </div>
  </div>
);