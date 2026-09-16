export type ResumeTemplate = "classic" | "modern" | "minimal";

export interface ResumeCard {
  id: string;
  name: string;
  template: ResumeTemplate;
  data: ResumeData;
}

export interface ResumeData {
  profileInfo: {
    firstname: string;
    lastname: string;
    title: string;
    description: string;
    profileImageUrl: string;
  };

  contactInfo: {
    email: string;
    phone_number: string;
    country_code: string;
    linkedin: string;
    portfolio: string;
    location: string;
  };

  education: {
    id: number;
    institution: string;
    location: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];

  experience: {
    id: number;
    title: string;
    company: string;
    location: string;
    jobType: string;
    startDate: string;
    endDate: string;
    currentlyWorkHere: boolean;
    description: string;
  }[];

  projects: {
    id: number;
    title: string;
    role: string;
    projectType: string;
    technologies: string;
    link: string;
    description: string;
  }[];

  certifications: {
    id: number;
    name: string;
    issuer: string;
    issueDate: string;
    expirationDate: string;
    credentialId: string;
    credentialUrl: string;
  }[];

  technicalSkills: {
    name: string;
  }[];

  softSkills: {
    name: string;
  }[];

  languages: {
    name: string;
  }[];

  additionalFields: {
    id: number;
    label: string;
    value: string;
  }[];
}