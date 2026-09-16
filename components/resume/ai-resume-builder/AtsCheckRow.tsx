import { Check, ChevronRight } from "lucide-react";
import atsImg from "@/assets/ats-hero.png";


function CheckerRow({ description }: { description: string }) {
  return (
    <article className="flex flex-col items-start gap-4 rounded-lg border border-on-primary/15 bg-primary/95 p-3 sm:flex-row sm:items-center sm:gap-5 sm:p-3">
      <div className="relative flex aspect-[1.75] w-full max-w-[175px] items-center justify-center overflow-hidden rounded-md bg-success/15">
      <img src={atsImg.src} alt=""  className="w-full h-full"/>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-on-primary sm:text-base">
          Optimize your resume with PrepFree ATS Checker
        </h3>
        <p className="mt-1 max-w-xl text-xs leading-4 text-on-primary/65">
          {description}
        </p>
      </div>
      <button
        type="button"
        className="inline-flex shrink-0 items-center gap-1 px-1 text-xs font-medium text-[#72B7B7]"
      >
        Check Resume
      </button>
    </article>
  );
}

export { CheckerRow};