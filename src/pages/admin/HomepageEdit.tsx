import { useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import HomepageContentEditor from "@/components/admin/HomepageContentEditor";

export default function AdminHomepageEdit() {
  // TODO: Add proper async data fetching for section details
  const { id } = useParams<{ id: string }>();
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">Edit Homepage Section</h1>
          <p className="text-gray-600">
            Modify existing homepage section content
          </p>
        </div>

        <HomepageContentEditor sectionId={id} />
      </div>
    </AdminLayout>
  );
}