"use client";

import { useState } from "react";

interface CopyButtonProps {
  text: string;
  label?: string;
}

async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(textarea);
  if (!ok) throw new Error("execCommand copy failed");
}

export default function CopyButton({ text, label = "copy" }: CopyButtonProps) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  const handleCopy = async () => {
    try {
      await copyToClipboard(text);
      setState("copied");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 2500);
    }
  };

  const buttonLabel =
    state === "copied"
      ? "Copied to clipboard"
      : state === "error"
        ? "Copy failed"
        : label === "copy"
          ? "Copy to clipboard"
          : `Copy ${label}`;

  const display =
    state === "copied"
      ? "Copied"
      : state === "error"
        ? "Failed"
        : label === "copy"
          ? "Copy"
          : `Copy`;

  return (
    <button
      type="button"
      className="cb-copy"
      onClick={handleCopy}
      disabled={state === "copied"}
      data-state={state}
      aria-label={buttonLabel}
      title={buttonLabel}
    >
      {state === "idle" && (
        <svg
          className="cb-copy-ic"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"
          />
        </svg>
      )}
      {state !== "idle" && (
        <span className="cb-copy-meta" aria-hidden="true">
          {display}
        </span>
      )}
    </button>
  );
}
