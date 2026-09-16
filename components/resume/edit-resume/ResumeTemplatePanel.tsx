import { forwardRef, useEffect, useRef, useState } from "react";
import { createEmptyResumeData, type ResumeFormData } from "@/components/resume/form/types";
import ResumeTemplateOne from "@/components/resume/templets/resumeTemplateOne";

type ResumeTemplatePanelProps = {
  resumeData: ResumeFormData;
  accentColor: number;
};

function toTemplateData(value: ResumeFormData) {
  const { personalInformation } = value;

  return {
    profileInfo: {
      firstname: personalInformation.firstname,
      lastname: personalInformation.lastname,
      description:
        "Experienced software engineer with 5+ years of expertise in building scalable web applications using modern technologies.",
      profileImageUrl: personalInformation.profileImageUrl,
    },
    contactInfo: {
      ...personalInformation,
      country_code: personalInformation.country_code ?? "",
      portfolio: personalInformation.portfolio ?? undefined,
    },
    education: value.education.map((education, index) => ({
      ...education,
      id: index + 1,
      endDate: education.endDate ?? "",
      description: education.description ?? "",
    })),
    experience: (value.experience ?? []).map((experience, index) => ({
      ...experience,
      id: index + 1,
      endDate: experience.endDate ?? "",
      jobType: experience.employmentType,
    })),
    projects: value.projects.map((project, index) => ({
      ...project,
      id: index + 1,
      title: project.name,
      role: "",
      projectType: "",
    })),
    certifications: (value.certifications ?? []).map((certification, index) => ({
      ...certification,
      id: index + 1,
      title: certification.name,
      expiryDate: "",
    })),
    technicalSkills: value.technicalSkills,
    softSkills: value.softSkills,
    languages: [],
    additionalFields: [],
  };
}

export const ResumeTemplatePanel = forwardRef<
  { generateResumePdf: () => Promise<File | null> },
  ResumeTemplatePanelProps
>(function ResumeTemplatePanel({ resumeData, accentColor }, ref) {
  const [previewWidth, setPreviewWidth] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = previewRef.current;
    if (!node) return;

    const observer = new ResizeObserver(() => setPreviewWidth(node.clientWidth));
    observer.observe(node);
    setPreviewWidth(node.clientWidth);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="h-full min-w-0 overflow-y-auto bg-[#090a0a] px-3 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto flex min-h-full max-w-200 items-start justify-center">
        <div
          ref={previewRef}
          className="w-full overflow-hidden rounded-2xl bg-white object-cover shadow-2xl"
        >
          {previewWidth > 0 && (
            <ResumeTemplateOne
              ref={ref}
              resumeData={toTemplateData(resumeData)}
              colorIndex={accentColor}
              containerWidth={previewWidth}
            />
          )}
        </div>
      </div>
    </section>
  );
});

export default ResumeTemplatePanel;
