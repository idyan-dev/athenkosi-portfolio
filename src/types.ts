export interface SkillItem {
  name: string;
  rating: number; // 0 to 100 for progress bar
  color: string;
}

export interface SkillCategory {
  title: string;
  iconName: string; // Used to pick lucide-react icon
  skills: SkillItem[];
}

export interface CourseCard {
  code: string;
  name: string;
  status: "Completed" | "Current" | "Upcoming";
  term: string;
  description: string;
  skillsGained: string[];
}

export interface TimelineItem {
  year: string;
  institution: string;
  degreeName: string;
  status: string;
  detail: string;
  courses: CourseCard[];
}

export interface PracticalItem {
  id: string;
  title: string;
  category: "Genetics" | "Microbiology" | "Analytical Chemistry";
  summary: string;
  duration: string;
  objectives: string[];
  skillsLearned: string[];
  methodologies: string[];
  equipmentUsed: string[];
  safetyPrecautions: string[];
}

export interface KnowledgeTopic {
  title: string;
  description: string;
  subtopics: string[];
}

export interface KnowledgeCategory {
  title: string;
  iconName: string;
  description: string;
  topics: KnowledgeTopic[];
}

export interface InterestItem {
  title: string;
  iconName: string;
  description: string;
  importance: string;
}

export interface CareerMilestone {
  title: string;
  milestone: string;
  timeframe: string;
  description: string;
  skillsToAcquire: string[];
  iconName: string;
}

export interface CertificationItem {
  title: string;
  issuedBy: string;
  date: string;
  badgeName: string;
  status: "Earned" | "In Progress" | "Planned";
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
}

export interface ProjectShowcase {
  title: string;
  category: string;
  description: string;
  keywords: string[];
  outcome: string;
}
