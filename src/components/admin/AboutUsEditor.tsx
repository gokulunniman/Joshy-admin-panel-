import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, Eye, RotateCcw } from "lucide-react";
import RichTextEditor from "./RichTextEditor";

interface AboutUsEditorProps {
  sectionId?: string;
}

interface AboutUsContent {
  title: string;
  subtitle: string;
  content: string;
  features: string[];
  isActive: boolean;
}

export default function AboutUsEditor({ sectionId }: AboutUsEditorProps) {
  // TODO: Fetch about us content from homepage_content table via Supabase
  // TODO: Implement real-time preview functionality
  // TODO: Add image upload integration for about us section images
  // TODO: Wire to updateHomepageAboutUs API with RLS policies

  const [content, setContent] = useState<AboutUsContent>({
    title: "About Our Travel Company",
    subtitle: "Creating Unforgettable Journey Experiences",
    content: `<p>We are passionate travel experts dedicated to creating extraordinary experiences for our clients. With over a decade of experience in the travel industry, we specialize in crafting personalized itineraries that showcase the best of India and beyond.</p>

<p>Our team of experienced travel consultants work closely with you to understand your preferences and create journeys that exceed your expectations. From the serene backwaters of Kerala to the majestic peaks of the Himalayas, we help you discover the world's most incredible destinations.</p>

<p>Whether you're seeking adventure, relaxation, cultural immersion, or spiritual enlightenment, we have the expertise and local connections to make your travel dreams a reality.</p>`,
    features: [
      "Expert Local Guides",
      "24/7 Customer Support", 
      "Customized Itineraries",
      "Best Price Guarantee",
      "Sustainable Tourism"
    ],
    isActive: true
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleSave = () => {
    // TODO: Submit to updateHomepageAboutUs API
    console.log("Save about us content:", content);
    setHasUnsavedChanges(false);
  };

  const handleReset = () => {
    // TODO: Fetch original content from API
    console.log("Reset about us content to last saved version");
    setHasUnsavedChanges(false);
  };

  const handleContentChange = (field: keyof AboutUsContent, value: any) => {
    setContent(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...content.features];
    newFeatures[index] = value;
    handleContentChange('features', newFeatures);
  };

  const handleAddFeature = () => {
    const newFeatures = [...content.features, ""];
    handleContentChange('features', newFeatures);
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = content.features.filter((_, i) => i !== index);
    handleContentChange('features', newFeatures);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              About Us Section Editor
              {hasUnsavedChanges && (
                <Badge variant="destructive" className="text-xs">
                  Unsaved Changes
                </Badge>
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage the About Us section content displayed on the homepage
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {previewMode ? 'Edit' : 'Preview'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!previewMode ? (
          <>
            {/* Title and Subtitle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="about-title">Section Title</Label>
                <Input
                  id="about-title"
                  value={content.title}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                  placeholder="Enter section title..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="about-subtitle">Subtitle</Label>
                <Input
                  id="about-subtitle"
                  value={content.subtitle}
                  onChange={(e) => handleContentChange('subtitle', e.target.value)}
                  placeholder="Enter subtitle..."
                />
              </div>
            </div>

            {/* Rich Text Content */}
            <div className="space-y-2">
              <Label>Main Content</Label>
              <RichTextEditor
                value={content.content}
                onChange={(value) => handleContentChange('content', value)}
                placeholder="Write about your company, mission, and services..."
              />
            </div>

            {/* Company Features */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Company Features/Highlights</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddFeature}
                  disabled={content.features.length >= 8}
                >
                  Add Feature
                </Button>
              </div>
              
              <div className="space-y-3">
                {content.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder={`Feature ${index + 1}...`}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveFeature(index)}
                      disabled={content.features.length <= 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground">
                Maximum 8 features. These will be displayed as bullet points or icons on the homepage.
              </p>
            </div>
          </>
        ) : (
          /* Preview Mode */
          <div className="space-y-6 p-6 border rounded-lg bg-muted/20">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">{content.title}</h2>
              <p className="text-lg text-muted-foreground">{content.subtitle}</p>
            </div>
            
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-background rounded border">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasUnsavedChanges}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Changes
          </Button>
          
          <Button onClick={handleSave} disabled={!hasUnsavedChanges}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-md">
          <strong>TODO:</strong> Wire to getHomepageAboutUs and updateHomepageAboutUs APIs with Supabase RLS policies
        </div>
      </CardContent>
    </Card>
  );
}