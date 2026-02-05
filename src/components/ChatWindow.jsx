// src/components/ChatWindow.jsx
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages, loading, endRef }) {
  if (loading && messages.length === 0) {
    return (
      <div className="chat-window">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="chat-skeleton-bubble" />
        ))}
      </div>
    );
  }

  return (
    <div className="chat-window">
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}

      {loading && (
        <MessageBubble
          message={{ role: "ai", text: "", time: "" }}
          dim
          typing
        />
      )}

      <div ref={endRef} />
    </div>
  );
}
