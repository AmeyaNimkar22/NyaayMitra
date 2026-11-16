import { useEffect, useRef, useState } from "react";
import { useSearch } from "wouter";
import AppLayout from "@/components/layout/AppLayout";
import PreviousChatsSidebar from "@/components/civic-advisor/PreviousChatsSidebar";
import AdvisorIntro from "@/components/civic-advisor/AdvisorIntro";
import MessageBubble from "@/components/civic-advisor/MessageBubble";
import SuggestionChips from "@/components/civic-advisor/SuggestionChips";
import TypingIndicator from "@/components/civic-advisor/TypingIndicator";
import SituationInput from "@/components/civic-advisor/SituationInput";
import { useAuth } from "@/contexts/AuthContext";
import {
  AdvisorRequestError,
  askCivicAdvisor,
  errorGuidance,
  topicToQuestion,
  type AdvisorGuidance,
  type AdvisorMessage,
} from "@/lib/civicAdvisorService";
import {
  appendMessage,
  createChat,
  deleteChat,
  hasPending,
  isPending,
  loadActiveChatId,
  loadChats,
  markPending,
  saveActiveChatId,
  subscribe,
  type AdvisorChat,
} from "@/lib/advisorChatStore";

function makeId() {
  return Math.random().toString(36).slice(2);
}

export default function Advisor() {
  const search = useSearch();
  const { user } = useAuth();
  const userKey = user?.email ?? "guest";

  const [chats, setChats] = useState<AdvisorChat[]>(() => loadChats(userKey));
  const [activeChatId, setActiveChatIdState] = useState<string>(() => {
    const saved = loadActiveChatId(userKey);
    return loadChats(userKey).some((c) => c.id === saved) ? saved : "";
  });
  const [, setPendingTick] = useState(0);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const hasHandledTopic = useRef(false);

  // Stay in sync with storage (answers can arrive after navigating away and back).
  useEffect(() => {
    setChats(loadChats(userKey));
    return subscribe(() => {
      setChats(loadChats(userKey));
      setPendingTick((t) => t + 1);
    });
  }, [userKey]);

  const activeChat = chats.find((c) => c.id === activeChatId);
  const messages: AdvisorMessage[] = activeChat?.messages ?? [];
  const isTyping = activeChatId ? isPending(activeChatId) : false;
  const anyPending = hasPending();

  function setActiveChatId(id: string) {
    setActiveChatIdState(id);
    saveActiveChatId(userKey, id);
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, isTyping, activeChatId]);

  async function handleSend(question?: string, options: { newChat?: boolean } = {}) {
    const text = (question ?? input).trim();
    if (!text || hasPending()) return;

    const userMessage: AdvisorMessage = { id: makeId(), role: "user", text };
    let chatId = options.newChat ? "" : activeChatId;
    if (chatId && loadChats(userKey).some((c) => c.id === chatId)) {
      appendMessage(userKey, chatId, userMessage);
    } else {
      chatId = createChat(userKey, userMessage).id;
      setActiveChatId(chatId);
    }

    setInput("");
    markPending(chatId, true);

    let guidance: AdvisorGuidance;
    try {
      guidance = await askCivicAdvisor(text);
    } catch (err) {
      const message =
        err instanceof AdvisorRequestError
          ? err.message
          : "Something went wrong while contacting the Legal Advisor. Please try again.";
      guidance = errorGuidance(message);
    }

    // Saved to the chat the question belongs to, even if the user switched chats
    // or left the page while waiting.
    appendMessage(userKey, chatId, { id: makeId(), role: "advisor", guidance });
    markPending(chatId, false);
  }

  // If the user arrived from a Home page topic chip (e.g. /advisor?topic=police-fir),
  // start a new chat with that question so the topic feels "selected", not just prefilled.
  useEffect(() => {
    if (hasHandledTopic.current) return;
    hasHandledTopic.current = true;
    const params = new URLSearchParams(search);
    const topic = params.get("topic");
    if (topic && topicToQuestion[topic]) {
      handleSend(topicToQuestion[topic], { newChat: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function handleNewConversation() {
    setActiveChatId("");
    setInput("");
  }

  function handleDeleteChat(id: string) {
    deleteChat(userKey, id);
    if (id === activeChatId) setActiveChatId("");
  }

  const lastMessageIsAdvisor = messages.length > 0 && messages[messages.length - 1].role === "advisor";

  return (
    <AppLayout title="Legal Advisor" breadcrumb="Home / Legal Advisor">
      <div className="flex items-start gap-8">
        <PreviousChatsSidebar
          chats={chats}
          activeId={activeChatId}
          onSelect={setActiveChatId}
          onNewConversation={handleNewConversation}
          onDelete={handleDeleteChat}
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

          <SituationInput value={input} onChange={setInput} onSend={() => handleSend()} disabled={anyPending} />
        </main>
      </div>
    </AppLayout>
  );
}
