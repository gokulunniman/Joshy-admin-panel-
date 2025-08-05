import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Star, X } from "lucide-react";

interface FeaturedToursSelectorProps {
  value?: string[];
  onChange?: (selectedTours: string[]) => void;
}

interface Tour {
  id: string;
  title: string;
  category: string;
  duration: string;
  price: string;
  image: string;
  featured: boolean;
}

export default function FeaturedToursSelector({ value = [], onChange }: FeaturedToursSelectorProps) {
  // TODO: Fetch tours from getAllTours API with Supabase RLS policies
  // TODO: Implement real-time updates for tour selection changes
  // TODO: Add tour preview functionality with image display

  const [selectedTours, setSelectedTours] = useState<string[]>(value);
  const [searchQuery, setSearchQuery] = useState("");

  // Placeholder tours data - TODO: Replace with API data
  const allTours: Tour[] = [
    {
      id: "1",
      title: "Kerala Backwaters Adventure",
      category: "kerala",
      duration: "7 days",
      price: "₹25,000",
      image: "/api/placeholder/300/200",
      featured: true
    },
    {
      id: "2",
      title: "Golden Triangle Classic",
      category: "heritage",
      duration: "10 days",
      price: "₹35,000",
      image: "/api/placeholder/300/200",
      featured: false
    },
    {
      id: "3",
      title: "Ayurveda Wellness Retreat",
      category: "ayurveda",
      duration: "14 days",
      price: "₹45,000",
      image: "/api/placeholder/300/200",
      featured: true
    },
    {
      id: "4",
      title: "Himalayan Adventure Trek",
      category: "discover-india",
      duration: "12 days",
      price: "₹40,000",
      image: "/api/placeholder/300/200",
      featured: false
    },
    {
      id: "5",
      title: "Bali Paradise Escape",
      category: "global",
      duration: "8 days",
      price: "₹55,000",
      image: "/api/placeholder/300/200",
      featured: false
    }
  ];

  const filteredTours = allTours.filter(tour =>
    tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTourToggle = (tourId: string, checked: boolean) => {
    // TODO: Update featured tours in homepage_content table via Supabase
    let newSelection;
    if (checked) {
      newSelection = [...selectedTours, tourId];
    } else {
      newSelection = selectedTours.filter(id => id !== tourId);
    }
    setSelectedTours(newSelection);
    onChange?.(newSelection);
    console.log("Toggle featured tour", tourId, "to", checked);
  };

  const handleRemoveTour = (tourId: string) => {
    // TODO: Remove from featured tours via API
    const newSelection = selectedTours.filter(id => id !== tourId);
    setSelectedTours(newSelection);
    onChange?.(newSelection);
    console.log("Remove featured tour", tourId);
  };

  const getSelectedTourDetails = (tourId: string) => {
    return allTours.find(tour => tour.id === tourId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Featured Tours Selection</span>
          <Badge variant="secondary">{selectedTours.length} Selected</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose which tours to highlight on the homepage. Selected tours will appear in the "Tour Offers" section.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="tour-search">Search Tours</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="tour-search"
              placeholder="Search by tour name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Selected Tours */}
        {selectedTours.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Currently Featured</Label>
            <div className="flex flex-wrap gap-2">
              {selectedTours.map((tourId) => {
                const tour = getSelectedTourDetails(tourId);
                return tour ? (
                  <Badge
                    key={tourId}
                    variant="default"
                    className="flex items-center gap-1 pr-1"
                  >
                    <Star className="h-3 w-3" />
                    {tour.title}
                    <button
                      type="button"
                      onClick={() => handleRemoveTour(tourId)}
                      className="ml-1 rounded-full hover:bg-primary-foreground/20 p-1"
                      aria-label={`Remove ${tour.title} from featured tours`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Available Tours */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Available Tours</Label>
          <div className="max-h-96 overflow-y-auto space-y-3 border rounded-md p-4">
            {filteredTours.map((tour) => (
              <div
                key={tour.id}
                className="flex items-center space-x-4 p-3 border rounded-lg bg-card hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  id={`tour-${tour.id}`}
                  checked={selectedTours.includes(tour.id)}
                  onCheckedChange={(checked) => handleTourToggle(tour.id, checked as boolean)}
                />
                
                <div className="flex-shrink-0">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-16 h-12 object-cover rounded border"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <Label htmlFor={`tour-${tour.id}`} className="text-sm font-medium cursor-pointer">
                    {tour.title}
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {tour.category.replace('-', ' ')}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {tour.duration} • {tour.price}
                    </span>
                  </div>
                </div>
                
                {tour.featured && (
                  <Badge variant="default" className="text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
            ))}
            
            {filteredTours.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No tours found matching your search
              </div>
            )}
          </div>
        </div>

        <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-md">
          <strong>TODO:</strong> Wire to getAllTours API and updateHomepageFeaturedTours with proper Supabase RLS policies
        </div>
      </CardContent>
    </Card>
  );
}