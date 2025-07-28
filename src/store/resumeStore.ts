import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
  summary?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrentRole: boolean;
  description: string[];
  location?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language';
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Resume {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

interface ResumeStore {
  resume: Resume;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, updates: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, updates: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
}

const initialResume: Resume = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
  },
  experiences: [],
  education: [],
  skills: [],
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: initialResume,
      
      updatePersonalInfo: (info) => set((state) => ({
        resume: {
          ...state.resume,
          personalInfo: { ...state.resume.personalInfo, ...info }
        }
      })),
      
      addExperience: (experience) => set((state) => ({
        resume: {
          ...state.resume,
          experiences: [...state.resume.experiences, {
            ...experience,
            id: crypto.randomUUID(),
          }]
        }
      })),
      
      updateExperience: (id, updates) => set((state) => ({
        resume: {
          ...state.resume,
          experiences: state.resume.experiences.map(exp => 
            exp.id === id ? { ...exp, ...updates } : exp
          )
        }
      })),
      
      deleteExperience: (id) => set((state) => ({
        resume: {
          ...state.resume,
          experiences: state.resume.experiences.filter(exp => exp.id !== id)
        }
      })),
      
      addEducation: (education) => set((state) => ({
        resume: {
          ...state.resume,
          education: [...state.resume.education, {
            ...education,
            id: crypto.randomUUID(),
          }]
        }
      })),
      
      updateEducation: (id, updates) => set((state) => ({
        resume: {
          ...state.resume,
          education: state.resume.education.map(edu => 
            edu.id === id ? { ...edu, ...updates } : edu
          )
        }
      })),
      
      deleteEducation: (id) => set((state) => ({
        resume: {
          ...state.resume,
          education: state.resume.education.filter(edu => edu.id !== id)
        }
      })),
      
      addSkill: (skill) => set((state) => ({
        resume: {
          ...state.resume,
          skills: [...state.resume.skills, {
            ...skill,
            id: crypto.randomUUID(),
          }]
        }
      })),
      
      updateSkill: (id, updates) => set((state) => ({
        resume: {
          ...state.resume,
          skills: state.resume.skills.map(skill => 
            skill.id === id ? { ...skill, ...updates } : skill
          )
        }
      })),
      
      deleteSkill: (id) => set((state) => ({
        resume: {
          ...state.resume,
          skills: state.resume.skills.filter(skill => skill.id !== id)
        }
      })),
    }),
    {
      name: 'resume-builder-storage',
    }
  )
);