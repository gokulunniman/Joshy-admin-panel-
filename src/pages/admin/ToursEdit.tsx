import AdminLayout from "@/components/admin/AdminLayout";
import TourEditor from "@/components/admin/TourEditor";
import { useParams } from "react-router-dom";

export default function ToursEdit() {
  const { id } = useParams<{ id: string }>();
  
  // TODO: Fetch tour data based on id
  
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Tour</h1>
          <p className="text-muted-foreground mt-2">Update tour information and settings</p>
        </div>
        
        <TourEditor tourId={id} />
      </div>
    </AdminLayout>
  );
}