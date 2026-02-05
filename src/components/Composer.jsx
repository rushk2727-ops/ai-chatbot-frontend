// src/components/Composer.jsx
import { useEffect, useRef, useState } from "react";
import { PlusIcon, SendIcon } from "./icons";

export default function Composer({ onSend, disabled }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  function submit() {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  }

  useEffect(() => {
    function onKeyDown(e) {
      const isMac = navigator.platform.toUpperCase().includes("MAC");

      if (
        (isMac ? e.metaKey : e.ctrlKey) &&
        e.key.toLowerCase() === "k"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (e.key === "Escape") {
        setValue("");
        inputRef.current?.blur();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="composer-wrapper">
      <div className="composer">
        {/* Tool button */}
        <button className="composer-tool" type="button">
          <PlusIcon className="icon-svg" />
        </button>

        {/* Input */}
        <input
          ref={inputRef}
          className="composer-input"
          placeholder="Type a message…"
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />

        {/* Send button */}
        <button
          className="composer-send"
          disabled={!value.trim() || disabled}
          onClick={submit}
          type="button"
          aria-label="Send message"
        >
          <SendIcon className="icon-svg" />
        </button>
      </div>
    </div>
  );
}
