import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SlideshowManager from "./SlideshowManager";
import ItineraryManager from "./ItineraryManager";
import InclusionsManager from "./InclusionsManager";
import RichTextEditor from "./RichTextEditor";
import MapEditor from "./MapEditor";
import DestinationsMultiSelect from "./DestinationsMultiSelect";

interface TourEditorProps {
  tourId?: string;
}

// TODO: Replace with real categories from API
const categories = [
  "Adventure",
  "Cultural", 
  "Beach",
  "Trekking",
  "Wildlife",
  "Spiritual"
];

export default function TourEditor({ tourId }: TourEditorProps) {
  // TODO: Load existing tour data when editing
  // TODO: Submit to createTour()/updateTour() API

  const handleSave = () => {
    // TODO: Implement form submission with updateTour() API
    // TODO: Validate all required fields including destinations and route points
    // TODO: Handle slideshow images upload and ordering
    // TODO: Save rich text content with proper sanitization
    console.log("Save tour", tourId ? "update" : "create");
  };

  const handleCancel = () => {
    // TODO: Navigate back or show confirmation
    console.log("Cancel tour editing");
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter tour title" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" placeholder="tour-url-slug" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Brief tour description"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Detailed Content</Label>
                <RichTextEditor 
                  placeholder="Enter comprehensive tour description, itinerary highlights, and detailed information..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" placeholder="e.g., 5 days 4 nights" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" placeholder="1200" />
                </div>
              </div>

              {/* Destinations Multi-Select */}
              <DestinationsMultiSelect tourId={tourId || "new"} />

              {/* Route Points Map */}
              <MapEditor tourId={tourId || "new"} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch id="featured" />
                  <Label htmlFor="featured">Featured Tour</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input id="meta-title" placeholder="SEO-optimized title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea 
                  id="meta-description" 
                  placeholder="SEO description (150-160 characters)"
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images">
          <SlideshowManager tourId={tourId || "new"} />
        </TabsContent>

        <TabsContent value="itinerary">
          <ItineraryManager tourId={tourId || "new"} />
        </TabsContent>

        <TabsContent value="inclusions">
          <InclusionsManager tourId={tourId || "new"} />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4 pt-6 border-t">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          {tourId ? "Update Tour" : "Create Tour"}
        </Button>
      </div>
    </div>
  );
}