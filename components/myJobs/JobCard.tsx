"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bookmark,
  BriefcaseBusiness,
  Layers3,
  MapPin,
  WalletCards,
} from "lucide-react";
import moneyImg from "@/assets/money.png";
import type { Job } from "./types";
import { timeAgo } from "./utils";

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="border-b border-white/10 p-4 last:border-b-0 sm:p-4.5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
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
          <div className="min-w-0 h-full flex flex-col justify-center gap-0.5">
            <h2 className="text-[18px] font-bold leading-3 text-white">
              {job.title}
            </h2>
            <p className="text-[14px] text-white/45">{job.company}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label={saved ? "Remove job from saved" : "Save job"}
          aria-pressed={saved}
          onClick={() => setSaved((value) => !value)}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-white/25 transition-colors hover:bg-white/6 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aaa9]"
        >
          <Bookmark
            className="h-5 w-5"
            fill={saved ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-white/70">
        <span className="text-[14px] leading-5 inline-flex items-center gap-1.5">
          <BriefcaseBusiness className="h-3 w-3 text-white/50" />
          {job.experience}
        </span>
        <span className="text-[14px] leading-5 inline-flex items-center gap-1.5">
          <MapPin className="h-3 w-3 text-white/50" />
          {job.location}
        </span>
        <span className="text-[14px] font-medium inline-flex items-center gap-1.5 rounded-md bg-[#c9f8d9] px-2.5 py-2 text-[#15743d]">
          <img src={moneyImg.src} alt="" className="h-6 w-6 object-contain" />
          {job.salary}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-on-primary/10 pt-3">
        <span className="font-medium text-[14px] text-on-primary">
          Posted: {timeAgo(job.posted)}
        </span>
        <Link
          href={`/jobs/${job.id}`}
          className="rounded-md border border-on-primary/50 px-4 py-2 text-[10px] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aaa9]"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
