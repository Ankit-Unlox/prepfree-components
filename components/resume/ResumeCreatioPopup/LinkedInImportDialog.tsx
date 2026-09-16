"use client";

import { Clipboard } from "lucide-react";
import { useEffect, useState } from "react";

interface LinkedInImportDialogProps {
  open: boolean;
  onClose: () => void;
  onImport: (profileUrl: string) => void;
}

function isLinkedInUrl(value: string) {
  try {
    const url = new URL(value.trim());
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");

    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      hostname === "linkedin.com" &&
      url.pathname.toLowerCase().startsWith("/in/")
    );
  } catch {
    return false;
  }
}

export function LinkedInImportDialog({
  open,
  onClose,
  onImport,
}: LinkedInImportDialogProps) {
  const [profileUrl, setProfileUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setProfileUrl("");
      setError("");
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedUrl = profileUrl.trim();

    if (!isLinkedInUrl(normalizedUrl)) {
      setError("Enter a valid LinkedIn profile URL.");
      return;
    }

    onImport(normalizedUrl);
  };

  const handlePaste = async () => {
    try {
      const pastedText = await navigator.clipboard.readText();
      setProfileUrl(pastedText);
      setError("");
    } catch {
      setError("Unable to access your clipboard.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      style={{ zIndex: 9999 }}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        aria-labelledby="linkedin-import-title"
        aria-modal="true"
        className="min-w-0 rounded-2xl border border-white/10 bg-[#1b1d1d] text-white shadow-2xl"
        role="dialog"
        style={{
          boxSizing: "border-box",
          width: "min(90vw, 340px)",
          maxWidth: "calc(100vw - 32px)",
          padding: "24px",
        }}
      >
        <div className="flex items-start">
          <h2
            id="linkedin-import-title"
            className="whitespace-nowrap font-creato text-sm font-medium leading-tight"
          >
            Paste a link to your LinkedIn Profile
          </h2>
        </div>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="relative w-full">
            <input
              type="url"
              value={profileUrl}
              onChange={(event) => {
                setProfileUrl(event.target.value);
                setError("");
              }}
              placeholder="https://www.linkedin.com/in/your-profile"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "linkedin-url-error" : undefined}
              className="box-border h-10 w-full rounded-md border border-white/10 bg-transparent px-3 pr-10 font-creato text-xs text-white outline-none placeholder:text-white/40 focus:border-[#50c9c2]/70"
            />
            <button
              type="button"
              aria-label="Paste LinkedIn profile URL"
              className="absolute z-10 flex h-6 w-6 items-center justify-center cursor-pointer rounded p-1 text-white/80 hover:text-white"
              onClick={handlePaste}
              style={{
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <Clipboard className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          {error && (
            <p id="linkedin-url-error" className="mt-2 text-xs text-red-300">
              {error}
            </p>
          )}

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              className="h-8 rounded-md border border-white/10 px-4 font-creato text-xs cursor-pointer text-white/80 hover:border-white/30"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-8 rounded-md px-4 font-creato text-xs cursor-pointer text-white hover:bg-[#007575]"
              style={{ backgroundColor: "#006666" }}
            >
              Import
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
