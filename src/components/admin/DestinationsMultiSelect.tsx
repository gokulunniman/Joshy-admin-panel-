import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

interface DestinationsMultiSelectProps {
  tourId: string;
  value?: string[];
  onChange?: (destinations: string[]) => void;
}

interface Destination {
  id: string;
  name: string;
  state: string;
  country: string;
}

export default function DestinationsMultiSelect({ 
  tourId, 
  value = [], 
  onChange 
}: DestinationsMultiSelectProps) {
  // TODO: Fetch actual destinations from categories API
  // TODO: Implement real multi-select functionality with controlled state
  // TODO: Add destination search and filtering capabilities
  
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(value);
  
  // Placeholder destinations - TODO: Replace with API data
  const destinations: Destination[] = [
    { id: "delhi", name: "Delhi", state: "Delhi", country: "India" },
    { id: "agra", name: "Agra", state: "Uttar Pradesh", country: "India" },
    { id: "jaipur", name: "Jaipur", state: "Rajasthan", country: "India" },
    { id: "goa", name: "Goa", state: "Goa", country: "India" },
    { id: "mumbai", name: "Mumbai", state: "Maharashtra", country: "India" },
    { id: "kerala", name: "Kerala", state: "Kerala", country: "India" },
    { id: "himachal", name: "Himachal Pradesh", state: "Himachal Pradesh", country: "India" },
    { id: "rajasthan", name: "Rajasthan", state: "Rajasthan", country: "India" },
    { id: "kashmir", name: "Kashmir", state: "Jammu & Kashmir", country: "India" },
    { id: "ladakh", name: "Ladakh", state: "Ladakh", country: "India" },
  ];

  const handleSelectDestination = (destinationId: string) => {
    // TODO: Update tour destinations in API
    if (!selectedDestinations.includes(destinationId)) {
      const newSelection = [...selectedDestinations, destinationId];
      setSelectedDestinations(newSelection);
      onChange?.(newSelection);
      console.log("Add destination", destinationId, "to tour", tourId);
    }
  };

  const handleRemoveDestination = (destinationId: string) => {
    // TODO: Remove destination from tour in API
    const newSelection = selectedDestinations.filter(id => id !== destinationId);
    setSelectedDestinations(newSelection);
    onChange?.(newSelection);
    console.log("Remove destination", destinationId, "from tour", tourId);
  };

  const getDestinationName = (id: string) => {
    return destinations.find(d => d.id === id)?.name || id;
  };

  const availableDestinations = destinations.filter(
    dest => !selectedDestinations.includes(dest.id)
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="destinations">Tour Destinations</Label>
        <Select onValueChange={handleSelectDestination}>
          <SelectTrigger>
            <SelectValue placeholder="Select destinations covered in this tour" />
          </SelectTrigger>
          <SelectContent>
            {availableDestinations.map((destination) => (
              <SelectItem key={destination.id} value={destination.id}>
                <div className="flex flex-col">
                  <span>{destination.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {destination.state}, {destination.country}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Selected Destinations */}
      {selectedDestinations.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Selected Destinations</Label>
          <div className="flex flex-wrap gap-2">
            {selectedDestinations.map((destinationId) => (
              <Badge
                key={destinationId}
                variant="secondary"
                className="flex items-center gap-1 pr-1"
              >
                {getDestinationName(destinationId)}
                <button
                  type="button"
                  onClick={() => handleRemoveDestination(destinationId)}
                  className="ml-1 rounded-full hover:bg-muted-foreground/20 p-1"
                  aria-label={`Remove ${getDestinationName(destinationId)}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        TODO: Fetch destinations from categories API and implement proper multi-select state management
      </p>
    </div>
  );
}