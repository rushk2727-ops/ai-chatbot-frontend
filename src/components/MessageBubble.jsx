export default function MessageBubble({ message, dim = false, typing = false }) {
  return (
    <div
      className={[
        "message",
        message.role,
        dim ? "message-dim" : "",
        typing ? "message-typing" : ""
      ].join(" ")}
    >
      {/* META: hide label when typing */}
      {!typing && (
        <div className="message-meta">
          {message.role === "user" ? "You" : "AI"}
          {message.time ? ` · ${message.time}` : ""}
        </div>
      )}

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
