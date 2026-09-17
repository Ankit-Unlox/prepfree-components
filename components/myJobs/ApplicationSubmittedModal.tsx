"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle2, FileText, X } from "lucide-react";

type ApplicationSubmittedModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ApplicationSubmittedModal({
  open,
  onClose,
}: ApplicationSubmittedModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-submitted-title"
        className="flex relative h-auto max-h-[498px] w-auto max-w-[582px] flex-col overflow-hidden rounded-md border border-on-primary/10 bg-primary text-on-primary shadow-2xl"
      >
        <div className="flex-1 w-full flex items-center justify-center overflow-y-auto px-4 pb-8 pt-4">
          <div className="relative mx-auto flex max-w-[360px] flex-col items-center text-center">
            <CheckCircle2 className="mx-auto h-11 w-11 rounded-full bg-[#1d7779] p-2 text-[#9ce9e1]" />
            <h2
              id="application-submitted-title"
              className="mt-5 text-[16px] font-medium text-[#73d8d5]"
            >
              Application Submitted Successfully!
            </h2>
            <p className="mt-2 text-[10px] text-white/45">
              Track your application in your dashboard anytime.
            </p>

            <div className="mt-5 flex w-full items-center gap-3 rounded-md border border-[#857a43] bg-[#302b12] p-3 text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#28282a] text-[#d3d3d3] shadow-inner">
                <FileText className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-[10px] font-medium text-white">
                  Practice Mock Interview &amp; Get Ready
                </h3>
                <p className="mt-1 text-[8px] leading-3 text-white/45">
                  Boost your chances of getting hired with interview prep
                  tailored to this job description.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-white/10 bg-[#191b1b] px-4 py-4">
          <Link
            href="/"
            onClick={onClose}
            className="rounded-md border border-white/10 px-5 py-2.5 text-[12px] text-white transition-colors hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aaa9]"
          >
            Go to Home
          </Link>
          <Link
            href="/mock-interview"
            onClick={onClose}
            className="rounded-md bg-[#008f8f] px-4 py-2.5 text-[12px] font-bold text-white transition-colors hover:bg-[#00aaa9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aaa9]"
          >
            Practice Mock Interview
          </Link>
        </div>
        <button
          type="button"
          aria-label="Close application submitted dialog"
          onClick={onClose}
          className="absolute right-5 top-5 z-50 text-on-primary"
        >
          <X className="h-5 w-5" />
        </button>
      </section>
    </div>
  );
}
