import AdminLayout from "@/components/admin/AdminLayout";
import InquiryTabs from "@/components/admin/InquiryTabs";
import ExportButton from "@/components/admin/ExportButton";

export default function Inquiries() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inquiries Manager</h1>
            <p className="text-muted-foreground mt-2">Manage and respond to customer inquiries</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <ExportButton entity="contact-submissions" />
            <ExportButton entity="tour-inquiries" />
            <ExportButton entity="homepage-inquiries" />
          </div>
        </div>
        
        <InquiryTabs />
      </div>
    </AdminLayout>
  );
}