import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Home, 
  MapPin, 
  MessageSquare, 
  Settings, 
  Users,
  LogOut
} from "lucide-react";

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

  // TODO: Implement Supabase session check to guard admin routes
  const handleLogout = () => {
    // TODO: Implement Supabase Auth signOut() here
    console.log("Logout clicked");
  };

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-muted border-r border-border p-4 fixed left-0 top-0 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Tourism CMS</p>
        </div>
        
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {navigationItems.find(item => isActiveRoute(item.href))?.name || "Admin Panel"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" target="_blank" className="text-sm text-muted-foreground hover:text-primary">
              View Website
            </Link>
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}