import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, Plus, X, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

interface ContactInfoEditorProps {
  sectionId?: string;
}

interface ContactInfo {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  socialMediaLinks: SocialLink[];
  officeLocations: OfficeLocation[];
  businessHours: string;
  emergencyContact: string;
}

interface SocialLink {
  platform: string;
  url: string;
  isActive: boolean;
}

interface OfficeLocation {
  name: string;
  address: string;
  phone: string;
  coordinates?: string;
}

export default function ContactInfoEditor({ sectionId }: ContactInfoEditorProps) {
  // TODO: Fetch contact info from site_settings table via Supabase
  // TODO: Wire to updateContactInfo API with proper validation
  // TODO: Add Google Maps integration for office locations
  // TODO: Implement social media link validation

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    companyName: "Amazing Tours & Travels",
    address: "123 Tourism Street, Travel District, New Delhi, India 110001",
    phone: "+91 98765 43210",
    email: "info@amazingtours.com",
    whatsapp: "+91 98765 43210",
    socialMediaLinks: [
      { platform: "Facebook", url: "https://facebook.com/amazingtours", isActive: true },
      { platform: "Instagram", url: "https://instagram.com/amazingtours", isActive: true },
      { platform: "Twitter", url: "https://twitter.com/amazingtours", isActive: true },
      { platform: "YouTube", url: "https://youtube.com/amazingtours", isActive: false }
    ],
    officeLocations: [
      {
        name: "Head Office",
        address: "123 Tourism Street, Travel District, New Delhi, India 110001",
        phone: "+91 98765 43210",
        coordinates: "28.6139,77.2090"
      },
      {
        name: "Kerala Branch",
        address: "456 Backwater Lane, Alleppey, Kerala, India 688001",
        phone: "+91 98765 43211",
        coordinates: "9.4908,76.3388"
      }
    ],
    businessHours: "Monday - Saturday: 9:00 AM - 7:00 PM\nSunday: 10:00 AM - 5:00 PM",
    emergencyContact: "+91 98765 43299"
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleSave = () => {
    // TODO: Submit to updateContactInfo API
    console.log("Save contact info:", contactInfo);
    setHasUnsavedChanges(false);
  };

  const handleInfoChange = (field: keyof ContactInfo, value: any) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: any) => {
    const newLinks = [...contactInfo.socialMediaLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    handleInfoChange('socialMediaLinks', newLinks);
  };

  const handleAddSocialLink = () => {
    const newLinks = [...contactInfo.socialMediaLinks, { platform: "", url: "", isActive: true }];
    handleInfoChange('socialMediaLinks', newLinks);
  };

  const handleRemoveSocialLink = (index: number) => {
    const newLinks = contactInfo.socialMediaLinks.filter((_, i) => i !== index);
    handleInfoChange('socialMediaLinks', newLinks);
  };

  const handleOfficeLocationChange = (index: number, field: keyof OfficeLocation, value: string) => {
    const newLocations = [...contactInfo.officeLocations];
    newLocations[index] = { ...newLocations[index], [field]: value };
    handleInfoChange('officeLocations', newLocations);
  };

  const handleAddOfficeLocation = () => {
    const newLocations = [...contactInfo.officeLocations, { name: "", address: "", phone: "" }];
    handleInfoChange('officeLocations', newLocations);
  };

  const handleRemoveOfficeLocation = (index: number) => {
    const newLocations = contactInfo.officeLocations.filter((_, i) => i !== index);
    handleInfoChange('officeLocations', newLocations);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              Contact Information Editor
              {hasUnsavedChanges && (
                <Badge variant="destructive" className="text-xs">
                  Unsaved Changes
                </Badge>
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage company contact details, social media links, and office locations
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Basic Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Basic Contact Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                value={contactInfo.companyName}
                onChange={(e) => handleInfoChange('companyName', e.target.value)}
                placeholder="Enter company name..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={contactInfo.email}
                onChange={(e) => handleInfoChange('email', e.target.value)}
                placeholder="contact@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={contactInfo.phone}
                onChange={(e) => handleInfoChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input
                id="whatsapp"
                value={contactInfo.whatsapp}
                onChange={(e) => handleInfoChange('whatsapp', e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Main Address</Label>
            <Textarea
              id="address"
              value={contactInfo.address}
              onChange={(e) => handleInfoChange('address', e.target.value)}
              placeholder="Enter complete address..."
              className="min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="business-hours">Business Hours</Label>
              <Textarea
                id="business-hours"
                value={contactInfo.businessHours}
                onChange={(e) => handleInfoChange('businessHours', e.target.value)}
                placeholder="Enter business hours..."
                className="min-h-[80px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emergency-contact">Emergency Contact</Label>
              <Input
                id="emergency-contact"
                value={contactInfo.emergencyContact}
                onChange={(e) => handleInfoChange('emergencyContact', e.target.value)}
                placeholder="+91 98765 43299"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Social Media Links
            </h3>
            <Button variant="outline" size="sm" onClick={handleAddSocialLink}>
              <Plus className="h-4 w-4 mr-2" />
              Add Platform
            </Button>
          </div>
          
          <div className="space-y-3">
            {contactInfo.socialMediaLinks.map((link, index) => (
              <div key={index} className="flex gap-2 items-center p-3 border rounded-lg">
                <Input
                  value={link.platform}
                  onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                  placeholder="Platform name (e.g., Facebook)"
                  className="w-40"
                />
                <Input
                  value={link.url}
                  onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                  placeholder="https://..."
                  className="flex-1"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={link.isActive}
                    onChange={(e) => handleSocialLinkChange(index, 'isActive', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Active</span>
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveSocialLink(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Office Locations */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Office Locations
            </h3>
            <Button variant="outline" size="sm" onClick={handleAddOfficeLocation}>
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </div>
          
          <div className="space-y-4">
            {contactInfo.officeLocations.map((location, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Office {index + 1}</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveOfficeLocation(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    value={location.name}
                    onChange={(e) => handleOfficeLocationChange(index, 'name', e.target.value)}
                    placeholder="Office name (e.g., Head Office)"
                  />
                  <Input
                    value={location.phone}
                    onChange={(e) => handleOfficeLocationChange(index, 'phone', e.target.value)}
                    placeholder="Phone number"
                  />
                </div>
                
                <Textarea
                  value={location.address}
                  onChange={(e) => handleOfficeLocationChange(index, 'address', e.target.value)}
                  placeholder="Complete address..."
                  className="min-h-[60px]"
                />
                
                <Input
                  value={location.coordinates || ""}
                  onChange={(e) => handleOfficeLocationChange(index, 'coordinates', e.target.value)}
                  placeholder="Coordinates (lat,lng) - Optional for Google Maps"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t">
          <Button onClick={handleSave} disabled={!hasUnsavedChanges}>
            <Save className="h-4 w-4 mr-2" />
            Save Contact Information
          </Button>
        </div>

        <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-md">
          <strong>TODO:</strong> Wire to getContactInfo and updateContactInfo APIs with Supabase integration and validation
        </div>
      </CardContent>
    </Card>
  );
}