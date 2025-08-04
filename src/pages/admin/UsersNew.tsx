import AdminLayout from "@/components/admin/AdminLayout";
import UserEditor from "@/components/admin/UserEditor";

export default function UsersNew() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Admin User</h1>
          <p className="text-gray-600 mt-2">Add a new administrator to the system</p>
        </div>

        <UserEditor />
      </div>
    </AdminLayout>
  );
}