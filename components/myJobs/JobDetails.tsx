"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  Check,
  Globe2,
  MapPin,
  Share2,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";
import {
  addAppliedId,
  applied as initialApplied,
  bookmarked as initialBookmarked,
  recommendedJobs,
  addBookmarkedId,
  removeBookmarkedId,
} from "./data";
import { ApplyModal, type ApplyResume } from "./ApplyModal";
import { ApplicationSubmittedModal } from "./ApplicationSubmittedModal";
import { RecommendedJob } from "./RecommendedJob";
import type { Job } from "./types";
import { timeAgo } from "./utils";

type JobDetailsProps = {
  job: Job;
  resumes?: ApplyResume[];
};

export function JobDetails({ job, resumes = [] }: JobDetailsProps) {
  const [saved, setSaved] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const [submittedOpen, setSubmittedOpen] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>(() => [...initialApplied]);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => [...initialBookmarked]);

  const isApplied = appliedJobIds.includes(job.id);
  const isSavedJob = savedJobIds.includes(job.id);

  return (
    <main className="min-h-full bg-[#020505] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-305 gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.95fr)]">
        <article className="min-w-0 flex flex-col gap-10">
          <header>
            <h1 className="text-[32px] font-bold text-on-primary sm:text-[20px]">
              {job.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-white/70">
              <span className="font-medium text-[14px] inline-flex items-center gap-1">
                <Building2 className="h-3 w-3 text-white/50" /> {job.company}
              </span>
              <span className="font-medium text-[14px] inline-flex items-center gap-1.5">
                {timeAgo(job.posted)}
              </span>
              <span className="font-medium text-[14px] inline-flex items-center gap-1.5">
                <BriefcaseBusiness className="h-3 w-3 text-white/50" />{" "}
                {job.employmentType}
              </span>
              <span className="font-medium text-[14px] inline-flex items-center gap-1.5 rounded-sm bg-[#c9f8d9] px-2.5 py-1.5 text-[#15743d]">
                {job.salary}
              </span>
              <span className="font-medium text-[14px] inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-white/50" /> {job.location}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => !isApplied && setApplyOpen(true)}
                disabled={isApplied}
                className="rounded-md bg-secondary px-5 py-2 text-[16px] font-medium leading-1 text-on-secondary disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isApplied ? "Applied" : "Apply Now"}
              </button>
              <button
                type="button"
                aria-label={isSavedJob ? "Remove job from saved" : "Save job"}
                aria-pressed={isSavedJob}
                onClick={() => {
                  const nextValue = !isSavedJob;
                  setSavedJobIds((prev) => {
                    if (nextValue) {
                      if (prev.includes(job.id)) return prev;
                      addBookmarkedId(job.id);
                      return [...prev, job.id];
                    }

                    removeBookmarkedId(job.id);
                    return prev.filter((jobId) => jobId !== job.id);
                  });
                }}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-on-primary bg-primary text-on-primary"
              >
                <Bookmark
                  className="h-4 w-4"
                  fill={isSavedJob ? "currentColor" : "none"}
                />
              </button>
              <button
                type="button"
                aria-label="Share job"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-on-primary bg-primary text-on-primary"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </header>

          <section className="flex flex-col gap-10 text-[10px] leading-5 text-white/55">
            <div className="flex flex-col gap-4">
              <h2 className="mb-2 text-[24px] font-medium text-on-primary">
                Increase your chance of hiring!
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md border border-primary px-3 py-2 font-bold text-[16px] text-on-primary"
                >
                  <Sparkles className="h-3 w-3 text-[#f1c84b]" /> Tailored your
                  Resume
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md border border-primary px-3 py-2 font-bold text-[16px] text-on-primary"
                >
                  <Sparkles className="h-3 w-3 text-[#f1c84b]" /> Practice AI
                  Mock Interview
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="mb-2 text-[24px] font-medium text-on-primary">
                Matching Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-on-secondary bg-secondary px-3 py-1 text-[16px] font-medium text-on-secondary"
                  >
                    <Check className="h-4 w-4 font-bold" strokeWidth={3} /> {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-2 text-[24px] font-medium text-on-primary">
                We Are Creative Commerce Experts
              </h2>
              <p className="text-[18px] leading-8 text-on-primary">{job.description}</p>
            </div>

            <div>
              <h2 className="mb-2 text-[24px] font-medium text-on-primary">
                Responsibilities
              </h2>
              <ul className="list-disc space-y-1 pl-4 text-[18px] leading-8 text-on-primary">
                {job.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            </div>
          </section>
        </article>

        <aside className="border-l border-secondary pl-4 lg:pl-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#1478ff] text-white">
              {job.icon ? (
              <img
                src={job.icon}
                alt={`${job.company} logo`}
                className="h-full w-full object-cover"
              />
            ) : (
               <Globe2 className="h-6 w-6" />
            )}
            </div>
            <div>
              <h2 className="text-[32px] font-bold text-on-primary sm:text-[20px]">
                {job.company}
              </h2>
              <p className="text-[18px] leading-8 text-on-primary">
                {job.companyType}
              </p>
            </div>
          </div>
          <p className="mt-5 text-[14px] leading-6 text-on-primary">
            {job.companyDescription}
          </p>
          <div className="my-4 border-t border-white/[0.1]" />
          <div className="space-y-4 text-[9px] text-white/55">
            <span className="flex items-center gap-3">
              <Users className="h-4 w-4" />{" "}
              <span className="font-medium text-[14px]">
                <b className="block text-[10px] font-medium uppercase text-on-primary">
                  Size
                </b>
                {job.companySize}
              </span>
            </span>
            <span className="flex items-center gap-3">
              <Users className="h-4 w-4" />{" "}
              <span className="font-medium text-[14px]">
                <b className="block text-[10px] font-medium uppercase text-on-primary">
                  Industry
                </b>
                {job.industry}
              </span>
            </span>
            <span className="flex items-center gap-3">
              <Globe2 className="h-4 w-4" />{" "}
              <span className="font-medium text-[14px]">
                <b className="block text-[10px] font-medium uppercase text-on-primary">
                  Website
                </b>
                <u>{job.website}</u>
              </span>
            </span>
          </div>
          <h2 className="mt-6 mb-3 text-[24px] font-medium text-on-primary">
            Recommended Jobs
          </h2>
          <div className="space-y-2">
            {recommendedJobs.map((recommendedJob) => (
              <RecommendedJob
                key={recommendedJob.id}
                job={recommendedJob}
                isSaved={savedJobIds.includes(recommendedJob.id)}
                onToggleSave={(id, nextSaved) => {
                  setSavedJobIds((prev) => {
                    if (nextSaved) {
                      if (prev.includes(id)) return prev;
                      addBookmarkedId(id);
                      return [...prev, id];
                    }

                    removeBookmarkedId(id);
                    return prev.filter((jobId) => jobId !== id);
                  });
                }}
              />
            ))}
          </div>
        </aside>
      </div>
      <ApplyModal
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        resumes={resumes}
        onApply={() => {
          setAppliedJobIds((prev) => {
            if (prev.includes(job.id)) {
              return prev;
            }

            addAppliedId(job.id);
            return [...prev, job.id];
          });
          setApplyOpen(false);
          setSubmittedOpen(true);
        }}
      />
      <ApplicationSubmittedModal
        open={submittedOpen}
        onClose={() => setSubmittedOpen(false)}
      />
    </main>
  );
}

export default JobDetails;
