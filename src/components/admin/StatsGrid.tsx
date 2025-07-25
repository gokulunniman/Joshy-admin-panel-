import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Package, Mail, TrendingUp } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => (
  <Card className="bg-white shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
      <div className="h-4 w-4 text-gray-400">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <p className="text-xs text-gray-500 mt-1">Placeholder data</p>
    </CardContent>
  </Card>
);

export default function StatsGrid() {
  // TODO: Replace with real data from Supabase
  const stats = [
    {
      title: "Total Tours",
      value: "—",
      icon: <Package className="h-4 w-4" />
    },
    {
      title: "Published Tours", 
      value: "—",
      icon: <BarChart3 className="h-4 w-4" />
    },
    {
      title: "New Inquiries",
      value: "—", 
      icon: <Mail className="h-4 w-4" />
    },
    {
      title: "Conversion Rate",
      value: "—",
      icon: <TrendingUp className="h-4 w-4" />
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}