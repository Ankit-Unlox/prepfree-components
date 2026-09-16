"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface TooltipAction {
  label: string;
  icon: LucideIcon;
  onClick: () => void | Promise<void>;
  variant?: "primary" | "secondary";
}

interface TooltipProps {
  trigger: ReactNode;
  title: string;
  primaryAction: TooltipAction;
  secondaryAction?: TooltipAction;
}

export function Tooltip({
  trigger,
  title,
  primaryAction,
  secondaryAction,
}: TooltipProps) {
  const PrimaryIcon = primaryAction.icon;
  const SecondaryIcon = secondaryAction?.icon;

  return (
    <div className="group relative">
      {trigger}
      <div
        role="dialog"
        aria-label={title}
        className="pointer-events-none absolute right-0 top-[calc(100%+10px)] z-50  w-[min(356px,calc(100vw-1.5rem))] overflow-visible rounded-xl border border-white/10 bg-[#1b1c1c] text-white opacity-0 shadow-2xl transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
      >
        <span
          aria-hidden="true"
          className="absolute -top-2 right-10 h-4 w-4 rotate-45 border-l border-t border-white/10 bg-[#1b1c1c]"
        />
        <div className="relative border-b border-white/10 px-6 py-5">
          <h2 className="text-lg font-medium tracking-tight">{title}</h2>
        </div>
        <div className="space-y-5 px-8 py-5">
          <div className="border-b-2 border-white/10 pb-1.5 ">
              <button
                type="button"
                onClick={primaryAction.onClick}
                className="flex w-full items-center justify-center gap-4 rounded-md bg-[#087f7d] px-4 py-2.5 text-base font-medium transition-colors hover:bg-[#0b9290]"
              >
              <PrimaryIcon className="h-5 w-5" />
              {primaryAction.label}
              </button>
          </div>
          {secondaryAction && SecondaryIcon && (
              <button
                type="button"
              onClick={secondaryAction.onClick}
              className="flex w-full items-center justify-center gap-2 text-base text-white/90 transition-colors hover:text-white"
            >
              <SecondaryIcon className="h-4 w-4" />
              {secondaryAction.label}
              </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tooltip;
