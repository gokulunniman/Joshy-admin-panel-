import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HomepageContentEditorProps {
  sectionId?: string;
}

export default function HomepageContentEditor({ sectionId }: HomepageContentEditorProps) {
  const navigate = useNavigate();
  
  // TODO: Preload data when editing
  const [formData, setFormData] = useState({
    section: sectionId ? "hero" : "",
    title: "",
    subtitle: "",
    content: "",
    image_url: "",
    cta_text: "",
    cta_link: "",
    sort_order: 1,
    is_active: true
  });

  // TODO: Wire form submit to updateHomepageContent API
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit form:", formData);
    navigate("/admin/homepage");
  };

  const handleCancel = () => {
    navigate("/admin/homepage");
  };

  // TODO: Implement image upload functionality
  const handleImageUpload = () => {
    console.log("Image upload clicked");
  };

  return (
    <Card className="bg-white shadow-sm max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          {sectionId ? "Edit" : "Create"} Homepage Section
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Input
                id="section"
                value={formData.section}
                onChange={(e) => setFormData(prev => ({ ...prev, section: e.target.value }))}
                placeholder="e.g., hero, features, testimonials"
                readOnly={!!sectionId}
                className={sectionId ? "bg-gray-50" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input
                id="sort_order"
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) }))}
                min="1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Section title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
              placeholder="Section subtitle (optional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Section content"
              rows={4}
              className="resize-none"
            />
            {/* TODO: Replace with rich-text editor */}
          </div>

          <div className="space-y-2">
            <Label>Image Upload</Label>
            <div className="flex items-center space-x-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={handleImageUpload}
                className="flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Image</span>
              </Button>
              {/* TODO: Implement actual image upload and preview */}
              <span className="text-sm text-gray-500">No image selected</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="cta_text">CTA Text</Label>
              <Input
                id="cta_text"
                value={formData.cta_text}
                onChange={(e) => setFormData(prev => ({ ...prev, cta_text: e.target.value }))}
                placeholder="Button text (optional)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta_link">CTA Link</Label>
              <Input
                id="cta_link"
                value={formData.cta_link}
                onChange={(e) => setFormData(prev => ({ ...prev, cta_link: e.target.value }))}
                placeholder="Button link (optional)"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
            />
            <Label htmlFor="is_active">Active</Label>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Save Section
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}