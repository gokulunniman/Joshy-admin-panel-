import { useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import UserEditor from "@/components/admin/UserEditor";

export default function UsersEdit() {
  const { id: userId } = useParams<{ id: string }>();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Admin User</h1>
          <p className="text-gray-600 mt-2">Update administrator details and permissions</p>
        </div>

        <UserEditor userId={userId} />
      </div>
    </AdminLayout>
  );
}