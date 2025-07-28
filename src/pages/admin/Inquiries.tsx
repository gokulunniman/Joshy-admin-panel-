import AdminLayout from "@/components/admin/AdminLayout";
import InquiryTabs from "@/components/admin/InquiryTabs";

export default function Inquiries() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inquiries Manager</h1>
          <p className="text-muted-foreground mt-2">Manage and respond to customer inquiries</p>
        </div>
        
        <InquiryTabs />
      </div>
    </AdminLayout>
  );
}