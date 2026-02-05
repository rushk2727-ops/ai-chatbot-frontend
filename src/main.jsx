import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

/* Global styles */
import "./index.css";

/* New production UI styles */
import "./styles/theme.css";
import "./styles/layout.css";
import "./styles/chat.css"; // (will be filled in next phases)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
