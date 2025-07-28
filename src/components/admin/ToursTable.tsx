import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

// TODO: Replace with real tour data from API
const tours = [
  {
    id: "1",
    title: "Kerala Backwaters Adventure",
    category: "Adventure",
    status: "Published",
    featured: true,
    price: 1200,
    updated_at: "2024-01-15T10:30:00Z"
  },
  {
    id: "2", 
    title: "Himalayan Trek Experience",
    category: "Trekking",
    status: "Draft",
    featured: false,
    price: 1800,
    updated_at: "2024-01-14T15:45:00Z"
  },
  {
    id: "3",
    title: "Goa Beach Paradise",
    category: "Beach",
    status: "Published",
    featured: true,
    price: 800,
    updated_at: "2024-01-13T09:20:00Z"
  },
  {
    id: "4",
    title: "Rajasthan Desert Safari",
    category: "Cultural",
    status: "Archived",
    featured: false,
    price: 1500,
    updated_at: "2024-01-12T14:15:00Z"
  }
];

export default function ToursTable() {
  // TODO: Wire table data and actions to API stubs
  
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Published':
        return 'default';
      case 'Draft':
        return 'secondary';
      case 'Archived':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const handleToggleFeatured = (tourId: string, featured: boolean) => {
    // TODO: Wire to API updateTour({ featured })
    console.log(`Toggle featured for tour ${tourId}: ${featured}`);
  };

  const handleDelete = (tourId: string) => {
    // TODO: Wire to API deleteTour(tourId)
    console.log(`Delete tour ${tourId}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tours.map((tour) => (
            <TableRow key={tour.id}>
              <TableCell className="font-medium">{tour.title}</TableCell>
              <TableCell>{tour.category}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(tour.status)}>
                  {tour.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Switch
                  checked={tour.featured}
                  onCheckedChange={(checked) => handleToggleFeatured(tour.id, checked)}
                />
              </TableCell>
              <TableCell>${tour.price}</TableCell>
              <TableCell>
                {new Date(tour.updated_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/admin/tours/${tour.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(tour.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}