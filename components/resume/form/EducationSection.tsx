"use client";

import { Plus } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { RemoveButton, SectionCard, TextInputField } from "@/components/resume/form/FormPrimitives";
import type { EducationItem } from "@/components/resume/form/types";
import { getFirstError, type FormSectionRef } from "@/components/resume/form/validation";

export const EducationSection = forwardRef<FormSectionRef, {
  value: EducationItem[];
  onChange: (value: EducationItem[]) => void;
  isUnlocked?: boolean;
}>(({ value, onChange, isUnlocked = false }, ref) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dirtyFields = useRef(new Set<string>());

  const getErrors = (items: EducationItem[]) => {
    const nextErrors: Record<string, string> = {};
    items.forEach((item) => {
      const requiredFields: Array<[string, string, string]> = [
        ["degree", item.degree, "Degree is required."],
        ["institution", item.institution, "Institution name is required."],
        ["startDate", item.startDate, "Start date is required."],
      ];
      requiredFields.forEach(([field, fieldValue, message]) => {
        if (!fieldValue.trim()) nextErrors[`${item.id}.${field}`] = message;
      });
      if (!item.currentlyStudying && !item.endDate?.trim()) {
        nextErrors[`${item.id}.endDate`] = "End date is required.";
      } else if (
        !item.currentlyStudying &&
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
      value.map((item) =>
        item.id === id ? { ...item, [field]: nextValue } : item,
      ),
    );
  };
  const handleCheckBox = (_field: string, nextValue: boolean, id: string) => {
    dirtyFields.current.add(`${id}.endDate`);
    onChange(
      value.map((item) =>
        item.id === id
          ? {
              ...item,
              currentlyStudying: Boolean(nextValue),
              endDate: nextValue ? null : item.endDate,
            }
          : item,
      ),
    );
  };

  return (
    <SectionCard
      number={2}
      isUnlocked={isUnlocked}
      title="Education"
      description="Add your educational background"
    >
      <div className="space-y-5">
        {value.map((item, index) => (
          <div key={item.id} className="space-y-4 pb-5 last:border-0 last:pb-0">
            <div className="flex items-center justify-between gap-3">
              {value.length > 1 && (
                <RemoveButton
                  onClick={() =>
                    onChange(value.filter((entry) => entry.id !== item.id))
                  }
                />
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextInputField
                label="Degree"
                required
                value={item.degree}
                update={update}
                field="degree"
                error={errors[`${item.id}.degree`]}
                placeholder="Bachelor of Science"
                id={item.id}
              />
              <TextInputField
                label="Institution Name"
                required
                value={item.institution}
                update={update}
                field="institution"
                error={errors[`${item.id}.institution`]}
                placeholder="Delhi University"
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
                required={!item.currentlyStudying}
                inputType="date"
                value={item.endDate}
                update={update}
                field="endDate"
                error={errors[`${item.id}.endDate`]}
                placeholder=""
                id={item.id}
                isDisable={item.currentlyStudying}
                checkBox={{
                  label: "I am currently studying here",
                  field: "currentlyStudying",
                  flag: item.currentlyStudying,
                  id: item.id,
                  handleCheckBox: handleCheckBox,
                }}
              />
              <TextInputField
                label="Field of Study"
                value={item.fieldOfStudy}
                update={update}
                field="fieldOfStudy"
                placeholder="Computer Science"
                id={item.id}
              />

              <TextInputField
                label="Grade/CGPA"
                value={item.grade}
                update={update}
                field="grade"
                placeholder="3.8 / 4"
                id={item.id}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            onChange([
              ...value,
              {
                id: `${Date.now()}`,
                degree: "",
                institution: "",
                location: "",
                startDate: "",
                endDate: "",
                currentlyStudying: false,
                fieldOfStudy: "",
                grade: "",
                description: "",
              },
            ])
          }
          className="flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-dashed border-on-primary/15 text-xs font-semibold text-on-primary/65 hover:border-secondary hover:text-secondary"
        >
          <Plus className="h-4 w-4" /> Add Education
        </button>
      </div>
    </SectionCard>
  );
});

EducationSection.displayName = "EducationSection";
