/**
 * LEGAL ADVISOR CHAT HISTORY (device-local)
 * -----------------------------------------
 * Saves each Legal Advisor conversation in localStorage so chats survive page
 * navigation and reloads ("Inquiries are saved privately on your device").
 *
 * - Chats are stored per logged-in user (keyed by email) so two mock accounts
 *   on the same browser don't see each other's chats.
 * - Writes go straight to storage, so an answer that arrives after the user has
 *   navigated to another page is still saved into the right chat.
 * - Components subscribe to changes to stay in sync across remounts.
 */
import type { AdvisorMessage } from "@/lib/civicAdvisorService";

export interface AdvisorChat {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: AdvisorMessage[];
}

const PREFIX = "nyaaymitra_advisor_chats";
const MAX_CHATS = 50;
const TITLE_MAX = 48;

const listeners = new Set<() => void>();
const pendingChats = new Set<string>();

function chatsKey(userKey: string) {
  return `${PREFIX}:${userKey || "guest"}`;
}
function activeKey(userKey: string) {
  return `${PREFIX}:${userKey || "guest"}:active`;
}

function notify() {
  listeners.forEach((fn) => fn());
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function makeChatId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function loadChats(userKey: string): AdvisorChat[] {
  try {
    const raw = localStorage.getItem(chatsKey(userKey));
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return (parsed as AdvisorChat[])
      .filter((c) => c && typeof c.id === "string" && Array.isArray(c.messages))
      .sort((a, b) => b.updatedAt - a.updatedAt);
  } catch {
    return [];
  }
}

function saveChats(userKey: string, chats: AdvisorChat[]) {
  try {
    const trimmed = [...chats].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, MAX_CHATS);
    localStorage.setItem(chatsKey(userKey), JSON.stringify(trimmed));
  } catch {
    /* storage full or unavailable — keep working in memory */
  }
  notify();
}

export function loadActiveChatId(userKey: string): string {
  try {
    return localStorage.getItem(activeKey(userKey)) ?? "";
  } catch {
    return "";
  }
}

export function saveActiveChatId(userKey: string, chatId: string) {
  try {
    if (chatId) localStorage.setItem(activeKey(userKey), chatId);
    else localStorage.removeItem(activeKey(userKey));
  } catch {
    /* ignore */
  }
}

/** Title from the first question: first ~48 characters, cut at a word boundary. */
export function makeChatTitle(question: string): string {
  const clean = question.replace(/\s+/g, " ").trim();
  if (clean.length <= TITLE_MAX) return clean || "New conversation";
  const cut = clean.slice(0, TITLE_MAX);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 20 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:!?-]+$/, "")}…`;
}

/** Create a chat whose first message is the user's question. */
export function createChat(userKey: string, firstMessage: AdvisorMessage): AdvisorChat {
  const now = Date.now();
  const chat: AdvisorChat = {
    id: makeChatId(),
    title: makeChatTitle(firstMessage.text ?? ""),
    createdAt: now,
    updatedAt: now,
    messages: [firstMessage],
  };
  saveChats(userKey, [chat, ...loadChats(userKey)]);
  return chat;
}

/** Append a message to a chat (reads fresh from storage, so it's safe after navigation). */
export function appendMessage(userKey: string, chatId: string, message: AdvisorMessage) {
  const chats = loadChats(userKey);
  const chat = chats.find((c) => c.id === chatId);
  if (!chat) return; // chat was deleted meanwhile
  chat.messages = [...chat.messages, message];
  chat.updatedAt = Date.now();
  saveChats(userKey, chats);
}

export function deleteChat(userKey: string, chatId: string) {
  saveChats(
    userKey,
    loadChats(userKey).filter((c) => c.id !== chatId),
  );
}

// ---- in-flight requests (survive the Advisor page unmounting) ----

export function markPending(chatId: string, pending: boolean) {
  if (pending) pendingChats.add(chatId);
  else pendingChats.delete(chatId);
  notify();
}

export function isPending(chatId: string): boolean {
  return pendingChats.has(chatId);
}

export function hasPending(): boolean {
  return pendingChats.size > 0;
}

/** "Just now", "5 min ago", "3 h ago", "Yesterday", "12 Nov". */
export function formatChatTime(timestamp: number, now: number = Date.now()): string {
  const diffMin = Math.floor((now - timestamp) / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  const then = new Date(timestamp);
  const today = new Date(now);
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  if (timestamp >= startOfToday) return `${Math.floor(diffMin / 60)} h ago`;
  if (timestamp >= startOfToday - 86_400_000) return "Yesterday";
  return then.toLocaleDateString(undefined, { day: "numeric", month: "short" });
}
