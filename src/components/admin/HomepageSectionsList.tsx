import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";

export default function HomepageSectionsList() {
  // TODO: Wire list fetch to API
  const sections = [
    {
      id: "1",
      section: "hero",
      title: "Welcome to Kerala Tourism",
      is_active: true,
      sort_order: 1
    },
    {
      id: "2", 
      section: "features",
      title: "Why Choose Us",
      is_active: true,
      sort_order: 2
    },
    {
      id: "3",
      section: "testimonials",
      title: "Customer Reviews",
      is_active: false,
      sort_order: 3
    }
  ];

  // TODO: Wire delete to API
  const handleDelete = (id: string) => {
    console.log("Delete section:", id);
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Homepage Sections</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="table-auto w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Section</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sections.map((section) => (
                <TableRow key={section.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{section.section}</TableCell>
                  <TableCell>{section.title}</TableCell>
                  <TableCell>
                    <Badge variant={section.is_active ? "default" : "secondary"}>
                      {section.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{section.sort_order}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/admin/homepage/${section.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(section.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
      </CardContent>
    </Card>
  );
}