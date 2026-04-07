import clsx from "clsx";
import {
  LayoutDashboard,
  FileText,
  Image,
  Users,
  Square,
  Calendar,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
  LucideProps,
} from "lucide-react";

import { Link, useLocation } from "react-router";

interface LinkItem {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  href?: string;
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onClose: () => void;
}

// import NavLink from '../ui/NavLink';
// import Button from '../ui/Button';

const links: LinkItem[] = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Posts", href: "/admin/posts", icon: FileText },
  { name: "Galerie", href: "/admin/galerie", icon: Image },
  { name: "Invités", href: "/admin/invites", icon: Users },
  { name: "Cards", href: "/admin/cards", icon: Square },
  { name: "Programme", href: "/admin/programme", icon: Calendar },
];

export default function Sidebar3({
  collapsed,
  onToggle,
  mobileOpen,
  onClose,
}: SidebarProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity duration-200 ${
          mobileOpen ? "opacity-90 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />
      {/* 
      <aside
        className={`fixed md:relative inset-y-0 left-0 z-30 flex flex-col bg-cameroun-green/75 text-white
          ${collapsed ? "w-16" : "w-64"}
          transform transition-all duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex items-center justify-between p-4">
          {!collapsed ? (
            <a href="/home" className="text-lg font-bold text-cameroun-red">Brand</a>
          ) : <a href="/home" className="text-lg font-bold text-cameroun-red hidden md:flex justify-center w-full">B</a>}
          <Button
            variant="ghost"
            className={`md:hidden ${collapsed && "w-full flex items-center justify-center"}`}
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 p-2 space-y-2">
          {links.map((l) => (
            <NavLink
            className="text-white hover:bg-white/20"
              key={l.name}
              to={l.href!}
              icon={l.icon}
              collapsed={collapsed}
              onClick={onClose}
            >
              {l.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-center p-2"
            onClick={onToggle}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </Button>
        </div>
      </aside> */}
    </div>
  );
}

export function Sidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onClose,
}: SidebarProps) {
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
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity duration-200 ${
          mobileOpen ? "opacity-90 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />
      <aside
        className={`bg-[#033720] text-white fixed h-screen md:relative inset-y-0 left-0 z-30
        ${collapsed ? "w-16" : "w-64 px-4"}
          transform transition-all duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex items-center justify-between py-4 w-full">
          {!collapsed && (
            <h2
              className="text-2xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Admin Panel
            </h2>
          )}
          <button
            className={`md:hidden hover:bg-white/10 active:scale-90 shadow-2xl transition-colors cursor-pointer ${collapsed && "w-full py-2 flex items-center justify-center"}`}
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href!}
                icon={item.icon}
                collapsed={collapsed}
                onClick={onClose}
                isActive={isActive(item.href)}
              >
                {item.name}
              </NavLink>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 space-y-2">
          <button
            className={`w-full flex items-center justify-center p-2 hover:bg-white/10 cursor-pointer`}
            onClick={onToggle}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
          {!collapsed && (
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <LogOut size={20} />
              Retour au site
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}

interface NavLinkProps {
  to: string;
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  collapsed?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

export function NavLink({
  to,
  className,
  icon: Icon,
  children,
  collapsed,
  isActive,
  onClick,
}: NavLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={clsx(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
        isActive ? "bg-[#d8a21e] text-[#033720]" : "hover:bg-white/10",
        className,
        collapsed && "justify-center",
      )}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {!collapsed && <span className="">{children}</span>}
    </Link>
  );
}
