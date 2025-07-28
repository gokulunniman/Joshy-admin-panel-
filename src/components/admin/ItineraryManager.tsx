import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface ItineraryManagerProps {
  tourId: string;
}

// TODO: Replace with real itinerary data from API
const itineraryDays = [
  {
    id: "1",
    day: 1,
    title: "Arrival and Welcome",
    description: "Arrive at destination, check-in to hotel, welcome dinner and tour briefing."
  },
  {
    id: "2",
    day: 2, 
    title: "City Exploration",
    description: "Full day city tour visiting major attractions and local markets."
  },
  {
    id: "3",
    day: 3,
    title: "Adventure Activities",
    description: "Outdoor activities including hiking, water sports, and nature exploration."
  }
];

export default function ItineraryManager({ tourId }: ItineraryManagerProps) {
  // TODO: Wire to API for CRUD operations
  
  const handleAddDay = () => {
    // TODO: Add new itinerary day
    console.log("Add new day to tour:", tourId);
  };

  const handleUpdateDay = (dayId: string, field: string, value: string) => {
    // TODO: Update itinerary day
    console.log("Update day:", dayId, field, value);
  };

  const handleRemoveDay = (dayId: string) => {
    // TODO: Remove itinerary day
    console.log("Remove day:", dayId);
  };

  const handleReorderDay = (dayId: string, newOrder: number) => {
    // TODO: Reorder itinerary days
    console.log("Reorder day:", dayId, "to position:", newOrder);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Tour Itinerary</CardTitle>
          <Button onClick={handleAddDay}>
            <Plus className="h-4 w-4 mr-2" />
            Add Day
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {itineraryDays.map((day) => (
          <div key={day.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                <span className="font-medium">Day {day.day}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRemoveDay(day.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`day-${day.id}-title`}>Day Title</Label>
                <Input
                  id={`day-${day.id}-title`}
                  defaultValue={day.title}
                  onChange={(e) => handleUpdateDay(day.id, "title", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`day-${day.id}-description`}>Description</Label>
              <Textarea
                id={`day-${day.id}-description`}
                defaultValue={day.description}
                onChange={(e) => handleUpdateDay(day.id, "description", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        ))}

        {itineraryDays.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No itinerary days added yet.</p>
            <p>Click "Add Day" to start building your tour itinerary.</p>
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          TODO: Implement drag and drop reordering for itinerary days
        </p>
      </CardContent>
    </Card>
  );
}