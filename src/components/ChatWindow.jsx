import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages, endRef }) {
  return (
    <div className="chat-window">
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}
      <div ref={endRef} />
    </div>
  );
}
