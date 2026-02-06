export default function MessageBubble({ message }) {
  return (
    <div className={`message-row ${message.role}`}>
      <div className="message-meta">
        {message.role === "user" ? "You" : "AI"}
        {message.time ? ` · ${message.time}` : ""}
      </div>

      <div className={`message-bubble ${message.role}`}>
        {message.text}
      </div>
    </div>
  );
}
