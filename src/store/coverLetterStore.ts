import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CoverLetterData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  address: string;
  
  // Company Information
  companyName: string;
  hiringManagerName: string;
  jobTitle: string;
  date: string;
  
  // Letter Content
  introduction: string;
  bodyParagraph1: string;
  bodyParagraph2: string;
  conclusion: string;
  
  // Additional
  skills: string[];
  references: string;
}

interface CoverLetterStore {
  coverLetterData: CoverLetterData;
  updateCoverLetterData: (data: Partial<CoverLetterData>) => void;
  resetCoverLetterData: () => void;
}

const initialCoverLetterData: CoverLetterData = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  companyName: '',
  hiringManagerName: '',
  jobTitle: '',
  date: new Date().toLocaleDateString(),
  introduction: '',
  bodyParagraph1: '',
  bodyParagraph2: '',
  conclusion: '',
  skills: [],
  references: 'References available upon request',
};

export const useCoverLetterStore = create<CoverLetterStore>()(
  persist(
    (set) => ({
      coverLetterData: initialCoverLetterData,
      updateCoverLetterData: (data) =>
        set((state) => ({
          coverLetterData: { ...state.coverLetterData, ...data },
        })),
      resetCoverLetterData: () =>
        set({ coverLetterData: initialCoverLetterData }),
    }),
    {
      name: 'cover-letter-storage',
    }
  )
);