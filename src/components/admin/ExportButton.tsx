import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ExportButtonProps {
  entity: 'tours' | 'contact-submissions' | 'tour-inquiries' | 'homepage-inquiries';
}

const getEntityDisplayName = (entity: string): string => {
  switch (entity) {
    case 'tours':
      return 'Tours';
    case 'contact-submissions':
      return 'Contact Submissions';
    case 'tour-inquiries':
      return 'Tour Inquiries';
    case 'homepage-inquiries':
      return 'Homepage Inquiries';
    default:
      return entity;
  }
};

export default function ExportButton({ entity }: ExportButtonProps) {
  const displayName = getEntityDisplayName(entity);

  const handleExport = () => {
    // TODO: Implement CSV export via export{Entity} API stub
    console.log(`Exporting ${entity} data to CSV`);
  };

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      size="sm"
      aria-label={`Export ${displayName.toLowerCase()} data`}
      className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <Download className="h-4 w-4 mr-2" />
      Export {displayName}
    </Button>
  );
}