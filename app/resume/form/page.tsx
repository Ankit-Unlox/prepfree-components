"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import resumeLogo from "@/assets/prepfree-aiResume.svg";
import { ResumeForm, type ResumeFormData } from "@/components/resume/form";

function ResumeGenerationLoading({ onComplete }: { onComplete: () => void }) {
  const steps = [
    "Analyzing your information...",
    "Optimizing content for ATS...",
    "Crafting professional summary...",
    "Formatting your resume...",
    "Finalizing design...",
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    let navigationTimer: number | undefined;
    const timer = window.setTimeout(() => {
      if (activeStep === steps.length - 1) {
        setCompletedSteps(steps.length);
        navigationTimer = window.setTimeout(onComplete, 400);
        return;
      }

      setCompletedSteps((currentCount) => currentCount + 1);
      setActiveStep((currentStep) => currentStep + 1);
    }, 1000);

    return () => {
      window.clearTimeout(timer);
      if (navigationTimer !== undefined) {
        window.clearTimeout(navigationTimer);
      }
    };
  }, [activeStep, onComplete, steps.length]);

  const progress = (completedSteps / steps.length) * 100;

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 font-creato text-white">
      <section className="w-full max-w-96">
        <div className="resume-loader-logo mx-auto mb-7 flex h-36 w-36 items-center justify-center rounded-full bg-[#006666]">
          <div className="resume-loader-ripple resume-loader-ripple-one" />
          <div className="resume-loader-ripple resume-loader-ripple-two" />
          <div className="resume-loader-ripple resume-loader-ripple-three" />
          <Image src={resumeLogo} alt="PrepFree" className="relative h-24 w-24" priority />
        </div>

        <h1 className="text-center text-lg font-medium">Tailoring Your Resume</h1>
        <p className="mt-1 text-center text-[10px] text-white/45">
          {steps[activeStep]}
        </p>

        <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-[#79c6c3] transition-[width] duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-1 text-center text-[8px] text-white/45">
          {Math.round(progress)}% Complete
        </p>

        <div className="mt-5 space-y-3">
          {steps.map((label, index) => {
            const isComplete = index < completedSteps;
            const isActive = index === activeStep && !isComplete;

            return (
              <div
                key={label}
                className={`flex items-center gap-2 text-[10px] transition-colors duration-500 ${isActive || isComplete ? "text-white/65" : "text-white/20"}`}
              >
                <span
                  className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-full border ${isComplete ? "border-[#65c4c0] text-[#65c4c0]" : isActive ? "animate-spin border-[#65c4c0] border-t-transparent" : "border-white/30"}`}
                >
                  {isComplete && "✓"}
                </span>
                {label}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default function ResumeFormPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (value: ResumeFormData) => {
    window.sessionStorage.setItem(
      "selectedResumeCard",
      JSON.stringify({
        id: "generated-resume",
        name: `${value.personalInformation.firstname || "My"}_Resume`,
        template: "classic",
        data: value,
      }),
    );
    setIsGenerating(true);

  };

  return isGenerating ? (
    <ResumeGenerationLoading onComplete={() => router.push("/resume/resumegenerated")} />
  ) : (
    <ResumeForm onSubmit={handleSubmit} />
  );
}