"use client";

import { Plus } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import {
  Field,
  Input,
  RemoveButton,
  SectionCard,
  Textarea,
  TextareaField,
  TextInputField,
} from "@/components/resume/form/FormPrimitives";
import { createEmptyProject, type ProjectItem } from "@/components/resume/form/types";
import { getFirstError, isValidUrl, type FormSectionRef } from "@/components/resume/form/validation";

export const ProjectsSection = forwardRef<FormSectionRef, {
  value: ProjectItem[];
  onChange: (value: ProjectItem[]) => void;
  isUnlocked?: boolean;
}>(({ value, onChange, isUnlocked = false }, ref) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dirtyFields = useRef(new Set<string>());

  const getErrors = (items: ProjectItem[]) => {
    const nextErrors: Record<string, string> = {};
    items.forEach((item) => {
      if (item.link.trim() && !isValidUrl(item.link.trim())) {
        nextErrors[`${item.id}.link`] = "Enter a valid URL.";
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
    if (id) dirtyFields.current.add(`${id}.${field}`);
      onChange(
        value.map((item) =>
          item.id === id ? { ...item, [field]: nextValue } : item,
        ),
      );
    
  };


  return (
    <SectionCard
      number={5}
      isUnlocked={isUnlocked}
      title="Projects"
      description="Showcase your notable work (optional)"
    >
      <div className="space-y-5">
        {value.map((item, index) => (
          <div key={item.id} className="space-y-4 pb-5 last:border-0 last:pb-0">
            <div className="flex items-end justify-end gap-3">
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
                label="Project Name"
                value={item.name}
                update={update}
                field="name"
                placeholder="E-commerce platform"
                id={item.id}
              />
              <TextInputField
                label="Technologies Used"
                value={item.technologies}
                update={update}
                field="technologies"
                placeholder="React, MongoDB, APIs"
                id={item.id}
              />
              <div className="col-span-2">
                <TextareaField
                                label="Description"
                                value={item.description}
                                update={update}
                                field="description"
                                placeholder="Describe your responsibilities and day-to-day work..."
                                id={item.id}
                              />
              </div>
              <div className="col-span-2">
                <TextInputField
                  label="Project Link / GitHub / Portfolio"
                  value={item.link}
                  update={update}
                  field="link"
                  error={errors[`${item.id}.link`]}
                  placeholder="Paste here"
                  id={item.id}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, createEmptyProject()])}
          className="flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-dashed border-on-primary/15 text-xs font-semibold text-on-primary/65 hover:border-secondary hover:text-secondary"
        >
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>
    </SectionCard>
  );
});

ProjectsSection.displayName = "ProjectsSection";
