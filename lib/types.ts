// Shared API-aligned type definitions for UCS Service API

// ─── News ─────────────────────────────────────────────────────────────────────

export interface NewsItem {
  id: number;
  title: string;
  subtitle: string | null;
  date: string; // "YYYY-MM-DD"
  tags: string[];
  team: string | null;
  news: string; // full body text
  main_image: string | null;
  images: string[];
}

export interface PaginatedNewsResponse {
  items: NewsItem[];
  total: number;
  page: number;
  per_page: number;
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export interface TeamMember {
  name: string;
  titles: string[];
  role: string;
  years_of_experience: number;
  image: string;
  summary: string;
}

// ─── Team Detail ──────────────────────────────────────────────────────────────

export interface DegreeEntry {
  degree_title: string;
  university: string;
  location: string;
  start_year: number;
  end_year: number | null;
}

export interface JobExperience {
  type: "job";
  data: {
    position_title: string;
    company: string;
    location: string;
    start_date: string;
    end_date: string | null;
    summary_points: string[];
  };
}

export interface TrainingGivenExperience {
  type: "training_given";
  data: {
    training_titles: string[];
  };
}

export type Experience = JobExperience | TrainingGivenExperience;

export interface TechnicalSkillCategory {
  category: string;
  skills: string[];
}

export interface ResearchProject {
  title: string;
  authors: string[];
  description: string;
}

export interface SoftwareProject {
  title: string;
  links: { title: string; url: string }[];
  tech_stack: string[];
  descriptions: string[];
}

export interface TeamMemberDetail {
  name: string;
  titles: string[];
  role: string;
  years_of_experience: number;
  image: string;
  contact: {
    email: string | null;
    phone: string | null;
    linkedin: string | null;
  };
  summary: string;
  education: {
    bachelors: DegreeEntry[];
    masters: DegreeEntry[];
    phd: DegreeEntry[];
    other: DegreeEntry[];
  };
  experiences: Experience[];
  grants_awards: { description: string; year: number }[];
  trainings_taken: {
    local: string[];
    international: string[];
  };
  leadership_programs: { title: string; description: string }[];
  technical_skills: TechnicalSkillCategory[];
  projects: {
    research: ResearchProject[];
    software: SoftwareProject[];
  };
}
