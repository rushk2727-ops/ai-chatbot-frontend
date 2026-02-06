import { useEffect, useRef, useState } from "react";
import EmptyState from "./EmptyState";
import ChatWindow from "./ChatWindow";
import Composer from "./Composer";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const now = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

export default function ChatShell({
  conversationId,
  onToggleSidebar,
  onConversationUpdated
}) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState(false);

  const endRef = useRef(null);
  const thinkingTimerRef = useRef(null);

  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    async function loadMessages() {
      try {
        const res = await fetch(
          `${API_BASE}/conversations/${conversationId}/messages`
        );
        const data = await res.json();

        setMessages(
          data.map((m) => ({
            id: m._id,
            role: m.role,
            text: m.content,
            time: now()
          }))
        );
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    }

    loadMessages();
  }, [conversationId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  async function sendMessage(text) {
    if (!text.trim() || loading) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text, time: now() }
    ]);

    setLoading(true);
    setThinking(false);

    thinkingTimerRef.current = setTimeout(() => {
      setThinking(true);
    }, 600);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, conversationId })
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "ai",
          text: data.reply,
          time: now()
        }
      ]);

      onConversationUpdated?.();
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "ai",
          text: "⚠️ Failed to get response",
          time: now()
        }
      ]);
    } finally {
      clearTimeout(thinkingTimerRef.current);
      setThinking(false);
      setLoading(false);
    }
  }

  return (
    <div className="chat-shell">
      <div className="chat-header">
        <button className="mobile-menu-btn" onClick={onToggleSidebar}>
          ☰
        </button>
        <span className="chat-title">AI Assistant</span>
      </div>

      <div className="chat-body">
        {messages.length === 0 && !loading ? (
          <EmptyState onSelect={sendMessage} />
        ) : (
          <>
            <ChatWindow messages={messages} endRef={endRef} />

            {thinking && (
              <div className="ai-thinking">
                <div className="ai-thinking-label">AI</div>
                <div className="ai-thinking-text">Thinking…</div>
              </div>
            )}
          </>
        )}
      </div>

      <Composer onSend={sendMessage} disabled={loading} />
    </div>
  );
}
