import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminHomepage from "./pages/admin/Homepage";
import AdminHomepageNew from "./pages/admin/HomepageNew";
import AdminHomepageEdit from "./pages/admin/HomepageEdit";
import AdminTours from "./pages/admin/Tours";
import AdminToursNew from "./pages/admin/ToursNew";
import AdminToursEdit from "./pages/admin/ToursEdit";
import AdminInquiries from "./pages/admin/Inquiries";
import AdminInquiryDetail from "./pages/admin/InquiryDetailPage";
import AdminSettings from "./pages/admin/Settings";
import AdminUsers from "./pages/admin/Users";
import AdminUsersNew from "./pages/admin/UsersNew";
import AdminUsersEdit from "./pages/admin/UsersEdit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/homepage" element={<AdminHomepage />} />
          <Route path="/admin/homepage/new" element={<AdminHomepageNew />} />
          <Route path="/admin/homepage/:id" element={<AdminHomepageEdit />} />
          <Route path="/admin/tours" element={<AdminTours />} />
          <Route path="/admin/tours/new" element={<AdminToursNew />} />
          <Route path="/admin/tours/:id" element={<AdminToursEdit />} />
          <Route path="/admin/inquiries" element={<AdminInquiries />} />
          <Route path="/admin/inquiries/:type/:id" element={<AdminInquiryDetail />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/users/new" element={<AdminUsersNew />} />
          <Route path="/admin/users/:id" element={<AdminUsersEdit />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
