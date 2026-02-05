// src/components/Sidebar.jsx
import { useState } from "react";
import "./../styles/sidebar.css";
import { BrandSparkIcon } from "./icons";
import {
  PlusIcon,
  HomeIcon,
  DiscoverIcon,
  HistoryIcon,
  SettingsIcon,
  SunIcon,
  MoonIcon
} from "./icons";

export default function Sidebar({
  chats = [],
  activeChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  theme,
  toggleTheme
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);

  const isLoading = chats.length === 0;

  function openDeleteDialog(chatId) {
    setChatToDelete(chatId);
    setShowConfirm(true);
  }

  function closeDeleteDialog() {
    setShowConfirm(false);
    setChatToDelete(null);
  }

  function confirmDelete() {
    if (chatToDelete) onDeleteChat(chatToDelete);
    closeDeleteDialog();
  }

  return (
    <>
      <aside className="sidebar">
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="brand-icon">
            <BrandSparkIcon className="brand-icon-svg" />
          </div>
          <span className="brand-text">AI Assistant</span>
        </div>

        {/* New Chat */}
        <button className="new-chat-btn" onClick={onNewChat}>
          <PlusIcon className="icon-svg" />
          <span>New chat</span>
        </button>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-item active">
            <HomeIcon className="icon-svg" />
            <span>Home</span>
          </div>
          <div className="nav-item">
            <DiscoverIcon className="icon-svg" />
            <span>Discover</span>
          </div>
          <div className="nav-item">
            <HistoryIcon className="icon-svg" />
            <span>History</span>
          </div>
        </nav>

        {/* Recent Chats */}
        <div className="sidebar-section">
          <div className="section-title">Recent conversations</div>

          <div className="chat-list">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="chat-skeleton" />
                ))
              : chats.map((chat) => (
                  <div
                    key={chat._id}
                    className={`chat-item ${
                      chat._id === activeChatId ? "active" : ""
                    }`}
                    onClick={() => onSelectChat(chat._id)}
                  >
                    <div className="chat-meta">
                      <span className="chat-title">
                        {chat.title || "Untitled chat"}
                      </span>
                      <span className="chat-time">
                        {new Date(chat.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <button
                      className="chat-delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteDialog(chat._id);
                      }}
                    >
                      <SettingsIcon className="icon-svg" />
                    </button>
                  </div>
                ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <button className="settings-btn">
            <SettingsIcon className="icon-svg" />
            <span>Settings</span>
          </button>

          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? (
              <MoonIcon className="theme-icon-svg" />
            ) : (
              <SunIcon className="theme-icon-svg" />
            )}
          </button>
        </div>
      </aside>

      {/* Delete Confirmation */}
      {showConfirm && (
        <div className="sidebar-confirm-overlay">
          <div className="sidebar-confirm-modal">
            <button
              className="sidebar-confirm-close"
              onClick={closeDeleteDialog}
            >
              ×
            </button>
            <h3>Delete conversation</h3>
            <p>This action cannot be undone.</p>
            <div className="sidebar-confirm-actions">
              <button
                className="sidebar-confirm-btn cancel"
                onClick={closeDeleteDialog}
              >
                Cancel
              </button>
              <button
                className="sidebar-confirm-btn danger"
                onClick={confirmDelete}
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
