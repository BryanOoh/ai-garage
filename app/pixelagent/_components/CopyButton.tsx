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
    state === "copied" ? "Copied to clipboard" : state === "error" ? "Copy failed" : `Copy ${label}`;

  const display =
    state === "copied" ? "copied!" : state === "error" ? "failed" : label;

  return (
    <button
      type="button"
      className="cb-copy"
      onClick={handleCopy}
      disabled={state === "copied"}
      aria-label={buttonLabel}
      title={buttonLabel}
    >
      {display}
    </button>
  );
}
