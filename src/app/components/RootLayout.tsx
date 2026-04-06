import { Outlet, Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function RootLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Programme", href: "/programme" },
    { name: "Galerie", href: "/galerie" },
    { name: "Invités", href: "/invites" },
    { name: "Blog", href: "/blog" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3">
              <div className="text-2xl" style={{ fontFamily: "'Playfair Display', serif", color: '#033720' }}>
                J <span style={{ color: '#d8a21e' }}>&</span> C
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`transition-colors ${
                    isActive(item.href)
                      ? "text-[#033720] font-medium"
                      : "text-gray-600 hover:text-[#c95103]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/admin"
                className="px-4 py-2 rounded-lg transition-all"
                style={{ backgroundColor: '#033720', color: 'white' }}
              >
                Admin
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-4 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg ${
                    isActive(item.href)
                      ? "bg-[#033720] text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-lg"
                style={{ backgroundColor: '#033720', color: 'white' }}
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-20">
        <Outlet />
      </main>

      <footer className="bg-[#033720] text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Joël & Claudia
            </h3>
            <p className="text-gray-300 mb-4">Familles KOUATCHET & ZAMA</p>
            <p className="text-sm text-gray-400">© 2026 - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
