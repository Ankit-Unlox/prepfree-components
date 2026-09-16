export type ResumeId = string;

export interface PersonalInformation {
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  country_code: string | null;
  city: string;
  country: string;
  linkedin: string;
  portfolio: string | null;
  profileImageUrl: string | null;
}

export interface EducationItem {
  id: ResumeId;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string | null;
  currentlyStudying: boolean;
  fieldOfStudy: string;
  grade: string;
  description: string | null;
}

export interface ExperienceItem {
  id: ResumeId;
  title: string;
  company: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string | null;
  currentlyWorkHere: boolean;
  description: string;
  achievements: string;
}

export interface ProjectItem {
  id: ResumeId;
  name: string;
  technologies: string;
  description: string;
  link: string;
}

export interface CertificationItem {
  id: ResumeId;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
  description: string;
}

export interface SkillItem {
  id: ResumeId;
  name: string;
}

export interface ResumeFormData {
  personalInformation: PersonalInformation;
  education: EducationItem[];
  experience: ExperienceItem[] | null;
  technicalSkills: SkillItem[];
  softSkills: SkillItem[];
  tools: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[] | null;
}

export interface ResumeFormProps {
  initialValue?: Partial<ResumeFormData>;
  onChange?: (value: ResumeFormData) => void;
  onSubmit?: (value: ResumeFormData) => void;
  onSaveDraft?: (value: ResumeFormData) => void;
}

export const createId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const createEmptyEducation = (id = createId()): EducationItem => ({
  id,
  degree: "",
  institution: "",
  location: "",
  startDate: "",
  endDate: "",
  currentlyStudying: false,
  fieldOfStudy: "",
  grade: "",
  description: "",
});

export const createEmptyExperience = (id = createId()): ExperienceItem => ({
  id,
  title: "",
  company: "",
  employmentType: "",
  location: "",
  startDate: "",
  endDate: "",
  currentlyWorkHere: false,
  description: "",
  achievements: "",
});

export const createEmptyProject = (id = createId()): ProjectItem => ({
  id,
  name: "",
  technologies: "",
  description: "",
  link: "",
});

export const createEmptyCertification = (id = createId()): CertificationItem => ({
  id,
  name: "",
  issuer: "",
  issueDate: "",
  credentialId: "",
  credentialUrl: "",
  description: "",
});

export const createEmptySkill = (): SkillItem => ({ id: createId(), name: "" });

export const createEmptyResumeData = (): ResumeFormData => ({
  personalInformation: {
    firstname: "",
    lastname: "",
    email: "",
    phone_number: "",
    country_code: "+91",
    city: "",
    country: "",
    linkedin: "",
    portfolio: "",
    profileImageUrl: "",
  },
  education: [createEmptyEducation("initial-education")],
  experience: [createEmptyExperience("initial-experience")],
  technicalSkills: [],
  softSkills: [],
  tools: [],
  projects: [createEmptyProject("initial-project")],
  certifications: [createEmptyCertification("initial-certification")],
});