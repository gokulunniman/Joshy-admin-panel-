import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface MapEditorProps {
  tourId: string;
}

interface RoutePoint {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  order: number;
}

export default function MapEditor({ tourId }: MapEditorProps) {
  // TODO: Replace with actual map library integration (Mapbox, Google Maps, Leaflet)
  // TODO: Integrate with route points API for saving/loading tour route data
  // TODO: Add geocoding for address-to-coordinates conversion
  
  const [routePoints, setRoutePoints] = useState<RoutePoint[]>([
    { id: "1", latitude: 28.7041, longitude: 77.1025, name: "Delhi", order: 1 },
    { id: "2", latitude: 27.1767, longitude: 78.0081, name: "Agra", order: 2 },
  ]);

  const [newPoint, setNewPoint] = useState({
    latitude: "",
    longitude: "",
    name: "",
  });

  const handleAddPoint = () => {
    // TODO: Validate coordinates and save to API
    console.log("Add route point", newPoint, "for tour", tourId);
  };

  const handleRemovePoint = (pointId: string) => {
    // TODO: Remove from API and update route
    console.log("Remove route point", pointId, "for tour", tourId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Tour Route & Location Points
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Map Placeholder */}
        <div className="h-64 w-full bg-muted rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
          <div className="text-center space-y-2">
            <MapPin className="h-8 w-8 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Interactive Map Placeholder
            </p>
            <p className="text-xs text-muted-foreground">
              TODO: Integrate actual map library with route visualization
            </p>
          </div>
        </div>

        {/* Add New Route Point */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Add Route Point</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="point-name">Location Name</Label>
              <Input
                id="point-name"
                placeholder="e.g., Delhi"
                value={newPoint.name}
                onChange={(e) => setNewPoint(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                placeholder="28.7041"
                value={newPoint.latitude}
                onChange={(e) => setNewPoint(prev => ({ ...prev, latitude: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                placeholder="77.1025"
                value={newPoint.longitude}
                onChange={(e) => setNewPoint(prev => ({ ...prev, longitude: e.target.value }))}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddPoint} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Point
              </Button>
            </div>
          </div>
        </div>

        {/* Existing Route Points */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Current Route Points</h4>
          <div className="space-y-2">
            {routePoints.map((point, index) => (
              <div key={point.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium">{point.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {point.latitude}, {point.longitude}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemovePoint(point.id)}
                  aria-label={`Remove ${point.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
