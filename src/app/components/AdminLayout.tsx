import { Outlet, Link, useLocation } from "react-router";
import { LayoutDashboard, FileText, Image, Users, Square, Calendar, LogOut } from "lucide-react";

export function AdminLayout() {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Posts", href: "/admin/posts", icon: FileText },
    { name: "Galerie", href: "/admin/galerie", icon: Image },
    { name: "Invités", href: "/admin/invites", icon: Users },
    { name: "Cards", href: "/admin/cards", icon: Square },
    { name: "Programme", href: "/admin/programme", icon: Calendar },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-[#033720] text-white fixed h-screen">
        <div className="p-6">
          <h2 className="text-2xl mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Admin Panel
          </h2>
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-[#d8a21e] text-[#033720]"
                      : "hover:bg-white/10"
                  }`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <LogOut size={20} />
            Retour au site
          </Link>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
