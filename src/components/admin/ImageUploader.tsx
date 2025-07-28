import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X } from "lucide-react";

interface ImageUploaderProps {
  tourId: string;
}

// TODO: Replace with real image data from API
const existingImages = [
  {
    id: "1",
    url: "/placeholder.svg",
    alt: "Tour image 1",
    order: 1
  },
  {
    id: "2", 
    url: "/placeholder.svg",
    alt: "Tour image 2",
    order: 2
  }
];

export default function ImageUploader({ tourId }: ImageUploaderProps) {
  // TODO: Implement image upload preview and ordering
  
  const handleFileUpload = () => {
    // TODO: Implement actual file upload
    console.log("Upload images for tour:", tourId);
  };

  const handleRemoveImage = (imageId: string) => {
    // TODO: Implement image removal
    console.log("Remove image:", imageId);
  };

  const handleReorderImage = (imageId: string, newOrder: number) => {
    // TODO: Implement image reordering
    console.log("Reorder image:", imageId, "to position:", newOrder);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tour Images</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Button onClick={handleFileUpload} className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            Upload Images
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Recommended: Multiple high-quality images (1920x1080px or higher)
          </p>
        </div>

        {existingImages.length > 0 && (
          <div>
            <h4 className="font-medium mb-4">Current Images</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {existingImages.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-video rounded-lg border bg-muted overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveImage(image.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-2 left-2 bg-background/80 rounded px-2 py-1 text-xs">
                    Order: {image.order}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              TODO: Drag and drop to reorder images
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}