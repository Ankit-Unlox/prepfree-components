import { forwardRef, useEffect, useRef, useState } from "react";
import { createEmptyResumeData, type ResumeFormData } from "@/components/resume/form/types";
import type { ResumeData, ResumeTemplate } from "@/types/resume";
import ResumeTemplateOne from "@/components/resume/templets/resumeTemplateOne";
import ResumeTemplateTwo from "@/components/resume/templets/resumeTemplateTwo";
import ResumeTemplateThree from "@/components/resume/templets/resumeTemplateThree";
import { ResumeEditorProvider } from "@/components/resume/editor/ResumeEditorProvider";

type ResumeTemplatePanelProps = {
  resumeData: ResumeFormData | ResumeData;
  accentColor: number;
  fontFamily: string;
  template?: ResumeTemplate;
  onResumeDataChange?: (nextValue: ResumeFormData | ResumeData) => void;
};

const templateComponents = {
  classic: ResumeTemplateOne,
  modern: ResumeTemplateTwo,
  minimal: ResumeTemplateThree,
};

function toTemplateData(value: ResumeFormData | ResumeData) {
  if (!("personalInformation" in value)) {
    return {
      ...value,
      profileInfo: {
        ...value.profileInfo,
        description: value.profileInfo?.description ?? "",
      },
      contactInfo: {
        ...value.contactInfo,
        portfolio: value.contactInfo?.portfolio ?? undefined,
      },
      certifications: value.certifications.map((certification) => ({
        ...certification,
        title: certification.name,
        expiryDate: certification.expirationDate,
        description: "",
      })),
      additionalFields: value.additionalFields.map((field) => ({
        ...field,
        title: field.label,
        description: field.value,
      })),
    };
  }

  const personalInformation = value.personalInformation;

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
      ...(experience as any),
      id: index + 1,
      endDate: (experience as any).endDate ?? "",
      jobType: (experience as any).employmentType ?? (experience as any).jobType ?? "",
    })),
    projects: value.projects.map((project, index) => ({
      ...(project as any),
      id: index + 1,
      title: (project as any).name ?? (project as any).title ?? "",
      role: "",
      projectType: "",
    })),
    certifications: (value.certifications ?? []).map((certification, index) => ({
      ...(certification as any),
      id: index + 1,
      title: (certification as any).name ?? (certification as any).title ?? "",
      expiryDate: "",
      description: (certification as any).description ?? "",
    })),
    technicalSkills: value.technicalSkills,
    softSkills: value.softSkills,
    languages: [],
    additionalFields: [],
  };
}

function toStoredResumeTemplateData(value: ResumeData) {
  return {
    ...value,
    certifications: value.certifications.map((certification) => ({
      ...certification,
      title: certification.name,
      expiryDate: certification.expirationDate,
      description: "",
    })),
    additionalFields: value.additionalFields.map((field) => ({
      ...field,
      title: field.label,
      description: field.value,
    })),
  };
}

export const ResumeTemplatePanel = forwardRef<
  { generateResumePdf: () => Promise<File | null> },
  ResumeTemplatePanelProps
>(function ResumeTemplatePanel(
  { resumeData, accentColor, fontFamily, template = "classic", onResumeDataChange },
  ref,
) {
  const [previewWidth, setPreviewWidth] = useState(0);
  const [templateData, setTemplateData] = useState(() =>
    "personalInformation" in resumeData ? toTemplateData(resumeData) : toStoredResumeTemplateData(resumeData),
  );
  const previewRef = useRef<HTMLDivElement>(null);
  const TemplateComponent = templateComponents[template];

  useEffect(() => {
    setTemplateData(
      "personalInformation" in resumeData ? toTemplateData(resumeData) : toStoredResumeTemplateData(resumeData),
    );
  }, [resumeData]);

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
            <div style={{ fontFamily }}>
              <ResumeEditorProvider
                resumeData={templateData}
                onResumeDataChange={(nextValue) => {
                  setTemplateData(nextValue as typeof templateData);
                  onResumeDataChange?.(
                    ("personalInformation" in resumeData
                      ? {
                          ...resumeData,
                          ...nextValue,
                        }
                      : {
                          ...resumeData,
                          ...nextValue,
                        }) as ResumeFormData | ResumeData,
                  );
                }}
              >
                <TemplateComponent
                  ref={ref}
                  resumeData={templateData}
                  colorIndex={accentColor}
                  containerWidth={previewWidth}
                  {...(template === "minimal" ? { fontFamily } : {})}
                />
              </ResumeEditorProvider>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

export default ResumeTemplatePanel;
