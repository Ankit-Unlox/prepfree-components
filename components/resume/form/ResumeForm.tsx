"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Save, Sparkles } from "lucide-react";
import { CertificationsSection } from "@/components/resume/form/CertificationsSection";
import { EducationSection } from "@/components/resume/form/EducationSection";
import { ExperienceSection } from "@/components/resume/form/ExperienceSection";
import { PersonalInformationSection } from "@/components/resume/form/PersonalInformationSection";
import { ProjectsSection } from "@/components/resume/form/ProjectsSection";
import { SkillsSection } from "@/components/resume/form/SkillsSection";
import {
  createEmptyResumeData,
  type ResumeFormData,
  type ResumeFormProps,
} from "@/components/resume/form/types";
import type { FormSectionRef } from "@/components/resume/form/validation";

function buildInitialValue(
  initialValue?: Partial<ResumeFormData>,
): ResumeFormData {
  const emptyValue = createEmptyResumeData();

  return {
    ...emptyValue,
    ...initialValue,
    personalInformation: {
      ...emptyValue.personalInformation,
      ...initialValue?.personalInformation,
    },
    education: initialValue?.education ?? emptyValue.education,
    experience:
      initialValue?.experience === undefined
        ? emptyValue.experience
        : initialValue.experience,
    technicalSkills:
      initialValue?.technicalSkills ?? emptyValue.technicalSkills,
    softSkills: initialValue?.softSkills ?? emptyValue.softSkills,
    tools: initialValue?.tools ?? emptyValue.tools,
    projects: initialValue?.projects ?? emptyValue.projects,
    certifications: initialValue?.certifications ?? emptyValue.certifications,
  };
}

function hasValidPersonalInformation(value: ResumeFormData["personalInformation"]) {
  return Boolean(
    value.firstname.trim() &&
      value.lastname.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email) &&
      /^\d{10}$/.test(value.phone_number) &&
      value.city.trim() &&
      value.country.trim(),
  );
}

function hasValidEducation(value: ResumeFormData["education"]) {
  return value.every(
    (item) =>
      item.degree.trim() &&
      item.institution.trim() &&
      item.startDate.trim() &&
      (item.currentlyStudying ||
        (Boolean(item.endDate?.trim()) && item.startDate < (item.endDate ?? ""))),
  );
}

function hasValidExperience(value: ResumeFormData["experience"]) {
  return (
    value === null ||
    value.every(
      (item) =>
        item.title.trim() &&
        item.company.trim() &&
        item.employmentType.trim() &&
        item.startDate.trim() &&
        item.description.trim() &&
        (item.currentlyWorkHere ||
          (Boolean(item.endDate?.trim()) && item.startDate < (item.endDate ?? ""))),
    )
  );
}

export function ResumeForm({
  initialValue,
  onChange,
  onSubmit,
  onSaveDraft,
}: ResumeFormProps) {
  const [value, setValue] = useState(() => buildInitialValue(initialValue));
  const personalInformationRef = useRef<FormSectionRef>(null);
  const educationRef = useRef<FormSectionRef>(null);
  const experienceRef = useRef<FormSectionRef>(null);
  const projectsRef = useRef<FormSectionRef>(null);
  const certificationsRef = useRef<FormSectionRef>(null);

  useEffect(() => {
    onChange?.(value);
  }, [onChange, value]);

  const updateValue = (nextValue: ResumeFormData) => {
    setValue(nextValue);
  };

  const unlockedSection = !hasValidPersonalInformation(value.personalInformation)
    ? 1
    : !hasValidEducation(value.education)
      ? 2
      : !hasValidExperience(value.experience)
        ? 3
        : 6;

  const validate = () => {
    const results = [
      personalInformationRef.current?.validate(),
      educationRef.current?.validate(),
      experienceRef.current?.validate(),
      projectsRef.current?.validate(),
      certificationsRef.current?.validate(),
    ];
    const firstError = results.find((result) => result && !result.valid)?.firstError;

    if (firstError) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const field = document.querySelector<HTMLElement>(
            `[data-validation-key="${firstError}"]`,
          );
          const input = field?.querySelector<HTMLElement>(
            "input, textarea, select",
          );
          (input ?? field)?.scrollIntoView({ behavior: "auto", block: "center" });
          input?.focus({ preventScroll: true });
        });
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      onSubmit?.(value);
      console.log(value);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="min-h-screen bg-primary font-creato text-on-primary"
    >
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-8 lg:py-10">
        <PersonalInformationSection
          ref={personalInformationRef}
          isUnlocked={unlockedSection >= 1}
          value={value.personalInformation}
          onChange={(personalInformation) =>
            updateValue({ ...value, personalInformation })
          }
        />
        <EducationSection
          ref={educationRef}
          isUnlocked={unlockedSection >= 2}
          value={value.education}
          onChange={(education) => updateValue({ ...value, education })}
        />
        <ExperienceSection
          ref={experienceRef}
          isUnlocked={unlockedSection >= 3}
          value={value.experience}
          onChange={(experience) => updateValue({ ...value, experience })}
        />
        <SkillsSection
          isUnlocked={unlockedSection >= 4}
          technicalSkills={value.technicalSkills}
          softSkills={value.softSkills}
          tools={value.tools}
          onChange={(field, nextValue) =>
            updateValue({ ...value, [field]: nextValue })
          }
        />
        <ProjectsSection
          ref={projectsRef}
          isUnlocked={unlockedSection >= 5}
          value={value.projects}
          onChange={(projects) => updateValue({ ...value, projects })}
        />
        <CertificationsSection
          ref={certificationsRef}
          isUnlocked={unlockedSection >= 6}
          value={value.certifications ?? []}
          onChange={(certifications) =>
            updateValue({ ...value, certifications })
          }
        />

        <div className="flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={() => onSaveDraft?.(value)}
            className="inline-flex min-h-10 items-center gap-2 rounded-md border border-on-primary/15 px-4 text-xs font-semibold text-on-primary/70 transition-colors hover:border-on-primary/40 hover:text-on-primary"
          >
            <Save className="h-4 w-4" /> Save as Draft
          </button>
          <button
            type="submit"
            className="inline-flex min-h-10 items-center gap-2 rounded-md bg-secondary px-4 text-xs font-semibold text-on-secondary transition-opacity hover:opacity-85"
          >
            <Sparkles className="h-4 w-4" /> Generate Resume
          </button>
        </div>
        {onSubmit && (
          <p className="mt-4 flex items-center justify-end gap-1 text-[10px] text-on-primary/35">
            <CheckCircle2 className="h-3 w-3" /> Your progress is ready to save.
          </p>
        )}
      </div>
    </form>
  );
}

export type { ResumeFormData, ResumeFormProps } from "@/components/resume/form/types";
