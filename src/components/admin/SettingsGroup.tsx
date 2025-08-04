import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface SettingsGroupProps {
  category: string;
}

interface Setting {
  key: string;
  value: string;
  type: "text" | "textarea" | "email" | "url";
  label: string;
}

// TODO: Replace with actual API data
const getPlaceholderSettings = (category: string): Setting[] => {
  switch (category) {
    case "contact":
      return [
        { key: "address", value: "123 Tourism Street, City, Country", type: "textarea", label: "Address" },
        { key: "phone", value: "+1 234 567 8900", type: "text", label: "Phone" },
        { key: "email", value: "info@tourismwebsite.com", type: "email", label: "Email" },
        { key: "whatsapp", value: "+1 234 567 8900", type: "text", label: "WhatsApp" },
      ];
    case "social":
      return [
        { key: "facebook", value: "https://facebook.com/tourismwebsite", type: "url", label: "Facebook URL" },
        { key: "instagram", value: "https://instagram.com/tourismwebsite", type: "url", label: "Instagram URL" },
        { key: "twitter", value: "https://twitter.com/tourismwebsite", type: "url", label: "Twitter URL" },
        { key: "youtube", value: "https://youtube.com/tourismwebsite", type: "url", label: "YouTube URL" },
      ];
    case "seo":
      return [
        { key: "meta_title", value: "Amazing Tourism Website - Discover Your Next Adventure", type: "text", label: "Meta Title" },
        { key: "meta_description", value: "Explore amazing destinations with our curated tours and travel experiences.", type: "textarea", label: "Meta Description" },
      ];
    case "general":
      return [
        { key: "site_name", value: "Tourism Website", type: "text", label: "Site Name" },
        { key: "theme_color", value: "#3B82F6", type: "text", label: "Theme Color" },
      ];
    default:
      return [];
  }
};

const getCategoryTitle = (category: string): string => {
  switch (category) {
    case "contact":
      return "Contact Information";
    case "social":
      return "Social Media";
    case "seo":
      return "SEO Settings";
    case "general":
      return "General Settings";
    default:
      return category;
  }
};

export default function SettingsGroup({ category }: SettingsGroupProps) {
  const settings = getPlaceholderSettings(category);
  const title = getCategoryTitle(category);

  const handleSave = () => {
    // TODO: Wire updateSiteSettings API stub
    console.log(`Saving ${category} settings`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          {settings.map((setting) => (
            <div key={setting.key} className="grid gap-2">
              <Label htmlFor={setting.key} className="text-sm font-medium">
                {setting.label}
              </Label>
              {setting.type === "textarea" ? (
                <Textarea
                  id={setting.key}
                  defaultValue={setting.value}
                  placeholder={`Enter ${setting.label.toLowerCase()}`}
                  className="min-h-[80px]"
                />
              ) : (
                <Input
                  id={setting.key}
                  type={setting.type}
                  defaultValue={setting.value}
                  placeholder={`Enter ${setting.label.toLowerCase()}`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave} className="w-full sm:w-auto">
            Save {title}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}