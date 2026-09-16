"use client";

import {
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { PersonalInformation } from "@/components/resume/form/types";

interface FieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}

export function Field({ label, required, hint, children }: FieldProps) {
  return (
    <label className="flex min-w-0 flex-col gap-2 text-xs font-medium text-on-primary/80">
      <span>
        {label} {required && <span className="text-secondary">*</span>}
      </span>
      {children}
      {hint && (
        <span className="text-[10px] font-normal text-on-primary/45">
          {hint}
        </span>
      )}
    </label>
  );
}

const controlClassName =
  "min-h-10 w-full rounded-md border border-on-primary/10 bg-on-primary/[0.06] px-3 text-xs text-on-primary outline-none transition-colors placeholder:text-on-primary/30 focus:border-secondary focus:ring-2 focus:ring-secondary/20 disabled:cursor-not-allowed disabled:opacity-50";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`${controlClassName} ${props.className ?? ""}`}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${controlClassName} min-h-24 resize-y py-3 ${props.className ?? ""}`}
    />
  );
}

export function Select({
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`${controlClassName} ${props.className ?? ""}`}
    >
      {children}
    </select>
  );
}

export function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-on-primary/65">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-secondary"
      />
      {label}
    </label>
  );
}

export function SectionCard({
  number,
  title,
  description,
  children,
  isLast,
  disabled = false,
  isUnlocked = false,
  checkBox,
}: {
  number: number;
  title: string;
  description: string;
  children: ReactNode;
  isLast?: Boolean;
  disabled?: boolean;
  isUnlocked?: boolean;
  checkBox?: {
    label: string;
    field: string;
    id: string;
    handleCheckBox: (field: string, value: boolean, id: string) => void;
    flag: boolean;
  };
}) {
  return (
    <section className="relative flex gap-3 sm:gap-4">
      <div className="flex w-7 shrink-0 flex-col items-center">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
            isUnlocked
              ? "border-secondary bg-secondary text-on-secondary"
              : "border-on-primary/15 bg-transparent text-on-primary/40"
          }`}
        >
          {number}
        </span>
        {isLast ? "" : <span className="mt-2 w-px flex-1 bg-on-primary/10" />}
      </div>
      <div className="min-w-0 flex-1 pb-8">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-on-primary">{title}</h2>
          <p className="mt-1 text-xs text-on-primary/45">{description}</p>
        </div>
        <div className="rounded-lg border border-on-primary/10 bg-on-primary/[0.035] p-4 sm:p-5">
          <div>
            {checkBox && (
              <Checkbox
                label={checkBox.label}
                checked={checkBox.flag}
                onChange={(event) => {
                  checkBox.handleCheckBox(
                    checkBox.field,
                    event.target.checked,
                    checkBox.id,
                  );
                }}
              />
            )}
          </div>
          <fieldset disabled={disabled} className="contents">
            {children}
          </fieldset>
        </div>
      </div>
    </section>
  );
}

export function AddButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-10 w-full items-center justify-center rounded-md border border-dashed border-on-primary/15 px-3 text-xs font-semibold text-on-primary/65 transition-colors hover:border-secondary hover:text-secondary"
    >
      + {label}
    </button>
  );
}

export function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[11px] font-medium text-destructive transition-opacity hover:opacity-75"
    >
      Remove
    </button>
  );
}

interface TextInputFieldProps {
  label: string;
  inputType?: string;
  required?: boolean;
  hint?: string;
  placeholder: string;
  value: string | null;
  field: string;
  id?: string | null;
  update: (field: string, value: string, id?: string) => void;
  isDisable?: boolean;
  checkBox?: {
    label: string;
    field: string;
    id: string | null;
    handleCheckBox: (field: string, value: boolean, id: string) => void;
    flag: boolean;
  };
  error?: string;
}

export function TextInputField({
  label,
  inputType = "text",
  required,
  value,
  update,
  field,
  placeholder,
  id,
  checkBox,
  isDisable = false,
  error,
}: TextInputFieldProps) {
  const [touched, setTouched] = useState(false);

  const showError = Boolean(error) || (required && touched && !value?.trim());

  const handleChange = (value: string) => {
    if (id !== undefined) update(field, value, id ?? undefined);
    else update(field, value);
  };

  return (
    <div
      className={`relative flex min-w-0 flex-col gap-2 text-xs font-medium text-on-primary/80`}
      data-validation-key={id ? `${id}.${field}` : field}
    >
      <span>
        {label} {required && <span className="text-[#CE6A6A]">*</span>}
      </span>

      <Input
        type={inputType}
        disabled={Boolean(isDisable)}
        value={value ?? ""}
        onChange={(event) => handleChange(event.target.value)}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        className={`${showError ? "border-[#CE6A6A]!" : ""}`}
      />
      {checkBox && (
        <Checkbox
          label={checkBox.label}
          checked={checkBox.flag}
          onChange={(event) => {
            checkBox.handleCheckBox(
              checkBox.field,
              event.target.checked,
              checkBox.id ?? "",
            );
          }}
        />
      )}
      {showError && (
        <p className="absolute right-0 top-full mt-1 text-xs text-[#CE6A6A]">
          {error ?? "This field is required."}
        </p>
      )}
    </div>
  );
}

export function TextareaField({
  label,
  inputType = "text",
  required,
  hint,
  value,
  update,
  field,
  placeholder,
  id,
  checkBox,
  error,
}: TextInputFieldProps) {
  const handleChange = (value: string) => {
    if (id !== undefined) update(field, value, id ?? undefined);
    else update(field, value);
  };

  return (
    <label
      className="flex min-w-0 flex-col gap-2 text-xs font-medium text-on-primary/80"
      data-validation-key={id ? `${id}.${field}` : field}
    >
      <span>
        {label} {required && <span className="text-[#CE6A6A]">*</span>}
      </span>

      <Textarea
        value={value ?? ""}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
      />

      {checkBox && (
        <Checkbox
          label={checkBox.label}
          checked={checkBox.flag}
          onChange={(event) =>
            checkBox.handleCheckBox(
              checkBox.field,
              event.target.checked,
              checkBox.id ?? "",
            )
          }
        />
      )}
      {error && <p className="text-xs text-[#CE6A6A]">{error}</p>}
    </label>
  );
}

interface ImageInputFieldProps {
  label: string;
  value: string | null;
  handleImage: (file: File) => void;
}

export function ImageInputField({
  label,
  value,
  handleImage,
}: ImageInputFieldProps) {
  const handleUpload = (file?: File) => {
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    handleImage(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files?.[0];

    handleUpload(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-on-primary/80">{label}</label>

      <label
        htmlFor="profile-photo"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex h-57 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-on-primary/15 bg-primary/5 transition hover:bg-primary/10"
      >
        {value ? (
          <img
            src={value}
            alt="Profile preview"
            className="mb-4 h-14 w-14 rounded-full object-cover"
          />
        ) : (
          <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#053232] text-[#72B7B7]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M8 13h8" />
              <path d="M8 17h5" />
            </svg>
          </div>
        )}

        <span className="text-sm text-on-primary/80">
          {value ? "You have choosed" : "Click to upload or drag and drop"}
        </span>

        <span className="mt-2 text-xs text-on-primary/45">
          PNG, JPG up to 5MB
        </span>

        <span className="mt-4 rounded-md bg-on-primary/10 px-7 py-3 text-sm font-semibold text-on-primary/60">
          Choose File
        </span>

        <input
          id="profile-photo"
          type="file"
          accept="image/png,image/jpeg"
          onChange={(event) => handleUpload(event.target.files?.[0])}
          className="hidden"
        />
      </label>
    </div>
  );
}

interface SelectOptionFieldProps {
  label: string;
  required?: boolean;
  value: string | null;
  field: string;
  id?: string | null;
  update: (field: string, value: string, id?: string) => void;
  options: string[];
  error?: string;
}

export function SelectOptionField({
  label,
  field,
  id,
  required,
  value,
  options,
  update,
  error,
}: SelectOptionFieldProps) {
  return (
    <label
      className="flex min-w-0 flex-col gap-2 text-xs font-medium text-on-primary/80"
      data-validation-key={id ? `${id}.${field}` : field}
    >
      <span>
        {label} {required && <span className="text-[#CE6A6A]">*</span>}
      </span>

      <Select
        value={value ?? ""}
        onChange={(event) => update(field, event.target.value, id ?? undefined)}
      >
        <option value="" className="bg-[#272727] text-white">Select type</option>
        {options.length > 0 &&
          options.map((ele, i) => <option key={i} className="bg-[#272727] text-white">{ele}</option>)}
      </Select>
      {error && <p className="text-xs text-[#CE6A6A]">{error}</p>}
    </label>
  );
}
