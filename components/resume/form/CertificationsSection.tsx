"use client";

import { Plus } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import {
  Field,
  Input,
  RemoveButton,
  SectionCard,
  Textarea,
  TextInputField,
} from "@/components/resume/form/FormPrimitives";
import { createEmptyCertification, type CertificationItem } from "@/components/resume/form/types";
import { getFirstError, isValidUrl, type FormSectionRef } from "@/components/resume/form/validation";

export const CertificationsSection = forwardRef<FormSectionRef, {
  value: CertificationItem[];
  onChange: (value: CertificationItem[]) => void;
  isUnlocked?: boolean;
}>(({ value, onChange, isUnlocked = false }, ref) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dirtyFields = useRef(new Set<string>());

  const getErrors = (items: CertificationItem[]) => {
    const nextErrors: Record<string, string> = {};
    items.forEach((item) => {
      const hasCertification = [
        item.name,
        item.issuer,
        item.issueDate,
        item.credentialId,
        item.credentialUrl,
      ].some((field) => field.trim());
      if (hasCertification && !item.issueDate.trim()) {
        nextErrors[`${item.id}.issueDate`] = "Issue date is required.";
      }
      if (item.credentialUrl.trim() && !isValidUrl(item.credentialUrl.trim())) {
        nextErrors[`${item.id}.credentialUrl`] = "Enter a valid URL.";
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
      number={6}
      isUnlocked={isUnlocked}
      title="Certifications"
      description="Add professional certifications (optional)"
      isLast={true}
    >
      <div className="space-y-5">
        {value.map((item, index) => (
          <div key={item.id} className="space-y-4 pb-5 last:border-0 last:pb-0">
            <div className="flex items-center justify-end gap-3">
              {value.length > 1 && (
                <RemoveButton
                  onClick={() =>
                    onChange(value.filter((entry) => entry.id !== item.id))
                  }
                />
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="col-span-2">
                <TextInputField
                  label="Certification Name"
                  value={item.name}
                  update={update}
                  field="name"
                  placeholder="UX Design Professional Certificate"
                  id={item.id}
                />
              </div>
              <TextInputField
                label="Issuing Organization"
                value={item.issuer}
                update={update}
                field="issuer"
                placeholder="Unlox"
                id={item.id}
              />

              <TextInputField
                label="Issue Date"
                inputType="date"
                value={item.issueDate}
                update={update}
                field="issueDate"
                error={errors[`${item.id}.issueDate`]}
                placeholder=""
                id={item.id}
              />

              <TextInputField
                label="Credential ID"
                value={item.credentialId}
                update={update}
                field="credentialId"
                placeholder="ABCXYZNDF13"
                id={item.id}
              />

              <TextInputField
                label="Credential URL"
                value={item.credentialUrl}
                update={update}
                field="credentialUrl"
                error={errors[`${item.id}.credentialUrl`]}
                placeholder="Paste here"
                id={item.id}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, createEmptyCertification()])}
          className="flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-dashed border-on-primary/15 text-xs font-semibold text-on-primary/65 hover:border-secondary hover:text-secondary"
        >
          <Plus className="h-4 w-4" /> Add Certification
        </button>
      </div>
    </SectionCard>
  );
});

CertificationsSection.displayName = "CertificationsSection";
