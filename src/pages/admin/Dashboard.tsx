import AdminLayout from "@/components/admin/AdminLayout";
import StatsGrid from "@/components/admin/StatsGrid";
import ChartPlaceholder from "@/components/admin/ChartPlaceholder";
import RecentActivityList from "@/components/admin/RecentActivityList";
import QuickActions from "@/components/admin/QuickActions";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">Dashboard</h1>
          <p className="text-gray-600">
            Welcome to the admin panel. Here's an overview of your tourism website.
          </p>
        </div>

        {/* Stats Grid */}
        <StatsGrid />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Chart */}
          <div className="lg:col-span-2">
            <ChartPlaceholder />
          </div>
          
          {/* Right Column - Activity & Actions */}
          <div className="space-y-6">
            <RecentActivityList />
            <QuickActions />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}