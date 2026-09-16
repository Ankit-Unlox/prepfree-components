"use client";

import { Plus } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import {
  RemoveButton,
  SectionCard,
  SelectOptionField,
  TextareaField,
  TextInputField,
} from "@/components/resume/form/FormPrimitives";
import { createEmptyExperience, type ExperienceItem } from "@/components/resume/form/types";
import { getFirstError, type FormSectionRef } from "@/components/resume/form/validation";

export const ExperienceSection = forwardRef<FormSectionRef, {
  value: ExperienceItem[] | null;
  onChange: (value: ExperienceItem[] | null) => void;
  isUnlocked?: boolean;
}>(({ value, onChange, isUnlocked = false }, ref) => {
  const [hasNoExperience, setHasNoExperience] = useState(value === null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dirtyFields = useRef(new Set<string>());
  const experienceItems = value ?? [];

  const getErrors = (items: ExperienceItem[] | null) => {
    if (items === null) return {};
    const nextErrors: Record<string, string> = {};
    items.forEach((item) => {
      if (!item.title.trim()) nextErrors[`${item.id}.title`] = "Job title is required.";
      if (!item.company.trim()) nextErrors[`${item.id}.company`] = "Company name is required.";
      if (!item.employmentType.trim()) nextErrors[`${item.id}.employmentType`] = "Employment type is required.";
      if (!item.startDate.trim()) nextErrors[`${item.id}.startDate`] = "Start date is required.";
      if (!item.description.trim()) nextErrors[`${item.id}.description`] = "Description is required.";
      if (!item.currentlyWorkHere && !item.endDate?.trim()) {
        nextErrors[`${item.id}.endDate`] = "End date is required.";
      } else if (
        !item.currentlyWorkHere &&
        item.startDate &&
        item.endDate &&
        item.startDate >= item.endDate
      ) {
        nextErrors[`${item.id}.endDate`] = "End date must be after start date.";
      }
    });
    return nextErrors;
  };

  const validate = () => {
    const nextErrors = getErrors(value);
    setErrors(nextErrors);
    return { valid: Object.keys(nextErrors).length === 0, firstError: getFirstError(nextErrors) };
  };

  useImperativeHandle(ref, () => ({ validate }), [value]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const nextErrors = getErrors(value);
      setErrors((currentErrors) => {
        const next = { ...currentErrors };
        dirtyFields.current.forEach((field) => {
          if (nextErrors[field]) next[field] = nextErrors[field];
          else delete next[field];
        });
        return next;
      });
    }, 400);
    return () => window.clearTimeout(timeout);
  }, [value]);

  const update = (field: string, nextValue: string, id?: string) => {
    if (id) {
      dirtyFields.current.add(`${id}.${field}`);
      if (field === "startDate" || field === "endDate") {
        dirtyFields.current.add(`${id}.startDate`);
        dirtyFields.current.add(`${id}.endDate`);
      }
    }
    onChange(
      experienceItems.map((item) =>
        item.id === id ? { ...item, [field]: nextValue } : item,
      ),
    );
  };

  const handleSectionCheckBox = (_field: string, nextValue: boolean) => {
    setHasNoExperience(nextValue);
    onChange(
      nextValue
        ? null
        : experienceItems.length > 0
          ? experienceItems
          : [createEmptyExperience()],
    );
  };

  const handleCheckBox = (_field: string, nextValue: boolean, id: string) => {
    dirtyFields.current.add(`${id}.endDate`);
    onChange(
      experienceItems.map((item) =>
        item.id === id
          ? {
              ...item,
              currentlyWorkHere: nextValue,
              endDate: nextValue ? null : item.endDate,
            }
          : item,
      ),
    );
  };
  return (
    <SectionCard
      number={3}
      isUnlocked={isUnlocked}
      title="Experience"
      description="Share your professional work history"
      disabled={hasNoExperience}
      checkBox={{
        label: "I don't have work experince",
        field: "hasNoExperience",
        id: "experience-section",
        handleCheckBox: handleSectionCheckBox,
        flag: hasNoExperience,
      }}
    >
      <div className="space-y-5">
        {experienceItems.map((item, index) => (
          <div key={item.id} className="space-y-4 pb-5 last:border-0 last:pb-0">
            <div className="flex items-end justify-end gap-3">
              {experienceItems.length > 1 && (
                <RemoveButton
                  onClick={() =>
                    onChange(
                      experienceItems.filter((entry) => entry.id !== item.id),
                    )
                  }
                />
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextInputField
                label="Job Title"
                required
                value={item.title}
                update={update}
                field="title"
                error={errors[`${item.id}.title`]}
                placeholder="UX Designer"
                id={item.id}
              />
              <TextInputField
                label="Company Name"
                required
                value={item.company}
                update={update}
                field="company"
                error={errors[`${item.id}.company`]}
                placeholder="Unikon"
                id={item.id}
              />

              <SelectOptionField
                label="Employment Type"
                required
                value={item.employmentType}
                update={update}
                field="employmentType"
                id={item.id}
                error={errors[`${item.id}.employmentType`]}
                options={[
                  "Full-time",
                  "Part-time",
                  "Contract",
                  "Internship",
                  "Freelance",
                ]}
              />

              <TextInputField
                label="Location"
                value={item.location}
                update={update}
                field="location"
                placeholder="Bengaluru"
                id={item.id}
              />

              <TextInputField
                label="Start Year"
                required
                inputType="date"
                value={item.startDate}
                update={update}
                field="startDate"
                error={errors[`${item.id}.startDate`]}
                placeholder=""
                id={item.id}
              />

              <TextInputField
                label="End Year"
                required={!item.currentlyWorkHere}
                inputType="date"
                value={item.endDate}
                update={update}
                field="endDate"
                error={errors[`${item.id}.endDate`]}
                placeholder=""
                id={item.id}
                isDisable={hasNoExperience || Boolean(item.currentlyWorkHere)}
                checkBox={{
                  label: "I currently work here",
                  field: "currentlyWorkHere",
                  flag: Boolean(item.currentlyWorkHere),
                  id: item.id,
                  handleCheckBox: handleCheckBox,
                }}
              />

              <div className="col-span-2">
                <TextareaField
                  label="Description"
                  required
                  value={item.description}
                  update={update}
                  field="description"
                  error={errors[`${item.id}.description`]}
                  placeholder="Describe your responsibilities and day-to-day work..."
                  id={item.id}
                />
              </div>

              <div className="col-span-2">
                <TextareaField
                  label="Achievements"
                  value={item.achievements}
                  update={update}
                  field="achievements"
                  placeholder="List your key achievements, awards, or measurable impact..."
                  id={item.id}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...experienceItems, createEmptyExperience()])}
          className="flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-dashed border-on-primary/15 text-xs font-semibold text-on-primary/65 hover:border-secondary hover:text-secondary"
        >
          <Plus className="h-4 w-4" /> Add Experience
        </button>
      </div>
    </SectionCard>
  );
});

ExperienceSection.displayName = "ExperienceSection";
