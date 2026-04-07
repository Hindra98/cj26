import { Outlet } from "react-router";
import { Sidebar } from "./figma/Sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";

export function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => setCollapsed((c) => !c);
  const handleMobileToggle = () => setMobileOpen((o) => !o);
  const handleCloseMobile = () => setMobileOpen(false);


  return (
    <div className="min-h-svh bg-gray-50 flex">
      <Sidebar
        collapsed={collapsed}
        onToggle={handleToggle}
        mobileOpen={mobileOpen}
        onClose={handleCloseMobile}
      />

      <main className="flex-1 p-8 relative">
        <button
          className={`md:hidden text-[#033720] bg-transparent rounded-md p-1 hover:bg-[#033720]/10 active:scale-90 shadow-xl transition-all cursor-pointer fixed top-1 left-1 ${mobileOpen && "hidden"}`}
            onClick={handleMobileToggle}>
            <Menu className="size-8" />
          </button>
        <Outlet />
      </main>
    </div>
  );
}
