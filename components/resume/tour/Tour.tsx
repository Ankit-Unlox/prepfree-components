"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

type TourStep = {
  image: string;
  title: string;
  description: string;
};

type TourProps = {
  open?: boolean;
  onComplete?: () => void;
  onSkip?: () => void;
};

const steps: TourStep[] = [
  {
    image: "/tour1.png",
    title: "Answer Simple questions to get your perfect Resume",
    description: "Build a polished resume with a few quick answers.",
  },
  {
    image: "/tour2.png",
    title: "Edit your resume exactly the way you want",
    description:
      "Change your template, colors, font, and sections in one place.",
  },
  {
    image: "/tour3.png",
    title: "Make your resume stand out with AI",
    description: "Enhance your writing and get your resume ready to share.",
  },
];

export function Tour({ open = true, onComplete, onSkip }: TourProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onSkip?.();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onSkip, open]);

  if (!open) return null;

  const handleNext = () => {
    if (isLastStep) {
      onComplete?.();
      return;
    }
    setStepIndex((currentStep) => currentStep + 1);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 p-4 backdrop-blur-[3px] sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-tour-title"
        className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-161.5 flex-col overflow-hidden rounded-lg border border-white/20 bg-[#0d0f0f] text-white shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:max-h-[calc(100vh-3rem)]"
      >
        <button
          type="button"
          aria-label="Close tour"
          onClick={onSkip}
          className="absolute right-3 top-3 z-10 rounded-md p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="border-b border-white/10 bg-black">
          <img
            src={step.image}
            alt="Resume editor tour"
            className="block h-auto max-h-[42vh] w-full object-cover object-top"
          />
        </div>

        <div className="flex min-h-44.5 flex-col justify-between px-5 py-6 sm:min-h-45 sm:px-8 sm:py-6">
          <div className="text-center">
            <h1
              id="resume-tour-title"
              className="text-lg font-semibold leading-tight tracking-[-0.01em] sm:text-xl"
            >
              {step.title}
            </h1>
            <p className="mx-auto mt-2 max-w-md text-sm leading-5 text-white/55">
              {step.description}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
            <button
              type="button"
              onClick={onSkip}
              className="row-start-2 justify-self-start rounded-md px-1 py-2 text-xs text-white/75 transition-colors hover:text-white focus-visible:outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-white/70 sm:row-auto"
            >
              Skip Tour
            </button>

            <div
              className="col-span-2 row-start-1 flex items-center gap-1.5 justify-self-center sm:col-span-1 sm:row-auto"
              aria-label={`Step ${stepIndex + 1} of ${steps.length}`}
            >
              {steps.map((tourStep, index) => (
                <span
                  key={tourStep.image}
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    index === stepIndex ? "bg-white/90" : "bg-white/15"
                  }`}
                />
              ))}
            </div>

            <div className="row-start-2 flex min-w-0 justify-self-end gap-2 sm:row-auto">
              <button
                type="button"
                disabled={stepIndex === 0}
                onClick={() => setStepIndex((currentStep) => currentStep - 1)}
                className="flex shrink-0 items-center gap-1.5 rounded-md bg-white/10 px-3 py-2 text-xs font-medium text-white/90 transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:px-4"
              >
                Back
              </button>
              <button
                type="button"
                disabled={isLastStep}
                onClick={handleNext}
                className=" flex h-9 shrink-0 items-center justify-center rounded-md bg-[#008b89] px-3 py-2 text-xs font-semibold text-white max-w-[75px] transition-colors hover:bg-[#00a19e] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[#008b89] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5de1dc]
  "
              >
                <span className="whitespace-nowrap">
                  Next ({stepIndex + 1}/{steps.length})
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tour;
