"use client"

import { Plus } from "lucide-react";
import Image from "next/image";
import resumeBannerSvg from "@/assets/resume-dashboard-banner.svg";
import resumeDashboardSvg from "@/assets/resume-dashboard-center.svg";


export function WelcomePanel({ setOpenPopUp }: { setOpenPopUp: (value: boolean) => void }) {
  return (
    <section className="h-full w-full relative overflow-hidden rounded-lg border border-dashed border-on-primary/15 bg-primary/95">
      <div className="flex h-full w-full flex-col">
        {/* Top 30% */}
        <div className="relative h-[30%] min-h-[100px] w-full overflow-hidden">
          <Image
            src={resumeBannerSvg}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Bottom 70% */}
        <div className="flex max-h-[60%] items-center justify-center">
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-3 p-4 text-on-primary">
              <Image
                src={resumeDashboardSvg}
                alt=""
                width={166}
                height={157}
                className="h-auto w-[104px] object-contain"
              />
            </div>

            <h2 className="text-base font-semibold text-on-primary sm:text-lg">
              You don't have a resume yet.
            </h2>

            <p className="mt-1 max-w-2xl text-xs text-on-primary/65 sm:text-sm">
              You can export your current resume and customize it, or make a resume from scratch.
            </p>

            <button
              type="button"
              className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-md bg-secondary px-4 py-2 text-m font-bold text-on-secondary transition-opacity"
              onClick={()=>setOpenPopUp(true)}
            >
              <Plus className="h-5 w-5" />
              Create Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
