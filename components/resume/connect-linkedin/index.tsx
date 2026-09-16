"use client";

import { useEffect, useState } from "react";

type ConnectLinkedInProps = {
  onComplete?: () => void;
};

const stages = [
  "Analyzing your information...",
  "Optimizing content for ATS...",
  "Crafting professional summary...",
  "Formatting your resume...",
  "Finalizing design...",
];

export function ConnectLinkedIn({ onComplete }: ConnectLinkedInProps) {
  const [activeStage, setActiveStage] = useState(2);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStage((stage) => {
        if (stage === stages.length - 1) {
          window.clearInterval(timer);
          onComplete?.();
          return stage;
        }
        return stage + 1;
      });
    }, 1400);

    return () => window.clearInterval(timer);
  }, [onComplete]);

  const progress = Math.round(((activeStage + 1) / stages.length) * 100);

  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-[#020505] px-5 py-10 font-creato text-white">
      <section
        aria-labelledby="linkedin-connection-title"
        className="w-full max-w-130 text-center"
      >
        <div className="relative mx-auto flex h-30 max-w-115 items-center justify-between sm:h-35">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#0a84bd] text-[42px] font-bold leading-none tracking-[-0.08em] shadow-[0_0_24px_rgba(10,132,189,0.18)] sm:h-15 sm:w-15">
            <span className="-translate-x-px translate-y-px">in</span>
          </div>

          <div className="absolute inset-x-12 top-1/2 h-12 -translate-y-1/2 sm:inset-x-15">
            <span className="absolute left-0 right-0 top-1/2 border-t border-[#007c7d]/55" />
            <span className="absolute left-[7%] top-0 h-8 w-12 -rotate-17 rounded-full border-b border-[#007c7d]/45 sm:w-15" />
            <span className="absolute left-[28%] top-1 h-8 w-12 rotate-17 rounded-full border-b border-[#007c7d]/45 sm:w-15" />
            <span className="absolute right-[28%] top-1 h-8 w-12 -rotate-17 rounded-full border-b border-[#007c7d]/45 sm:w-15" />
            <span className="absolute right-[7%] top-0 h-8 w-12 rotate-17 rounded-full border-b border-[#007c7d]/45 sm:w-15" />
          </div>

          <div className="relative z-10 flex h-18 w-18 items-center justify-center rounded-full border-4 border-[#006b6d]/40 bg-[#007b7c] text-4xl font-semibold shadow-[0_0_0_7px_rgba(0,96,98,0.18),0_0_0_13px_rgba(0,96,98,0.09),0_0_30px_rgba(0,180,179,0.35)] sm:h-20 sm:w-20">
            e
          </div>

          <div className="flex h-25 w-20 flex-col gap-2 rounded-[3px] bg-[#303437] p-2 opacity-95 shadow-[0_0_16px_rgba(255,255,255,0.04)] sm:h-26 sm:w-21">
            <span className="h-4 w-5 bg-[#5c5f61]" />
            <span className="absolute ml-6 mt-1 h-1 w-9 bg-[#5c5f61]" />
            <span className="h-1 w-full bg-[#5c5f61]" />
            <span className="h-1 w-full bg-[#5c5f61]" />
            <span className="h-1 w-[85%] bg-[#5c5f61]" />
            <span className="h-1 w-full bg-[#5c5f61]" />
            <span className="h-1 w-[90%] bg-[#5c5f61]" />
            <span className="h-1 w-full bg-[#5c5f61]" />
          </div>
        </div>

        <div className="mt-6">
          <h1
            id="linkedin-connection-title"
            className="text-base font-medium tracking-[-0.01em] sm:text-lg"
          >
            Connecting your LinkedIn
          </h1>
          <p className="mt-1 text-[10px] text-white/45">
            Crafting professional summary...
          </p>
        </div>

        <div className="mx-auto mt-5 w-full max-w-47">
          <div
            className="h-1 overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-label="LinkedIn connection progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="h-full rounded-full bg-[#78c7c5] transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-1 text-[7px] text-white/35">{progress}% Complete</p>
        </div>

        <ol className="mx-auto mt-4 w-fit space-y-2 text-left text-[8px] sm:text-[9px]">
          {stages.map((stage, index) => {
            const isComplete = index < activeStage;
            const isActive = index === activeStage;

            return (
              <li
                key={stage}
                className={`flex items-center gap-2 transition-colors ${
                  isActive || isComplete ? "text-white/65" : "text-white/20"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-2.5 w-2.5 items-center justify-center rounded-full border ${
                    isComplete
                      ? "border-[#70c8c6] text-[#70c8c6]"
                      : isActive
                        ? "border-[#70c8c6] border-r-transparent"
                        : "border-white/25"
                  }`}
                >
                  {isComplete && <span className="text-[7px] leading-none">✓</span>}
                </span>
                <span>{stage}</span>
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}

export default ConnectLinkedIn;