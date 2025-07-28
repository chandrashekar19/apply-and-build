import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type JobStatus = 'applied' | 'interviewing' | 'offered' | 'rejected';

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: JobStatus;
  applicationDate: string;
  notes?: string;
  contactEmail?: string;
  salary?: string;
  location?: string;
}

interface JobStore {
  jobs: JobApplication[];
  addJob: (job: Omit<JobApplication, 'id'>) => void;
  updateJob: (id: string, updates: Partial<JobApplication>) => void;
  deleteJob: (id: string) => void;
  getJobsByStatus: (status: JobStatus) => JobApplication[];
  getTotalJobs: () => number;
}

export const useJobStore = create<JobStore>()(
  persist(
    (set, get) => ({
      jobs: [],
      
      addJob: (job) => set((state) => ({
        jobs: [...state.jobs, {
          ...job,
          id: crypto.randomUUID(),
        }]
      })),
      
      updateJob: (id, updates) => set((state) => ({
        jobs: state.jobs.map(job => 
          job.id === id ? { ...job, ...updates } : job
        )
      })),
      
      deleteJob: (id) => set((state) => ({
        jobs: state.jobs.filter(job => job.id !== id)
      })),
      
      getJobsByStatus: (status) => {
        return get().jobs.filter(job => job.status === status);
      },
      
      getTotalJobs: () => get().jobs.length,
    }),
    {
      name: 'job-tracker-storage',
    }
  )
);