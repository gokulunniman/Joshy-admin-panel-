import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Home, 
  MapPin, 
  MessageSquare, 
  Settings, 
  Users,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface AdminLayoutProps {
  children: ReactNode;
}

const navigationItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Homepage CMS",
    href: "/admin/homepage",
    icon: Home,
  },
  {
    name: "Tours Management",
    href: "/admin/tours",
    icon: MapPin,
  },
  {
    name: "Inquiries Manager",
    href: "/admin/inquiries",
    icon: MessageSquare,
  },
  {
    name: "Site Settings",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    name: "Admin Users",
    href: "/admin/users",
    icon: Users,
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Redirect non-admin users
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login", { replace: true });
    }
  }, [user, isAdmin, loading, navigate]);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Successfully signed out");
      navigate("/admin/login", { replace: true });
    } catch (error) {
      toast.error("Failed to sign out");
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null; // Will redirect via useEffect
  }

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile menu button */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <Button
          onClick={toggleMobileMenu}
          className="bg-white shadow-md hover:bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          size="icon"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-40 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0`}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200 px-4">
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
            <p className="text-xs text-gray-600">Tourism CMS</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                aria-label={`Navigate to ${item.name}`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-4 pb-4">
          <Button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 mt-auto text-sm text-red-600 hover:bg-red-50 bg-transparent border-0 shadow-none focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 sm:ml-64">
        <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {navigationItems.find(item => isActiveRoute(item.href))?.name || "Admin Panel"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {user?.email}
            </span>
            <Link 
              to="/" 
              target="_blank" 
              className="text-sm text-gray-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1"
              aria-label="View website in new tab"
            >
              View Website
            </Link>
          </div>
        </header>
        
        <main className="p-6 bg-gray-50 overflow-auto min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}