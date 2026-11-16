import { useEffect, useState } from "react";
import { History, Lock, MessageSquare, Plus, Search, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatChatTime, type AdvisorChat } from "@/lib/advisorChatStore";

interface PreviousChatsSidebarProps {
  chats: AdvisorChat[];
  activeId: string;
  onSelect: (id: string) => void;
  onNewConversation: () => void;
  onDelete: (id: string) => void;
}

export default function PreviousChatsSidebar({
  chats,
  activeId,
  onSelect,
  onNewConversation,
  onDelete,
}: PreviousChatsSidebarProps) {
  const [search, setSearch] = useState("");
  const [, setNow] = useState(Date.now());

  // Refresh the relative times ("5 min ago") once a minute.
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const query = search.trim().toLowerCase();
  const filtered = query
    ? chats.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.messages.some((m) => m.role === "user" && m.text?.toLowerCase().includes(query)),
      )
    : chats;

  return (
    <aside className="w-72 shrink-0 hidden md:flex flex-col bg-card border border-border rounded-2xl p-4 shadow-sm sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
      <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <History size={18} className="text-secondary-foreground" />
          <h2 className="text-sm font-semibold text-foreground">Previous chats</h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-primary font-bold">
            {chats.length}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onNewConversation}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-3 mb-3.5 rounded-xl bg-background border border-border hover:border-primary/60 hover:bg-secondary/40 text-foreground text-sm font-semibold transition-all shadow-sm"
      >
        <Plus size={16} className="text-primary" />
        <span>New conversation</span>
      </button>

      <div className="relative mb-3.5">
        <Search size={15} className="absolute left-3 top-2.5 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search previous chats..."
          className="w-full pl-8 pr-3 py-1.5 bg-background border border-border rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
        />
      </div>

      <div className="space-y-1.5 flex-1">
        {chats.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-6 px-2 leading-relaxed">
            No chats yet. Your questions and answers will be saved here.
          </p>
        )}
        {chats.length > 0 && filtered.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-6">No chats match your search.</p>
        )}

        {filtered.map((chat) => {
          const isActive = chat.id === activeId;
          return (
            <div
              key={chat.id}
              className={cn(
                "group w-full flex items-start gap-1 rounded-xl border transition-all",
                isActive
                  ? "bg-secondary/50 border-primary/30 text-foreground"
                  : "hover:bg-background border-transparent hover:border-border text-foreground",
              )}
            >
              <button
                type="button"
                onClick={() => onSelect(chat.id)}
                title={chat.title}
                className="flex-1 min-w-0 text-left flex items-start gap-2.5 p-2.5"
              >
                {isActive ? (
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                ) : (
                  <MessageSquare size={16} className="text-secondary-foreground mt-1 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{chat.title}</p>
                  <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-muted-foreground">
                    <span>{formatChatTime(chat.updatedAt)}</span>
                    {isActive && (
                      <>
                        <span>•</span>
                        <span className="text-primary font-medium">Active</span>
                      </>
                    )}
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Delete the chat "${chat.title}"?`)) onDelete(chat.id);
                }}
                aria-label={`Delete chat ${chat.title}`}
                className="p-2 mt-1.5 mr-1 rounded-lg text-muted-foreground opacity-0 group-hover:opacity-100 focus:opacity-100 hover:text-destructive hover:bg-muted transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="pt-3 mt-3 border-t border-border/60 flex items-center gap-2 text-[11px] text-muted-foreground leading-tight">
        <Lock size={12} className="shrink-0" />
        <span>Inquiries are saved privately on your device.</span>
      </div>
    </aside>
  );
}
