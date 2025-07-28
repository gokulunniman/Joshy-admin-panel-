import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface InquiriesTableProps {
  inquiryType: 'contact' | 'tour' | 'homepage';
}

// TODO: Wire fetch to getAllContactInquiries() / getAllTourInquiries() / getAllHomepageInquiries() API
const getPlaceholderData = (type: string) => {
  switch (type) {
    case 'contact':
      return [
        {
          id: "1",
          name: "John Smith",
          email: "john.smith@email.com",
          date: "2024-01-20T10:30:00Z",
          status: "new",
          subject: "General inquiry about services"
        },
        {
          id: "2",
          name: "Sarah Johnson",
          email: "sarah.j@email.com", 
          date: "2024-01-19T14:45:00Z",
          status: "in_progress",
          subject: "Questions about tour packages"
        },
        {
          id: "3",
          name: "Mike Wilson",
          email: "mike.wilson@email.com",
          date: "2024-01-18T09:15:00Z",
          status: "resolved",
          subject: "Feedback on recent tour"
        }
      ];
    case 'tour':
      return [
        {
          id: "1",
          name: "Emma Davis",
          email: "emma.davis@email.com",
          date: "2024-01-20T11:00:00Z",
          status: "quoted",
          tour_title: "Kerala Backwaters Adventure",
          preferred_dates: "March 15-22, 2024"
        },
        {
          id: "2",
          name: "Robert Chen",
          email: "robert.chen@email.com",
          date: "2024-01-19T16:30:00Z",
          status: "new",
          tour_title: "Himalayan Trek Experience",
          preferred_dates: "April 10-20, 2024"
        },
        {
          id: "3",
          name: "Lisa Anderson",
          email: "lisa.anderson@email.com",
          date: "2024-01-18T13:20:00Z",
          status: "booked",
          tour_title: "Goa Beach Paradise",
          preferred_dates: "February 28 - March 5, 2024"
        }
      ];
    case 'homepage':
      return [
        {
          id: "1",
          name: "Admin User",
          email: "admin@company.com",
          date: "2024-01-20T12:00:00Z",
          status: "new",
          section: "Hero Section",
          change_request: "Update main hero image"
        },
        {
          id: "2",
          name: "Marketing Team",
          email: "marketing@company.com",
          date: "2024-01-19T10:15:00Z",
          status: "in_progress",
          section: "Featured Tours",
          change_request: "Add new promotional tour"
        }
      ];
    default:
      return [];
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'new':
      return 'destructive';
    case 'in_progress':
      return 'secondary';
    case 'resolved':
    case 'booked':
      return 'default';
    case 'closed':
    case 'cancelled':
      return 'outline';
    case 'quoted':
      return 'secondary';
    default:
      return 'secondary';
  }
};

export default function InquiriesTable({ inquiryType }: InquiriesTableProps) {
  const inquiries = getPlaceholderData(inquiryType);

  const renderTableHeaders = () => {
    const commonHeaders = ['Name', 'Email', 'Date', 'Status', 'Actions'];
    
    switch (inquiryType) {
      case 'tour':
        return ['Name', 'Email', 'Tour', 'Dates', 'Status', 'Actions'];
      case 'homepage':
        return ['Name', 'Email', 'Section', 'Date', 'Status', 'Actions'];
      default:
        return commonHeaders;
    }
  };

  const renderTableRow = (inquiry: any) => (
    <TableRow key={inquiry.id}>
      <TableCell className="font-medium">{inquiry.name}</TableCell>
      <TableCell>{inquiry.email}</TableCell>
      
      {inquiryType === 'tour' && (
        <>
          <TableCell>{inquiry.tour_title}</TableCell>
          <TableCell className="text-sm">{inquiry.preferred_dates}</TableCell>
        </>
      )}
      
      {inquiryType === 'homepage' && (
        <TableCell>{inquiry.section}</TableCell>
      )}
      
      {inquiryType === 'contact' && (
        <TableCell className="text-sm">{inquiry.subject}</TableCell>
      )}
      
      <TableCell>
        {new Date(inquiry.date).toLocaleDateString()}
      </TableCell>
      
      <TableCell>
        <Badge variant={getStatusVariant(inquiry.status)}>
          {inquiry.status.replace('_', ' ')}
        </Badge>
      </TableCell>
      
      <TableCell>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/admin/inquiries/${inquiryType}/${inquiry.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            View
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold capitalize">
          {inquiryType} Inquiries ({inquiries.length})
        </h3>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {renderTableHeaders().map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.length > 0 ? (
              inquiries.map(renderTableRow)
            ) : (
              <TableRow>
                <TableCell 
                  colSpan={renderTableHeaders().length} 
                  className="text-center py-8 text-muted-foreground"
                >
                  No {inquiryType} inquiries found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}