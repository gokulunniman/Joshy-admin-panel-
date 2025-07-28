import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InquiryDetailProps {
  inquiryId: string;
  inquiryType: string;
}

// TODO: Load inquiry data on mount based on inquiryId and inquiryType
// TODO: Submit status/notes via updateInquiryStatus API

const getPlaceholderInquiry = (type: string, id: string) => {
  switch (type) {
    case 'contact':
      return {
        id,
        name: "John Smith",
        email: "john.smith@email.com",
        subject: "General inquiry about services",
        message: "Hi, I'm interested in learning more about your tour packages. Could you please send me more information about your upcoming trips to Kerala?",
        phone: "+1 (555) 123-4567",
        date: "2024-01-20T10:30:00Z",
        status: "new",
        admin_notes: ""
      };
    case 'tour':
      return {
        id,
        name: "Emma Davis",
        email: "emma.davis@email.com",
        tour_title: "Kerala Backwaters Adventure",
        preferred_dates: "March 15-22, 2024",
        num_travelers: 2,
        special_requests: "We would like vegetarian meals and prefer AC accommodation.",
        budget_range: "$2000-2500",
        phone: "+1 (555) 987-6543",
        date: "2024-01-20T11:00:00Z",
        status: "quoted",
        admin_notes: "Sent initial quote via email. Waiting for response."
      };
    case 'homepage':
      return {
        id,
        name: "Admin User",
        email: "admin@company.com",
        section: "Hero Section",
        change_request: "Update main hero image to showcase winter destinations",
        priority: "high",
        deadline: "2024-02-01",
        date: "2024-01-20T12:00:00Z",
        status: "new",
        admin_notes: ""
      };
    default:
      return null;
  }
};

const getStatusOptions = (type: string) => {
  switch (type) {
    case 'tour':
      return ['new', 'quoted', 'booked', 'cancelled'];
    case 'contact':
    case 'homepage':
      return ['new', 'in_progress', 'resolved', 'closed'];
    default:
      return ['new', 'in_progress', 'resolved', 'closed'];
  }
};

export default function InquiryDetail({ inquiryId, inquiryType }: InquiryDetailProps) {
  const inquiry = getPlaceholderInquiry(inquiryType, inquiryId);
  
  if (!inquiry) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Inquiry not found</p>
      </div>
    );
  }

  const handleSave = () => {
    // TODO: Submit status/notes via updateInquiryStatus API
    console.log("Save inquiry updates", inquiryId, inquiryType);
  };

  const handleCancel = () => {
    // TODO: Navigate back or show confirmation
    console.log("Cancel inquiry editing");
  };

  const renderInquiryFields = () => {
    switch (inquiryType) {
      case 'contact':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" value={inquiry.subject} readOnly />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                value={inquiry.message} 
                readOnly 
                className="min-h-[120px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={inquiry.phone} readOnly />
            </div>
          </>
        );
        
      case 'tour':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="tour-title">Tour</Label>
              <Input id="tour-title" value={inquiry.tour_title} readOnly />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferred-dates">Preferred Dates</Label>
                <Input id="preferred-dates" value={inquiry.preferred_dates} readOnly />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="num-travelers">Number of Travelers</Label>
                <Input id="num-travelers" value={inquiry.num_travelers} readOnly />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget-range">Budget Range</Label>
              <Input id="budget-range" value={inquiry.budget_range} readOnly />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="special-requests">Special Requests</Label>
              <Textarea 
                id="special-requests" 
                value={inquiry.special_requests} 
                readOnly 
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={inquiry.phone} readOnly />
            </div>
          </>
        );
        
      case 'homepage':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Input id="section" value={inquiry.section} readOnly />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="change-request">Change Request</Label>
              <Textarea 
                id="change-request" 
                value={inquiry.change_request} 
                readOnly 
                className="min-h-[100px]"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Input id="priority" value={inquiry.priority} readOnly />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input id="deadline" value={inquiry.deadline} readOnly />
              </div>
            </div>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Inquiry Details</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Received: {new Date(inquiry.date).toLocaleString()}
              </p>
            </div>
            <Badge variant={inquiry.status === 'new' ? 'destructive' : 'secondary'}>
              {inquiry.status.replace('_', ' ')}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={inquiry.name} readOnly />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={inquiry.email} readOnly />
            </div>
          </div>
          
          {renderInquiryFields()}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Admin Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue={inquiry.status}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getStatusOptions(inquiryType).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="admin-notes">Admin Notes</Label>
            <Textarea 
              id="admin-notes" 
              defaultValue={inquiry.admin_notes}
              placeholder="Add internal notes about this inquiry..."
              className="min-h-[120px]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4 pt-6 border-t">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}