import AdminLayout from "@/components/admin/AdminLayout";
import ToursTable from "@/components/admin/ToursTable";
import ExportButton from "@/components/admin/ExportButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Tours() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tours Management</h1>
            <p className="text-muted-foreground mt-2">Manage and organize your tour listings</p>
            {/* TODO: Replace with real count from API */}
            <p className="text-sm text-muted-foreground">Total tours: 12</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <ExportButton entity="tours" />
            <Button asChild>
              <Link to="/admin/tours/new">Create New Tour</Link>
            </Button>
          </div>
        </div>
        
        <ToursTable />
      </div>
    </AdminLayout>
  );
}