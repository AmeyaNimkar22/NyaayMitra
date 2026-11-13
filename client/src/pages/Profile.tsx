import { UserRound } from "lucide-react";
import ComingSoon from "@/components/ComingSoon";

export default function Profile() {
  return (
    <ComingSoon
      title="Profile"
      breadcrumb="Home / Profile"
      icon={UserRound}
      description="Your avatar, name, level, XP, streak, quiz accuracy, and learning interests — all in one place."
    />
  );
}
