import AdminLayout from "@/components/admin/AdminLayout";
import HomepageSectionsList from "@/components/admin/HomepageSectionsList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export default function AdminHomepage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-800">Homepage Content</h1>
            <p className="text-gray-600">
              Manage homepage sections and content
            </p>
          </div>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Link to="/admin/homepage/new">
              <Plus className="h-4 w-4 mr-2" />
              Create New Section
            </Link>
          </Button>
        </div>

        <HomepageSectionsList />
      </div>
    </AdminLayout>
  );
}