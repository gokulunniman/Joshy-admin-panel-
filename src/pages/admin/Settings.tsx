import AdminLayout from "@/components/admin/AdminLayout";
import SettingsGroup from "@/components/admin/SettingsGroup";

export default function Settings() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
          <p className="text-gray-600 mt-2">Manage your website configuration and settings</p>
        </div>

        <div className="space-y-8">
          <SettingsGroup category="contact" />
          <SettingsGroup category="social" />
          <SettingsGroup category="seo" />
          <SettingsGroup category="general" />
        </div>
      </div>
    </AdminLayout>
  );
}