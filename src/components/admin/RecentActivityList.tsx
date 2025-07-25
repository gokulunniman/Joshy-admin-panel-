import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecentActivityList() {
  // TODO: Replace with real activity data from Supabase
  const activities = [
    "New tour inquiry received",
    "Homepage content updated", 
    "Tour 'Kerala Backwaters' published",
    "User feedback submitted",
    "Site settings updated"
  ];

  return (
    <Card className="bg-white shadow-sm mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {activities.map((activity, index) => (
            <li 
              key={index}
              className="flex justify-between items-center px-4 py-2 hover:bg-gray-50 rounded-md cursor-pointer"
            >
              <span className="text-sm text-gray-700">{activity}</span>
              <span className="text-xs text-gray-400">2 mins ago</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}