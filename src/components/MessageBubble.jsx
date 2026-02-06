export default function MessageBubble({ message, dim = false, typing = false }) {
  const isAI = message.role === "ai";

  return (
    <div
      className={[
        "message",
        message.role,
        dim ? "message-dim" : "",
        typing ? "message-typing" : ""
      ].join(" ")}
    >
      {/* META */}
      <div className="message-meta">
        {isAI ? "AI" : "You"}
        {!typing && message.time ? ` · ${message.time}` : ""}
      </div>

      {/* CONTENT */}
      <div className="message-content">
        {typing ? (
          <span className="icon icon-typing" />
        ) : (
          message.text
        )}
      </div>
    </div>
  );
}
