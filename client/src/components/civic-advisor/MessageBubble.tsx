import type { AdvisorMessage } from "@/lib/civicAdvisorService";
import GuidanceResponse from "./GuidanceResponse";

export default function MessageBubble({ message }: { message: AdvisorMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] sm:max-w-xl flex flex-col items-end">
          <div className="inline-flex items-center gap-1.5 mb-1.5 text-xs text-muted-foreground font-medium pr-1">
            <span>You</span>
          </div>
          <div className="bg-secondary text-secondary-foreground border border-border rounded-2xl rounded-tr-sm px-5 py-3.5 shadow-sm text-[15px] leading-relaxed">
            {message.text}
          </div>
        </div>
      </div>
    );
  }

  if (message.guidance) {
    return <GuidanceResponse guidance={message.guidance} />;
  }

  return null;
}
