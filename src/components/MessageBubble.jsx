// src/components/MessageBubble.jsx

export default function MessageBubble({ message, dim = false, typing = false }) {
  const isAI = message.role === "ai";

  return (
    <div
      className={[
        "message-row",
        message.role,
        dim ? "message-dim" : "",
        typing ? "message-typing" : ""
      ].join(" ")}
    >
      {/* AI label (small & subtle) */}
      {isAI && (
        <div className="ai-indicator">
          AI
        </div>
      )}

      {/* Message bubble */}
      <div
        className={[
          "message-bubble",
          message.role
        ].join(" ")}
      >
        {typing ? <span className="icon icon-typing" /> : message.text}
      </div>
    </div>
  );
}
