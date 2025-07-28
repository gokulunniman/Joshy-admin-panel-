import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InquiriesTable from "./InquiriesTable";

export default function InquiryTabs() {
  const [activeTab, setActiveTab] = useState("contact");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="contact">Contact Inquiries</TabsTrigger>
        <TabsTrigger value="tour">Tour Inquiries</TabsTrigger>
        <TabsTrigger value="homepage">Homepage Inquiries</TabsTrigger>
      </TabsList>

      <TabsContent value="contact" className="mt-6">
        <InquiriesTable inquiryType="contact" />
      </TabsContent>

      <TabsContent value="tour" className="mt-6">
        <InquiriesTable inquiryType="tour" />
      </TabsContent>

      <TabsContent value="homepage" className="mt-6">
        <InquiriesTable inquiryType="homepage" />
      </TabsContent>
    </Tabs>
  );
}