import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function QuickActions() {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4">
          {/* TODO: Implement actual routing to tour creation page */}
          <Button 
            asChild 
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Link to="/admin/tours/new">Create New Tour</Link>
          </Button>
          
          {/* TODO: Implement actual routing to homepage editor */}
          <Button 
            asChild
            variant="outline" 
            className="flex-1 border-indigo-600 text-indigo-700 hover:bg-indigo-50"
          >
            <Link to="/admin/homepage">Edit Homepage</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}