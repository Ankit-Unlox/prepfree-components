export type Job = {
  id: string;
  title: string;
  company: string;
  icon?: string;
  companyType: string;
  location: string;
  employmentType: string;
  experience: string;
  salary: string;
  posted: string;
  description: string;
  skills: string[];
  responsibilities: string[];
  companyDescription: string;
  companySize: string;
  industry: string;
  website: string;
};

export type ApplyResume = {
  id: string;
  name: string;
  size: string;
  updatedAt: string;
};

export type Bookmark = {
  id: string;
}

export type Apply = {
  id: string;
}
