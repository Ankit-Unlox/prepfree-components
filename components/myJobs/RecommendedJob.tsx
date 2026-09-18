import { Bookmark, BriefcaseBusiness, Layers3, MapPin } from "lucide-react";
import Link from "next/link";
import type { Job } from "./types";
import { useEffect, useState } from "react";
import moneyImg from "@/assets/money.png";

type RecommendedJobProps = {
  job: Job;
  isSaved?: boolean;
  onToggleSave?: (id: string, saved: boolean) => void;
};

export function RecommendedJob({
  job,
  isSaved = false,
  onToggleSave,
}: RecommendedJobProps) {
  const [saved, setSaved] = useState(isSaved);

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const handleSave = () => {
    const nextValue = !saved;
    setSaved(nextValue);
    onToggleSave?.(job.id, nextValue);
  };

  return (
    <article className="rounded-md border border-on-primary bg-primary p-3">
      <div className="flex items-start justify-between gap-2">
        <Link
          href={`/jobs/${job.id}`}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aaa9]"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-black text-white">
            {job.icon ? (
              <img
                src={job.icon}
                alt={`${job.company} logo`}
                className="h-full w-full object-cover"
              />
            ) : (
              <Layers3 className="h-5 w-5" strokeWidth={2.2} />
            )}
          </div>
          <div>
            <p className="font-medium text-[14px] text-on-primary">
              {job.company}
            </p>
            <span className="font-medium text-[12px] inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-white/50" /> {job.location}
            </span>
          </div>
        </Link>
        <button
          type="button"
          aria-label={saved ? "Remove job from saved" : "Save job"}
          aria-pressed={saved}
          onClick={handleSave}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-white/25 transition-colors hover:bg-white/6 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aaa9]"
        >
          <Bookmark
            className="h-5 w-5"
            fill={saved ? "currentColor" : "none"}
          />
        </button>
      </div>
      <Link
        href={`/jobs/${job.id}`}
        className="block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aaa9]"
      >
        <p className="mt-3 font-medium text-[16px] text-white">{job.title}</p>
        <div className="mt-2 flex items-center gap-3 text-[8px] text-white/65">
          <span className="text-[14px] leading-5 inline-flex items-center gap-1.5">
            <BriefcaseBusiness className="h-3 w-3 text-white/50" />
            {job.employmentType}
          </span>
          <span className="text-[14px] font-medium inline-flex items-center gap-1.5 rounded-md bg-[#c9f8d9] px-2.5 py-2 text-[#15743d]">
            <img src={moneyImg.src} alt="" className="h-6 w-6 object-contain" />
            {job.salary}
          </span>
        </div>
      </Link>
    </article>
  );
}
