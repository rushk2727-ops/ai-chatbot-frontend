export default function MessageBubble({ message, dim = false, typing = false }) {
  return (
    <div className={`message-row ${message.role}`}>
      <div className="message-meta">
        {message.role === "user" ? "You" : (
          <span className="ai-label">
            <span className="ai-dot" />
            AI
          </span>
        )}
        {message.time ? ` · ${message.time}` : ""}
      </div>

      <div className={`message-bubble ${message.role}`}>
        {typing ? <span className="typing-dots">Thinking…</span> : message.text}
      </div>
    </div>
  );
}
