// src/components/MessageBubble.jsx

export default function MessageBubble({ message, dim = false, typing = false }) {
  return (
    <div className={`message-row ${message.role}`}>
      <div className="message-meta">
        {message.role === "user" ? (
          "You"
        ) : (
          <span className="ai-indicator">
            <span className="ai-dot" />
            AI
          </span>
        )}
        {message.time ? ` · ${message.time}` : ""}
      </div>

      <div
        className={[
          "message-bubble",
          message.role,
          dim ? "message-dim" : "",
          typing ? "message-typing" : ""
        ].join(" ")}
      >
        {typing ? <span className="icon icon-typing" /> : message.text}
      </div>
    </div>
  );
}
