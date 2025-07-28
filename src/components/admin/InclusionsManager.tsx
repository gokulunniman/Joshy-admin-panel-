import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface InclusionsManagerProps {
  tourId: string;
}

// TODO: Replace with real inclusions/exclusions data from API
const inclusions = [
  { id: "1", text: "Accommodation in 4-star hotels", order: 1 },
  { id: "2", text: "All meals (breakfast, lunch, dinner)", order: 2 },
  { id: "3", text: "Professional tour guide", order: 3 },
  { id: "4", text: "Transportation in AC vehicle", order: 4 }
];

const exclusions = [
  { id: "1", text: "International flights", order: 1 },
  { id: "2", text: "Personal expenses and tips", order: 2 },
  { id: "3", text: "Travel insurance", order: 3 },
  { id: "4", text: "Optional activities", order: 4 }
];

export default function InclusionsManager({ tourId }: InclusionsManagerProps) {
  // TODO: Wire to API for CRUD operations
  
  const handleAddInclusion = () => {
    // TODO: Add new inclusion
    console.log("Add inclusion to tour:", tourId);
  };

  const handleAddExclusion = () => {
    // TODO: Add new exclusion  
    console.log("Add exclusion to tour:", tourId);
  };

  const handleUpdateItem = (type: 'inclusion' | 'exclusion', itemId: string, text: string) => {
    // TODO: Update inclusion/exclusion text
    console.log("Update", type, itemId, text);
  };

  const handleRemoveItem = (type: 'inclusion' | 'exclusion', itemId: string) => {
    // TODO: Remove inclusion/exclusion
    console.log("Remove", type, itemId);
  };

  const handleReorderItem = (type: 'inclusion' | 'exclusion', itemId: string, newOrder: number) => {
    // TODO: Reorder inclusions/exclusions
    console.log("Reorder", type, itemId, "to position:", newOrder);
  };

  const renderItemsList = (
    items: typeof inclusions, 
    type: 'inclusion' | 'exclusion',
    onAdd: () => void
  ) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="capitalize">{type}s</CardTitle>
          <Button onClick={onAdd} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add {type}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
            <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
            
            <div className="flex-1">
              <Input
                defaultValue={item.text}
                onChange={(e) => handleUpdateItem(type, item.id, e.target.value)}
                placeholder={`Enter ${type} item`}
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRemoveItem(type, item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <p>No {type}s added yet.</p>
            <p>Click "Add {type}" to start building your list.</p>
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          TODO: Implement drag and drop reordering for {type}s
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {renderItemsList(inclusions, 'inclusion', handleAddInclusion)}
      {renderItemsList(exclusions, 'exclusion', handleAddExclusion)}
    </div>
  );
}