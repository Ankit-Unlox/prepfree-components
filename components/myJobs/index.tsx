"use client";

import { useState } from "react";
import { SlidersVertical } from "lucide-react";
import {
  applied as initialApplied,
  bookmarked as initialBookmarked,
  jobs,
} from "./data";
import { JobCard } from "./JobCard";

const tabs = ["All", "Applied", "Saved"] as const;
type Tab = (typeof tabs)[number];

export function MyJobs() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => [...initialBookmarked]);
  const [appliedJobIds] = useState<string[]>(() => [...initialApplied]);

  const setSaved = (flag: boolean, id: string) => {
    setSavedJobIds((prev) => {
      if (flag) {
        return prev.includes(id) ? prev : [...prev, id];
      }

      return prev.filter((jobId) => jobId !== id);
    });
  };

  return (
    <main className="min-h-full px-4 py-6 text-on-primary">
      <div className="mx-auto grid max-w-305 gap-4 md:grid-cols-[minmax(0,1.7fr)_minmax(260px,0.9fr)]">
        <section aria-label="Job listings" className="min-w-0">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  aria-pressed={activeTab === tab}
                  className={`rounded-full border px-5 py-2.5 text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aaa9] ${
                    activeTab === tab
                      ? "border-[#6be5e4] bg-[#f0ffff] text-[#087f80]"
                      : "border-white/8 bg-[#1c1e1f] text-white/45 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-1.5 text-[11px] text-[#62d9d8] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00aaa9]"
            >
              <SlidersVertical className="h-4 w-4" />
              <span className="hidden sm:inline">Filter Results</span>
            </button>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/[0.14] bg-[#0d0f0f]">
            {activeTab === "Applied"
              ? jobs
                  .filter((job) => appliedJobIds.includes(job.id))
                  .map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      isSaved={savedJobIds.includes(job.id)}
                      setSaved={setSaved}
                    />
                  ))
              : activeTab === "Saved"
                ? jobs
                    .filter((job) => savedJobIds.includes(job.id))
                    .map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        isSaved={savedJobIds.includes(job.id)}
                        setSaved={setSaved}
                      />
                    ))
                : jobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      isSaved={savedJobIds.includes(job.id)}
                      setSaved={setSaved}
                    />
                  ))}
          </div>
        </section>

        <aside aria-label="Job content" className="space-y-4">
          <div className="rounded-xl bg-[#111313] p-4">
            <p className="text-[13px] text-white">Content</p>
            <div className="mt-4 h-40 rounded-lg bg-[#1d1f1f] sm:h-40" />
          </div>
          <div className="h-75 rounded-xl bg-[#1d1f1f] sm:h-95.75" />
        </aside>
      </div>
    </main>
  );
}

export default MyJobs;
