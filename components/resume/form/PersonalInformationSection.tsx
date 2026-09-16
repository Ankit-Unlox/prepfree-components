"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  TextInputField,
  SectionCard,
  ImageInputField,
} from "@/components/resume/form/FormPrimitives";
import type { PersonalInformation } from "@/components/resume/form/types";
import { getFirstError, isValidUrl, type FormSectionRef } from "@/components/resume/form/validation";

export const PersonalInformationSection = forwardRef<FormSectionRef, {
  value: PersonalInformation;
  onChange: (value: PersonalInformation) => void;
  isUnlocked?: boolean;
}>(({ value, onChange, isUnlocked = true }, ref) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dirtyFields = useRef(new Set<string>());

  const getErrors = (currentValue: PersonalInformation) => {
    const nextErrors: Record<string, string> = {};
    if (!currentValue.firstname.trim()) nextErrors.firstname = "First name is required.";
    if (!currentValue.lastname.trim()) nextErrors.lastname = "Last name is required.";
    if (!currentValue.email.trim()) nextErrors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentValue.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!/^\d{10}$/.test(currentValue.phone_number)) {
      nextErrors.phone_number = "Phone number must contain exactly 10 digits.";
    }
    if (!currentValue.city.trim()) nextErrors.city = "City is required.";
    if (!currentValue.country.trim()) nextErrors.country = "Country is required.";
    if (currentValue.linkedin.trim() && !isValidUrl(currentValue.linkedin.trim())) {
      nextErrors.linkedin = "Enter a valid URL.";
    }
    if (currentValue.portfolio?.trim() && !isValidUrl(currentValue.portfolio.trim())) {
      nextErrors.portfolio = "Enter a valid URL.";
    }
    return nextErrors;
  };

  const validate = () => {
    const nextErrors = getErrors(value);
    setErrors(nextErrors);
    return {
      valid: Object.keys(nextErrors).length === 0,
      firstError: getFirstError(nextErrors),
    };
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

  const update = (field: string, nextValue: string) => {
    if (field in value) {
      dirtyFields.current.add(field);
      onChange({
        ...value,
        [field]: nextValue,
      });
    }
  };

  const handleImage = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      update("profileImageUrl", String(reader.result ?? ""));
    reader.readAsDataURL(file);
  };

  return (
    <SectionCard
      number={1}
      isUnlocked={isUnlocked}
      title="Personal Information"
      description="Let's start with your basic information"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInputField
          label="First Name"
          required
          value={value.firstname}
          update={update}
          field="firstname"
          error={errors.firstname}
          placeholder="John"
        />
        <TextInputField
          label="Last Name"
          required
          value={value.lastname}
          update={update}
          field="lastname"
          error={errors.lastname}
          placeholder="Doe"
        />
        <TextInputField
          label="Email Address"
          required
          inputType="email"
          value={value.email}
          update={update}
          field="email"
          error={errors.email}
          placeholder="john.doe@example.com"
        />
        <TextInputField
          label="Phone Number"
          required
          value={value.phone_number}
          update={update}
          field="phone_number"
          error={errors.phone_number}
          placeholder="+915765000"
        />
        <TextInputField
          label="City"
          required
          value={value.city}
          update={update}
          field="city"
          error={errors.city}
          placeholder="Bengaluru"
        />
        <TextInputField
          label="Country"
          required
          value={value.country}
          update={update}
          field="country"
          error={errors.country}
          placeholder="India"
        />
        <TextInputField
          label="LinkedIn Profile"
          value={value.linkedin}
          update={update}
          field="linkedin"
          error={errors.linkedin}
          placeholder="linkedin.com/in/johndoe"
        />
        <TextInputField
          label="Portfolio / Website"
          value={value.portfolio}
          update={update}
          field="portfolio"
          error={errors.portfolio}
          placeholder="johndoe.com"
        />

        <div className="col-span-2">
          <ImageInputField
            label="Profile Photo (Optional)"
            value={value.profileImageUrl}
            handleImage={handleImage}
          />
        </div>
      </div>
    </SectionCard>
  );
});

PersonalInformationSection.displayName = "PersonalInformationSection";
