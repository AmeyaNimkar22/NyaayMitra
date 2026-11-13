import { BookOpen } from "lucide-react";
import ComingSoon from "@/components/ComingSoon";

export default function Learn() {
  return (
    <ComingSoon
      title="Learn"
      breadcrumb="Home / Learn"
      icon={BookOpen}
      description="Structured lessons on consumer rights, cyber safety, employment, and more — building your civic knowledge topic by topic."
    />
  );
}
