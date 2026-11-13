import { Settings as SettingsIcon } from "lucide-react";
import ComingSoon from "@/components/ComingSoon";

export default function Settings() {
  return (
    <ComingSoon
      title="Settings"
      breadcrumb="Home / Settings"
      icon={SettingsIcon}
      description="Account preferences, notification settings, and privacy controls."
    />
  );
}
