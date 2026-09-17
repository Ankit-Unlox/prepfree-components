"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { ArrowUp, Check, FilePlus2, Sparkles, X } from "lucide-react";
import type { ApplyResume } from "@/types/job";

export type { ApplyResume } from "@/types/job";

type ApplyModalProps = {
  open: boolean;
  onClose: () => void;
  resumes?: ApplyResume[];
  onApply?: (resume: ApplyResume | File) => void;
};

export function ApplyModal({
  open,
  onClose,
  resumes = [],
  onApply,
}: ApplyModalProps) {
  const [selectedResumeId, setSelectedResumeId] = useState(
    resumes[0]?.id ?? "",
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  useEffect(() => {
    setSelectedResumeId(resumes[0]?.id ?? "");
    setUploadedFile(null);
  }, [resumes, open]);

  if (!open) return null;

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setUploadedFile(event.target.files?.[0] ?? null);
  };

  const handleApply = () => {
    const selectedResume = resumes.find(
      (resume) => resume.id === selectedResumeId,
    );
    if (uploadedFile) onApply?.(uploadedFile);
    else if (selectedResume) onApply?.(selectedResume);
  };

  const canApply = Boolean(uploadedFile || selectedResumeId);
  const hasResumes = resumes.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-title"
        className={`relative flex ${hasResumes ? "h-[70vh] max-h-[863px]" : "h-[50vh] max-h-[863px]"} w-[35vw] max-w-[856px] flex-col overflow-hidden rounded-md border border-white/10 bg-[#101212] text-white shadow-2xl`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-3">
          <h2 id="apply-title" className="text-[12px] font-medium">
            Apply to Unlox
          </h2>
          <button
            type="button"
            aria-label="Close application dialog"
            onClick={onClose}
            className="text-white/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aaa9]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex h-full flex-col px-3 py-4">
          <p className="text-[16px] text-white">Resume</p>
          <p className="mt-1 text-[12px] text-white/45">
            Select or upload your resume to continue
          </p>

          {hasResumes ? (
            <div className="mt-3 flex h-full flex-col gap-2">
              <div className="space-y-2">
                {resumes.map((resume) => {
                  const selected =
                    selectedResumeId === resume.id && !uploadedFile;
                  return (
                    <button
                      key={resume.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        setSelectedResumeId(resume.id);
                        setUploadedFile(null);
                      }}
                      className={`flex w-full items-center justify-between rounded-md border px-2 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aaa9] ${selected ? "border-[#72d8d5] bg-[#073737]" : "border-transparent bg-[#202121] hover:border-white/20"}`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#f1e9e9] text-[7px] font-bold text-[#ef5252]">
                          PDF
                        </span>
                        <span>
                          <span className="block text-[14px] text-white">
                            {resume.name}
                          </span>
                          <span className="mt-0.5 block text-[14px] text-white/45">
                            {resume.size} · Last used on {resume.updatedAt}
                          </span>
                        </span>
                      </span>
                      <span
                        className={`flex h-3 w-3 items-center justify-center rounded-full border ${selected ? "border-[#72d8d5] bg-[#72d8d5] text-[#073737]" : "border-white/50"}`}
                      >
                        {selected && <Check className="h-2 w-2" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="min-h-0 flex-1">
                <UploadArea onChange={handleUpload} compact />
              </div>
            </div>
          ) : (
            <div className="mt-3 grid h-full flex-1 grid-cols-2 gap-3">
              <div className="h-full min-h-0">
                <UploadArea onChange={handleUpload} />
              </div>
              <div className="h-full min-h-0">
                <Link
                  href="/resume/form"
                  onClick={onClose}
                  className="flex h-full min-h-[160px] w-full flex-col items-center justify-center rounded-md border border-dashed border-white/15 bg-[#202121] text-center transition-colors hover:border-[#72d8d5] hover:bg-[#073737]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#168b8b] text-[#72d8d5]">
                    <FilePlus2 className="h-4 w-4" />
                  </span>
                  <span className="mt-3 text-[9px] text-[#72d8d5]">
                    Create New Resume
                  </span>
                  <span className="mt-1 text-[7px] text-white/40">
                    Create Resume with AI Resume Builder
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-white/10 bg-[#191b1b] px-3 py-3">
          {hasResumes && <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-2 text-[12px] font-bold text-white/80 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aaa9]"
          >
            <Sparkles className="h-3 w-3 text-[#f1c84b]" /> Tailored your Resume
          </button>}
          <button
            type="button"
            disabled={!canApply}
            onClick={handleApply}
            className="rounded-md bg-[#008f8f] px-4 py-2 text-[12px] font-bold text-white transition-colors hover:bg-[#00aaa9] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aaa9]"
          >
            Apply
          </button>
        </div>
      </section>
    </div>
  );
}

function UploadArea({
  onChange,
  compact = false,
}: {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  compact?: boolean;
}) {
  return (
    <label
      className={`flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-white/15 bg-[#202121] text-center transition-colors hover:border-[#72d8d5] hover:bg-[#073737] ${compact ? "min-h-0" : "min-h-0"}`}
    >
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        className="sr-only"
        onChange={onChange}
      />
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#075b5c] text-[#72d8d5]">
        <ArrowUp className="h-4 w-4" />
      </span>
      <span className="mt-3 text-[14px] text-[#72d8d5]">
        {compact ? "Upload new file" : "Upload new files"}
      </span>
      <span className="mt-1 text-[10px] text-white/40">
        Drop files here or click to upload.
      </span>
    </label>
  );
}
