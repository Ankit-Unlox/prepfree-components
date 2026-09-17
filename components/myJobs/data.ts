import type { Job } from "./types";
import type { ApplyResume } from "@/types/job";

const baseJob: Job = {
  id: "1",
  title: "Web Designer",
  company: "Unlox Academy",
  companyType: "Edutech Company",
  location: "Bangalore",
  employmentType: "Full Time",
  experience: "3-5 Years",
  salary: "$85K - $120K",
  posted: "12-09-2026",
  description: "Unlox is a modern career platform designed to connect students with the right opportunities. From internships and graduate roles to skill validation and career insights, Unlox helps young talent showcase their abilities and stand out to top recruiters.",
  skills: ["Design Materials", "Design Materials", "Design Materials"],
  responsibilities: [
    "Connect students and fresh graduates with relevant job and internship opportunities.",
    "Provide a platform for users to showcase their skills, education, and achievements.",
    "Enable skill validation through certified skill tests to help candidates stand out.",
    "Help recruiters identify and hire the right talent efficiently.",
    "Offer career insights and industry trends to guide students in their career paths.",
  ],
  companyDescription: "Unlox is a modern career platform designed to connect students with the right opportunities. From internships and graduate roles to skill validation and career insights, Unlox helps young talent showcase their abilities and stand out to top recruiters.",
  companySize: "11-50 employees",
  industry: "Edutech",
  website: "Unloxacademy.com",
};

export const jobs: Job[] = [baseJob, { ...baseJob, id: "2" }, { ...baseJob, id: "3" }];

export const recommendedJobs: Job[] = [
  {
    ...baseJob,
    id: "recommended-1",
    title: "Technical Support Specialist",
    company: "Google Inc.",
    companyType: "Technology Company",
    location: "Bangalore, India",
    employmentType: "Full Time",
  },
  {
    ...baseJob,
    id: "recommended-2",
    title: "Technical Support Specialist",
    company: "Google Inc.",
    companyType: "Technology Company",
    location: "Bangalore, India",
    employmentType: "Full Time",
  },
];

export const applyResumes: ApplyResume[] = [
  { id: "resume-1", name: "Shreya resume.pdf", size: "727 KB", updatedAt: "5/25/2026" },
  { id: "resume-2", name: "ShreyaM CV-1.pdf", size: "869 KB", updatedAt: "7/17/2025" },
];

export function getJobById(id: string) {
  return jobs.find((job) => job.id === id) ?? jobs[0];
}



export const bookmarked: string[] = [];
export const applied: string[] = [];

export function addBookmarkedId(id: string) {
  if (!bookmarked.includes(id)) {
    bookmarked.push(id);
  }
}

export function removeBookmarkedId(id: string) {
  const index = bookmarked.indexOf(id);
  if (index !== -1) {
    bookmarked.splice(index, 1);
  }
}

export function addAppliedId(id: string) {
  if (!applied.includes(id)) {
    applied.push(id);
  }
}

export function removeAppliedId(id: string) {
  const index = applied.indexOf(id);
  if (index !== -1) {
    applied.splice(index, 1);
  }
}


