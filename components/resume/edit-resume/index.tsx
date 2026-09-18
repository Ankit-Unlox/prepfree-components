"use client";

import { useEffect, useRef, useState } from "react";
import {
  createEmptyResumeData,
  type ResumeFormData,
} from "@/components/resume/form/types";
import type { ResumeCard, ResumeTemplate } from "@/types/resume";
import ResumeHeader from "@/components/resume/ResumeHeader";
import ResumeRightSidebar from "@/components/resume/edit-resume/ResumeRightSidebar";
import ResumeTemplatePanel from "@/components/resume/edit-resume/ResumeTemplatePanel";

const sampleResume: ResumeFormData = {
  ...createEmptyResumeData(),
  personalInformation: {
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    phone_number: "(555) 123-4567",
    country_code: "+1",
    city: "San Francisco",
    country: "CA",
    linkedin: "linkedin.com/in/johndoe",
    portfolio: "johndoe.dev",
    profileImageUrl: "",
  },
  education: [
    {
      ...createEmptyResumeData().education[0],
      degree: "Bachelor of Science",
      institution: "University of California, Berkeley",
      fieldOfStudy: "Computer Science",
      startDate: "2015",
      endDate: "2019",
    },
  ],
  experience: [
    {
      ...createEmptyResumeData().experience![0],
      title: "Senior Software Engineer",
      company: "Tech Company",
      startDate: "2022",
      endDate: "",
      currentlyWorkHere: true,
      description:
        "Led development of microservices architecture serving 1M+ users.\nImproved application performance by 40% through optimization.\nMentored 5 junior developers and conducted code reviews.",
    },
  ],
  technicalSkills: [
    { id: "skill-1", name: "JavaScript" },
    { id: "skill-2", name: "TypeScript" },
    { id: "skill-3", name: "React" },
  ],
};

export function EditResume() {
  const [selectedResume, setSelectedResume] = useState<ResumeCard | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAiEnhanceOpen, setIsAiEnhanceOpen] = useState(false);
  const [accentColor, setAccentColor] = useState(0);
  const [fontFamily, setFontFamily] = useState("Poppins");
  const [selectedTemplate, setSelectedTemplate] = useState("Template One");
  const templateRef = useRef<{ generateResumePdf: () => Promise<File | null> }>(null);

  useEffect(() => {
    const storedResume = window.sessionStorage.getItem("selectedResumeCard");
    if (!storedResume) return;

    const resume = JSON.parse(storedResume) as ResumeCard;
    setSelectedResume(resume);
    setSelectedTemplate(
      resume.template === "modern"
        ? "Template Two"
        : resume.template === "minimal"
          ? "Template Three"
          : "Template One",
    );
  }, []);

  const resumeData = selectedResume?.data ?? sampleResume;
  const selectedTemplateKey: ResumeTemplate =
    selectedTemplate === "Template Two"
      ? "modern"
      : selectedTemplate === "Template Three"
        ? "minimal"
        : "classic";

  const downloadResume = async () => {
    const file = await templateRef.current?.generateResumePdf();
    if (!file) return;
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "john-doe-resume.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="h-screen overflow-hidden bg-[#090a0a] pt-14 font-creato text-white">
      <ResumeHeader
        isEditing={isEditing}
        isAiEnhanceOpen={isAiEnhanceOpen}
        onOpenEdit={() => {
          setIsAiEnhanceOpen(false);
          setIsEditing(true);
        }}
        onOpenAi={() => {
          setIsEditing(false);
          setIsAiEnhanceOpen(true);
        }}
        onSaveChanges={() => {
          setIsEditing(false);
          setIsAiEnhanceOpen(false);
        }}
        onDownload={downloadResume}
      />

      <div
        className={
          isEditing || isAiEnhanceOpen
            ? "grid h-[calc(100vh-56px)] lg:grid-cols-[minmax(0,1fr)_354px]"
            : "h-[calc(100vh-56px)]"
        }
      >
        <ResumeTemplatePanel
          ref={templateRef}
          resumeData={resumeData}
          accentColor={accentColor}
          fontFamily={fontFamily}
          template={selectedTemplateKey}
        />

        <ResumeRightSidebar
          resumeData={resumeData}
          isEditing={isEditing}
          isAiEnhanceOpen={isAiEnhanceOpen}
          fontFamily={fontFamily}
          accentColor={accentColor}
          selectedTemplate={selectedTemplate}
          onCloseEdit={() => setIsEditing(false)}
          onCloseAi={() => setIsAiEnhanceOpen(false)}
          onFontChange={setFontFamily}
          onAccentChange={setAccentColor}
          onTemplateChange={setSelectedTemplate}
        />
      </div>
    </main>
  );
}

export default EditResume;