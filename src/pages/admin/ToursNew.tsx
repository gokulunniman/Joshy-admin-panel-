import AdminLayout from "@/components/admin/AdminLayout";
import TourEditor from "@/components/admin/TourEditor";

export default function ToursNew() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create New Tour</h1>
          <p className="text-muted-foreground mt-2">Add a new tour to your collection</p>
        </div>
        
        <TourEditor />
      </div>
    </AdminLayout>
  );
}