// src/components/icons/LayersIcon.jsx
export default function LayersIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 22 8 12 14 2 8 12 2" />
      <polyline points="2 12 12 18 22 12" />
      <polyline points="2 16 12 22 22 16" />
    </svg>
  );
}
