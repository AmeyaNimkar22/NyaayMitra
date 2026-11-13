import { useEffect, useRef, useState } from "react";
import { useSearch } from "wouter";
import AppLayout from "@/components/layout/AppLayout";
import PreviousChatsSidebar from "@/components/civic-advisor/PreviousChatsSidebar";
import AdvisorIntro from "@/components/civic-advisor/AdvisorIntro";
import MessageBubble from "@/components/civic-advisor/MessageBubble";
import SuggestionChips from "@/components/civic-advisor/SuggestionChips";
import TypingIndicator from "@/components/civic-advisor/TypingIndicator";
import SituationInput from "@/components/civic-advisor/SituationInput";
import { askCivicAdvisor, topicToQuestion, type AdvisorMessage } from "@/lib/civicAdvisorService";

function makeId() {
  return Math.random().toString(36).slice(2);
}

export default function Advisor() {
  const search = useSearch();
  const [messages, setMessages] = useState<AdvisorMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeChatId, setActiveChatId] = useState("1");
  const bottomRef = useRef<HTMLDivElement>(null);
  const hasHandledTopic = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  async function handleSend(question?: string) {
    const text = (question ?? input).trim();
    if (!text) return;

    setMessages((prev) => [...prev, { id: makeId(), role: "user", text }]);
    setInput("");
    setIsTyping(true);

    const guidance = await askCivicAdvisor(text);

    setIsTyping(false);
    setMessages((prev) => [...prev, { id: makeId(), role: "advisor", guidance }]);
  }

  // If the user arrived from a Home page topic chip (e.g. /advisor?topic=police-fir),
  // kick off that question automatically so the topic feels "selected", not just prefilled.
  useEffect(() => {
    if (hasHandledTopic.current) return;
    hasHandledTopic.current = true;
    const params = new URLSearchParams(search);
    const topic = params.get("topic");
    if (topic && topicToQuestion[topic]) {
      handleSend(topicToQuestion[topic]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function handleNewConversation() {
    setMessages([]);
    setInput("");
    setActiveChatId("");
  }

  const lastMessageIsAdvisor = messages.length > 0 && messages[messages.length - 1].role === "advisor";

  return (
    <AppLayout title="Legal Advisor" breadcrumb="Home / Legal Advisor">
      <div className="flex items-start gap-8">
        <PreviousChatsSidebar
          activeId={activeChatId}
          onSelect={setActiveChatId}
          onNewConversation={handleNewConversation}
        />

        <main className="flex-1 w-full max-w-3xl mx-auto">
          {messages.length === 0 && <AdvisorIntro onPick={(text) => setInput(text)} />}

          <div className="space-y-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
          </div>

          {lastMessageIsAdvisor && !isTyping && <SuggestionChips onPick={(text) => setInput(text)} />}

          <div ref={bottomRef} />

          <SituationInput value={input} onChange={setInput} onSend={() => handleSend()} disabled={isTyping} />
        </main>
      </div>
    </AppLayout>
  );
}
