// src/components/ErrorBoundary.jsx
import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            background: "var(--background)",
            color: "var(--text-primary)",
            padding: "24px",
            textAlign: "center"
          }}
        >
          <h2>Something went wrong</h2>
          <p style={{ opacity: 0.7, maxWidth: 420 }}>
            The application encountered an unexpected error.
            Please refresh the page. If the problem persists,
            contact support.
          </p>

          <button
            style={{
              marginTop: 16,
              padding: "10px 16px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--surface)",
              cursor: "pointer"
            }}
            onClick={() => window.location.reload()}
          >
            Reload app
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
