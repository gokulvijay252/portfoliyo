export interface Hero {
  id: number;
  name: string;
  title: string;
  tagline: string;
  social_links: SocialLink[];
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string | null;
  display_order: number;
}

export interface About {
  id: number;
  bio: string;
  profile_image_url: string | null;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  display_order: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  start_date: string;
  end_date: string | null;
  description: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string | null;
  start_year: number;
  end_year: number | null;
  description: string | null;
}

export interface Qualification {
  id: number;
  title: string;
  organization: string;
  start_year: number;
  end_year: number | null;
  description: string | null;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}