import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, GripVertical, X, Star } from "lucide-react";
import { useState } from "react";

interface SlideshowManagerProps {
  tourId: string;
}

interface SlideImage {
  id: string;
  url: string;
  alt: string;
  order: number;
  isPrimary: boolean;
}

export default function SlideshowManager({ tourId }: SlideshowManagerProps) {
  // TODO: Wire to TourImage API for bannerImages array management
  // TODO: Implement actual drag-and-drop functionality with DnD library
  // TODO: Add image upload integration with Supabase Storage
  // TODO: Add image compression and optimization
  
  const [slides, setSlides] = useState<SlideImage[]>([
    { id: "1", url: "/api/placeholder/400/300", alt: "Tour banner 1", order: 1, isPrimary: true },
    { id: "2", url: "/api/placeholder/400/300", alt: "Tour banner 2", order: 2, isPrimary: false },
    { id: "3", url: "/api/placeholder/400/300", alt: "Tour banner 3", order: 3, isPrimary: false },
  ]);

  const handleFileUpload = () => {
    // TODO: Implement file upload with validation (max 10 images, size limits)
    console.log("Upload new slideshow image for tour", tourId);
  };

  const handleRemoveImage = (imageId: string) => {
    // TODO: Remove from API and storage
    console.log("Remove slideshow image", imageId, "for tour", tourId);
  };

  const handleSetPrimary = (imageId: string) => {
    // TODO: Update primary image in API
    console.log("Set primary image", imageId, "for tour", tourId);
  };

  const handleReorder = (imageId: string, newOrder: number) => {
    // TODO: Update image order in API
    console.log("Reorder image", imageId, "to position", newOrder, "for tour", tourId);
  };

  const canAddMore = slides.length < 10;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Tour Slideshow Images</span>
          <Badge variant="secondary">{slides.length}/10 Images</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage banner images for tour detail page slideshow. Maximum 10 images.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Button */}
        {canAddMore && (
          <Button onClick={handleFileUpload} className="w-full" variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload New Image
          </Button>
        )}

        {/* Current Images */}
        <div className="space-y-4">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="flex items-center gap-4 p-4 border rounded-lg bg-card"
            >
              {/* Drag Handle */}
              <div className="cursor-grab active:cursor-grabbing">
                <GripVertical className="h-5 w-5 text-muted-foreground" />
              </div>

              {/* Order Number */}
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>

              {/* Image Preview */}
              <div className="flex-shrink-0">
                <img
                  src={slide.url}
                  alt={slide.alt}
                  className="w-16 h-12 object-cover rounded border"
                />
              </div>

              {/* Image Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{slide.alt}</p>
                  {slide.isPrimary && (
                    <Badge variant="default" className="text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      Primary
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Image ID: {slide.id}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {!slide.isPrimary && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetPrimary(slide.id)}
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveImage(slide.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Drag and Drop Instructions */}
        <div className="text-center p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg">
          <GripVertical className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            TODO: Implement drag-and-drop reordering with DnD library
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Use drag handles to reorder slideshow images (max 10 images enforced)
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            TODO: Add validation for image size limits and format restrictions
          </p>
        </div>
      </CardContent>
    </Card>
  );
}