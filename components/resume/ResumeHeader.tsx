import { Download, Home, Link, Pencil, Save, Share2, Sparkles } from "lucide-react";
import Tooltip from "@/components/resume/edit-resume/tooltip";

type ResumeHeaderProps = {
  isEditing?: boolean;
  isAiEnhanceOpen?: boolean;
  onOpenEdit?: () => void;
  onOpenAi?: () => void;
  onSaveChanges?: () => void;
  onDownload?: () => void;
  mode?: "editor" | "minimal";
};

export function ResumeHeader({
  isEditing = false,
  isAiEnhanceOpen = false,
  onOpenEdit,
  onOpenAi,
  onSaveChanges,
  onDownload,
  mode = "editor",
}: ResumeHeaderProps) {
  if (mode === "minimal") {
    return (
      <header className="fixed inset-x-0 top-0 z-50 flex min-h-14 items-center border bg-[#111212] px-3 py-2">
        <span className="cursor-pointer rounded-md border bg-primary px-2 py-1 text-lg font-medium text-on-primary">
          Untitled Resume
        </span>
      </header>
    );
  }

  const isSidebarOpen = isEditing || isAiEnhanceOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex w-full min-h-14 items-center justify-between gap-4 border bg-[#111212] px-3 py-2">
      <div className="flex min-w-0 items-center gap-3">
        <span className="cursor-pointer rounded-md border bg-primary px-2 py-1 text-lg font-medium text-on-primary">
          Untitled Resume
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {isAiEnhanceOpen ? (
          <button
            type="button"
            onClick={onOpenEdit}
            className="flex items-center gap-1.5 rounded-md border bg-primary px-2 py-1 text-lg font-medium text-on-primary"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
        ) : !isSidebarOpen ? (
          <button
            type="button"
            onClick={onOpenEdit}
            className="flex items-center gap-1.5 rounded-md border bg-primary px-2 py-1 text-lg font-medium text-on-primary"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
        ) : null}

        <Tooltip
          title="Share Resume"
          primaryAction={{
            label: "Generate Link",
            icon: Link,
            onClick: () => console.log("Tooltip Primary"),
          }}
          secondaryAction={{
            label: "Back to Home",
            icon: Home,
            onClick: () => console.log("Tooltip Secondry"),
          }}
          trigger={
            !isSidebarOpen && (
              <button
                type="button"
                aria-label="Share resume"
                title="Share resume"
                className="flex items-center gap-1.5 rounded-md border bg-primary px-2 py-1 text-lg font-medium text-on-primary"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>
            )
          }
        />

        {!isAiEnhanceOpen && (
          <button
            type="button"
            onClick={onOpenAi}
            className="hidden items-center gap-1.5 rounded-md border bg-[#087f7d] px-2 py-1 text-lg font-medium text-white hover:bg-[#0b9290] sm:flex"
          >
            <Sparkles className="h-3.5 w-3.5" /> AI Enhance
          </button>
        )}

        {isSidebarOpen && (
          <button
            type="button"
            onClick={onSaveChanges}
            className="flex items-center gap-1.5 rounded-md border bg-primary px-2 py-1 text-lg font-medium text-on-primary"
          >
            <Save className="h-3.5 w-3.5" /> Save Changes
          </button>
        )}

        <Tooltip
          title="Download Resume"
          primaryAction={{
            label: "Download PDF",
            icon: Download,
            onClick: onDownload ?? (() => undefined),
          }}
          secondaryAction={{
            label: "Back to Home",
            icon: Home,
            onClick: () => window.location.assign("/"),
          }}
          trigger={
            !isSidebarOpen && (
              <button
                type="button"
                aria-label="Download resume"
                title="Download resume"
                className="flex items-center gap-1.5 rounded-md border bg-primary px-2 py-1 text-lg font-medium text-on-primary"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Download</span>
              </button>
            )
          }
        />
      </div>
    </header>
  );
}

export default ResumeHeader;