import AdminLayout from "@/components/admin/AdminLayout";
import HomepageContentEditor from "@/components/admin/HomepageContentEditor";

export default function AdminHomepageNew() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">Create Homepage Section</h1>
          <p className="text-gray-600">
            Add a new section to your homepage
          </p>
        </div>

        <HomepageContentEditor />
      </div>
    </AdminLayout>
  );
}