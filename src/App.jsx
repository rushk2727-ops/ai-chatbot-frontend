// src/App.jsx
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatShell from "./components/ChatShell";
import AppFrame from "./layout/AppFrame";


const API_BASE = import.meta.env.VITE_API_BASE_URL;

/* ===============================
   THEME INITIALIZATION
================================ */

function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) return saved;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/* ===============================
   APP
================================ */

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [chatKey, setChatKey] = useState(0);


  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  async function loadConversations() {
    try {
      const res = await fetch(`${API_BASE}/conversations`);
      const data = await res.json();
      setConversations(data);
    } catch (err) {
      console.error("Failed to load conversations", err);
    }
  }

  useEffect(() => {
    loadConversations();
  }, []);

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  function toggleSidebar() {
    setSidebarOpen((v) => !v);
  }

  function handleNewChat() {
  setActiveConversationId(null);
  setChatKey((k) => k + 1); // 👈 force ChatShell reset
  setSidebarOpen(false);
}

  function handleSelectConversation(id) {
    setActiveConversationId(id);
    setSidebarOpen(false);
  }

  async function handleDeleteConversation(id) {
    try {
      await fetch(`${API_BASE}/conversations/${id}`, {
        method: "DELETE"
      });

      setConversations((prev) =>
        prev.filter((c) => c._id !== id)
      );

      if (id === activeConversationId) {
        setActiveConversationId(null);
      }
    } catch (err) {
      console.error("Failed to delete conversation", err);
    }
  }

  return (
    <AppFrame>
      <Sidebar
        chats={conversations}
        activeChatId={activeConversationId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectConversation}
        onDeleteChat={handleDeleteConversation}
        theme={theme}
        toggleTheme={toggleTheme}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <ChatShell
  key={chatKey}
  conversationId={activeConversationId}
  onToggleSidebar={toggleSidebar}
  onConversationUpdated={loadConversations}
/>

    </AppFrame>
  );
}
