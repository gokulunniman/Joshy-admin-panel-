import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface User {
  id: string;
  email: string;
  fullName: string;
  role: "super_admin" | "admin" | "editor";
  lastLogin: string;
  active: boolean;
}

// TODO: Replace with actual API data
const placeholderUsers: User[] = [
  {
    id: "1",
    email: "admin@tourismwebsite.com",
    fullName: "John Doe",
    role: "super_admin",
    lastLogin: "2024-01-15 10:30 AM",
    active: true,
  },
  {
    id: "2",
    email: "editor@tourismwebsite.com",
    fullName: "Jane Smith",
    role: "editor",
    lastLogin: "2024-01-14 3:45 PM",
    active: true,
  },
  {
    id: "3",
    email: "manager@tourismwebsite.com",
    fullName: "Mike Johnson",
    role: "admin",
    lastLogin: "2024-01-13 9:15 AM",
    active: false,
  },
];

const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case "super_admin":
      return "destructive";
    case "admin":
      return "default";
    case "editor":
      return "secondary";
    default:
      return "outline";
  }
};

const formatRole = (role: string) => {
  switch (role) {
    case "super_admin":
      return "Super Admin";
    case "admin":
      return "Admin";
    case "editor":
      return "Editor";
    default:
      return role;
  }
};

export default function UsersTable() {
  const handleDelete = (userId: string) => {
    // TODO: Wire user CRUD API stubs
    console.log(`Deleting user ${userId}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Users ({placeholderUsers.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {placeholderUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {formatRole(user.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.active ? "default" : "secondary"}>
                      {user.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link to={`/admin/users/${user.id}`}>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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