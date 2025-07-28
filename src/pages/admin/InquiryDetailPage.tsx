import AdminLayout from "@/components/admin/AdminLayout";
import InquiryDetail from "@/components/admin/InquiryDetail";
import { useParams } from "react-router-dom";

export default function InquiryDetailPage() {
  const { type, id } = useParams<{ type: string; id: string }>();
  
  if (!type || !id) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Invalid inquiry URL</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const getPageTitle = (type: string) => {
    switch (type) {
      case 'contact':
        return 'Contact Inquiry';
      case 'tour':
        return 'Tour Inquiry';
      case 'homepage':
        return 'Homepage Change Request';
      default:
        return 'Inquiry Details';
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{getPageTitle(type)}</h1>
          <p className="text-muted-foreground mt-2">Review and manage inquiry details</p>
        </div>
        
        <InquiryDetail inquiryId={id} inquiryType={type} />
      </div>
    </AdminLayout>
  );
}