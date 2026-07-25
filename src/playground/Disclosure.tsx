import { useState } from "react";

export default function Disclosure() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="answer"
        id="question"
      >
        {open ? "▼" : "▶"} What is React?
      </button>

      {open && (
        <div
          id="answer"
          role="region"
          aria-labelledby="question"
          style={{ marginTop: "10px" }}
        >
          React is a JavaScript library for building user interfaces.
        </div>
      )}
    </div>
  );
}