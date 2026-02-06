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
  const endRef = useRef(null);

  /* ===============================
     LOAD MESSAGES ON CONVO CHANGE
  ================================ */
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

  /* ===============================
     AUTO SCROLL
  ================================ */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ===============================
     SEND MESSAGE (FIXED)
  ================================ */
  async function sendMessage(text) {
    if (!text.trim() || loading) return;

    const userId = crypto.randomUUID();
    const typingId = crypto.randomUUID();

    // 1️⃣ Add user message + AI typing placeholder
    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", text, time: now() },
      { id: typingId, role: "ai", text: "", typing: true }
    ]);

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, conversationId })
      });

      const data = await res.json();

      // 2️⃣ Replace typing bubble with real AI reply
      setMessages((prev) =>
        prev.map((m) =>
          m.id === typingId
            ? {
                ...m,
                text: data.reply,
                typing: false,
                time: now()
              }
            : m
        )
      );

      onConversationUpdated?.();
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === typingId
            ? {
                ...m,
                text: "⚠️ Failed to get response",
                typing: false,
                time: now()
              }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  }

  /* ===============================
     RENDER
  ================================ */
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
          <ChatWindow
            messages={messages}
            loading={loading}
            endRef={endRef}
          />
        )}
      </div>

      <Composer onSend={sendMessage} disabled={loading} />
    </div>
  );
}
