"use client";

import { ArrowRight, FilePenLine, Linkedin, Upload, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ResumeCreationPopupProps {
  open: boolean;
  onClose: (value: boolean) => void;
  onBuildFromScratch?: () => void;
  onUploadResume?: () => void;
  onConnectLinkedIn?: () => void;
}

export function ResumeCreationPopup({
  open,
  onClose,
  onConnectLinkedIn,
}: ResumeCreationPopupProps) {
  const router = useRouter();

  const onBuildFromScratch = () => {
    router.push("/resume/form");
    onClose(false);
  };
  const onUploadResume = () => {
    onClose(false);
  };
  const connectLinkedIn = () => {
    onClose(false);
    if (onConnectLinkedIn) {
      onConnectLinkedIn();
      return;
    }

    router.push("/resume/connectlinkedin");
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/75 p-4 backdrop-blur-sm sm:p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose(false);
        }
      }}
    >
      <section
        aria-labelledby="resume-creation-title"
        aria-modal="true"
        role="dialog"
        className="
      flex
      max-h-[88vh]
      w-[92vw]
      min-w-0
      flex-col
      overflow-y-auto
      rounded-2xl
      border
      border-white/10
      bg-[#1b1d1d]
      text-white
      shadow-2xl
      md:min-h-[48.33vh]
      md:w-[63.15vw]
    "
        style={{ padding: "clamp(20px, 2.08vw, 40px)" }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-4">
          <div className="min-w-0">
            <h2
              id="resume-creation-title"
              className="font-creato text-[clamp(18px,1.67vw,24px)] font-bold leading-tight"
            >
              Create Your Resume
            </h2>

            <p className="font-creato text-[clamp(12px,1.1vw,16px)] font-normal leading-relaxed text-white/45">
              Choose how you want to get started
            </p>
          </div>

          <button
            type="button"
            aria-label="Close resume creation popup"
            className="
          shrink-0
          rounded
          p-1
          cursor-pointer
        "
            onClick={() => onClose(false)}
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Cards */}
        <div
          className="
        mt-6
        grid
        gap-4
        sm:mt-7
        gap-[clamp(10px,1.1vw,16px)]
      "
          style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
        >
          <ResumeCreationCard
            icon={FilePenLine}
            title="Build from Scratch"
            description="Fill a guided form step-by-step"
            buttonText="Start Building"
            onClick={onBuildFromScratch}
          />

          <ResumeCreationCard
            icon={Upload}
            title="Upload Your Resume"
            description="Enhance your existing resume with AI"
            buttonText="Upload File"
            onClick={onUploadResume}
          />

          <ResumeCreationCard
            icon={Linkedin}
            title="Create with LinkedIn"
            description="Import your LinkedIn Profile"
            buttonText="Connect LinkedIn"
            onClick={connectLinkedIn}
          />
        </div>
      </section>
    </div>
  );
}

interface ResumeCreationCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

export function ResumeCreationCard({
  icon: Icon,
  title,
  description,
  buttonText,
  onClick,
}: ResumeCreationCardProps) {
  return (
    <div
      className="
        flex
        min-w-0
        flex-col
        items-center
        rounded-lg
        border
        border-white/8
        text-center
      "
      style={{
        aspectRatio: "364 / 318",
        padding: "clamp(20px, 2.08vw, 40px)",
      }}
    >
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <div
          className="
            flex
            shrink-0
            items-center
            justify-center
            rounded-full
          "
          style={{
            width: "clamp(56px, 3.54vw, 68px)",
            height: "clamp(56px, 3.54vw, 68px)",
            backgroundColor: "rgb(13 119 117 / 35%)",
            color: "#69d6ce",
          }}
        >
          {Icon ? (
            <Icon
              className="h-[clamp(30px,2.8vw,40px)] w-[clamp(30px,2.8vw,40px)]"
              strokeWidth={1.5}
            />
          ) : null}
        </div>

        <h3
          className="
            mt-4
            font-creato
            text-[clamp(14px,1.25vw,18px)]
            font-bold
            leading-6
            text-white/90
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1
            font-creato
            text-[clamp(12px,1.1vw,16px)]
            font-normal
            leading-5
            text-white/40
          "
        >
          {description}
        </p>
      </div>

      <button
        type="button"
        className="
          mt-5
          flex
          w-full
          shrink-0
          items-center
          justify-center
          gap-2
          rounded-lg
          border
          border-white/10
          font-creato
          text-[clamp(12px,1.1vw,16px)]
          font-medium
          leading-[21.69px]
          cursor-pointer
          text-white/85
          transition-colors
          hover:border-[#50c9c2]/60
          hover:bg-[#50c9c2]/10
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#50c9c2]
        "
        onClick={onClick}
        style={{
          height: "clamp(44px, 2.5vw, 48px)",
        }}
      >
        {buttonText}

        <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}