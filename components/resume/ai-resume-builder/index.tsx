"use client";

import type { ResumeCard } from "@/types/resume";
import { ResumeCardItem } from "@/components/resume/ai-resume-builder/MyResumeCard";
import { WelcomePanel } from "@/components/resume/ai-resume-builder/WelcomPanel";
import { CheckerRow } from "@/components/resume/ai-resume-builder/AtsCheckRow";
import { ResumeCreationPopup } from "@/components/resume/ResumeCreatioPopup/ResumeCreationPopup";
import { LinkedInImportDialog } from "@/components/resume/ResumeCreatioPopup/LinkedInImportDialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

const defaultCheckerItems = [
  "Make sure your resume passes ATS filters and stands out to hiring managers with job-specific suggestions.",
  "Make sure your resume passes ATS filters and stands out to hiring managers with job-specific suggestions.",
  "Make sure your resume passes ATS filters and stands out to hiring managers with job-specific suggestions.",
];

// Dummy Data
const previewResumeData = {
  profileInfo: {
    firstname: "Shreya",
    lastname: "Sharma",
    title: "Product Designer",
    description:
      "Product designer focused on clear, useful digital experiences and thoughtful visual systems.",
    profileImageUrl: "",
  },
  contactInfo: {
    email: "shreya.sharma@example.com",
    phone_number: "9876543210",
    country_code: "+91",
    linkedin: "linkedin.com/in/shreyasharma",
    portfolio: "shreyasharma.design",
    location: "Bengaluru, India",
  },
  education: [
    {
      id: 1,
      institution: "National Institute of Design",
      location: "Ahmedabad, India",
      degree: "Bachelor of Design",
      fieldOfStudy: "Communication Design",
      startDate: "2018-07-01",
      endDate: "2022-05-01",
      description: "",
    },
  ],
  experience: [
    {
      id: 1,
      title: "Product Designer",
      company: "Northstar Labs",
      location: "Bengaluru, India",
      jobType: "Full-time",
      startDate: "2022-06-01",
      endDate: "",
      currentlyWorkHere: true,
      description:
        "Led product discovery and shipped accessible workflows for a growing SaaS platform.",
    },
    {
      id: 2,
      title: "UX Design Intern",
      company: "Studio Grove",
      location: "Mumbai, India",
      jobType: "Internship",
      startDate: "2021-01-01",
      endDate: "2021-06-01",
      currentlyWorkHere: false,
      description:
        "Created prototypes and visual systems for early-stage products.",
    },
  ],
  projects: [
    {
      id: 1,
      title: "Atlas Workspace",
      role: "Product Designer",
      projectType: "Case study",
      technologies: "Figma, FigJam",
      link: "",
      description:
        "Redesigned team planning flows to reduce setup time and improve clarity.",
    },
  ],
  certifications: [],
  technicalSkills: [
    { name: "Figma" },
    { name: "Design systems" },
    { name: "Prototyping" },
  ],
  softSkills: [{ name: "Collaboration" }, { name: "Communication" }],
  languages: [{ name: "English" }, { name: "Hindi" }],
  additionalFields: [],
};

const defaultResumeCards: ResumeCard[] = [
  {
    id: "1",
    name: "Shreya_Resume",
    template: "classic",
    data: previewResumeData,
  },
  {
    id: "2",
    name: "Shreya_Resume",
    template: "modern",
    data: previewResumeData,
  },
  {
    id: "3",
    name: "Shreya_Resume",
    template: "minimal",
    data: previewResumeData,
  },
];

export function ResumeDashboard() {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openLinkedInDialog, setOpenLinkedInDialog] = useState(false);
  const router = useRouter();

  const resumeCards = defaultResumeCards;
  const checkerItems = defaultCheckerItems;

  return (
    <main className="min-h-full px-3 py-3 font-creato text-on-primary sm:px-5 lg:px-8">
      <div className="mx-auto max-w-[1440px] space-y-5">
        <div className="w-full h-[53vh]">
          <WelcomePanel setOpenPopUp={setOpenPopUp} />
        </div>

        {resumeCards.length > 0 && (
          <div className="w-full">
            <section aria-labelledby="my-resumes">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-semibold text-on-primary">
                  My Resume
                </h2>
              </div>
              <div className="w-full">
                <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {resumeCards.map((resume) => (
                    <ResumeCardItem
                      key={resume.id}
                      resume={resume}
                      onView={(selectedResume) => {
                        window.sessionStorage.setItem(
                          "selectedResumeCard",
                          JSON.stringify(selectedResume),
                        );
                        router.push("/resume/resumegenerated");
                      }}
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        <div className="mt-10">
          <section aria-labelledby="ats-checker" className="space-y-5">
            {checkerItems.map((description, index) => (
              <CheckerRow
                key={`${description}-${index}`}
                description={description}
              />
            ))}
          </section>
        </div>
      </div>
      <ResumeCreationPopup
        open={openPopUp}
        onClose={setOpenPopUp}
        onConnectLinkedIn={() => setOpenLinkedInDialog(true)}
      />
      <LinkedInImportDialog
        open={openLinkedInDialog}
        onClose={() => setOpenLinkedInDialog(false)}
        onImport={(profileUrl) => {
          window.sessionStorage.setItem("linkedinProfileUrl", profileUrl);
          setOpenLinkedInDialog(false);
          router.push("/resume/connectlinkedin");
        }}
      />
    </main>
  );
}
