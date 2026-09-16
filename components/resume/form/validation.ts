export interface ValidationResult {
  valid: boolean;
  firstError?: string;
}

export interface FormSectionRef {
  validate: () => ValidationResult;
}

export function getFirstError(errors: Record<string, string>) {
  return Object.keys(errors)[0];
}

export function isValidUrl(value: string) {
  try {
    const normalizedValue = /^[a-z][a-z\d+.-]*:\/\//i.test(value)
      ? value
      : `https://${value}`;
    const url = new URL(normalizedValue);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      (url.hostname.includes(".") || url.hostname === "localhost")
    );
  } catch {
    return false;
  }
}