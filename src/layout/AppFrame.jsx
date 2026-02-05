// src/layout/AppFrame.jsx
export default function AppFrame({ children }) {
  return (
    <div className="app-background">
      <div className="app-frame">
        {children}
      </div>
    </div>
  );
}
