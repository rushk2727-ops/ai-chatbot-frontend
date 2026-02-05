// src/components/EmptyState.jsx
import {
  CompassIcon,
  DocumentIcon,
  LayersIcon,
  CodeIcon
} from "./icons";

const SUGGESTIONS = [
  {
    title: "Plan a trip",
    description: "Create a travel plan with itinerary and budget",
    Icon: CompassIcon
  },
  {
    title: "Summarize news",
    description: "Get a concise summary of today’s tech news",
    Icon: DocumentIcon
  },
  {
    title: "Design a SaaS app",
    description: "Help with features, UX, and architecture",
    Icon: LayersIcon
  },
  {
    title: "Explain code",
    description: "Understand what a piece of code does",
    Icon: CodeIcon
  }
];

export default function EmptyState({ onSelect }) {
  return (
    <div className="empty-state">
      <div className="empty-header">
        <h1>Welcome</h1>
        <p>How can I help you today?</p>
      </div>

      <div className="suggestion-grid">
        {SUGGESTIONS.map(({ title, description, Icon }) => (
          <button
            key={title}
            className="suggestion-card"
            onClick={() => onSelect(title)}
            type="button"
          >
            <div className="suggestion-icon">
              <Icon className="suggestion-icon-svg" />
            </div>

            <div className="suggestion-content">
              <div className="suggestion-title">{title}</div>
              <div className="suggestion-desc">{description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
