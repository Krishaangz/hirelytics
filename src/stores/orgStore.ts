
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Organization {
  id: string;
  name: string;
  createdBy: string;
  members: string[];
  inviteCode: string;
}

interface Project {
  id: string;
  name: string;
  organizationId: string;
  createdBy: string;
  createdAt: string;
  candidates: Candidate[];
}

interface Candidate {
  id: string;
  name: string;
  resumeFile: File | null;
  characterFile: File | null;
  uploadedAt: string;
  analyzedData?: any;
}

interface OrgState {
  organizations: Organization[];
  projects: Project[];
  currentOrg: Organization | null;
  currentProject: Project | null;
  createOrganization: (name: string, createdBy: string) => Organization;
  joinOrganization: (inviteCode: string, userId: string) => boolean;
  setCurrentOrg: (org: Organization) => void;
  createProject: (name: string, createdBy: string) => Project | null;
  setCurrentProject: (project: Project) => void;
  addCandidate: (projectId: string, candidate: Omit<Candidate, 'id' | 'uploadedAt'>) => void;
  getCandidates: (projectId: string) => Candidate[];
}

export const useOrgStore = create<OrgState>()(
  persist(
    (set, get) => ({
      organizations: [],
      projects: [],
      currentOrg: null,
      currentProject: null,

      createOrganization: (name: string, createdBy: string) => {
        const newOrg: Organization = {
          id: Date.now().toString(),
          name,
          createdBy,
          members: [createdBy],
          inviteCode: Math.random().toString(36).substr(2, 8).toUpperCase(),
        };
        
        set(state => ({
          organizations: [...state.organizations, newOrg],
          currentOrg: newOrg,
        }));
        
        return newOrg;
      },

      joinOrganization: (inviteCode: string, userId: string) => {
        const { organizations } = get();
        const org = organizations.find(o => o.inviteCode === inviteCode);
        
        if (org && !org.members.includes(userId)) {
          const updatedOrg = { ...org, members: [...org.members, userId] };
          
          set(state => ({
            organizations: state.organizations.map(o => 
              o.id === org.id ? updatedOrg : o
            ),
            currentOrg: updatedOrg,
          }));
          
          return true;
        }
        
        return false;
      },

      setCurrentOrg: (org: Organization) => {
        set({ currentOrg: org, currentProject: null });
      },

      createProject: (name: string, createdBy: string) => {
        const { currentOrg } = get();
        if (!currentOrg) return null;
        
        const newProject: Project = {
          id: Date.now().toString(),
          name,
          organizationId: currentOrg.id,
          createdBy,
          createdAt: new Date().toISOString(),
          candidates: [],
        };
        
        set(state => ({
          projects: [...state.projects, newProject],
          currentProject: newProject,
        }));
        
        return newProject;
      },

      setCurrentProject: (project: Project) => {
        set({ currentProject: project });
      },

      addCandidate: (projectId: string, candidate: Omit<Candidate, 'id' | 'uploadedAt'>) => {
        const newCandidate: Candidate = {
          ...candidate,
          id: Date.now().toString(),
          uploadedAt: new Date().toISOString(),
        };
        
        set(state => ({
          projects: state.projects.map(p => 
            p.id === projectId 
              ? { ...p, candidates: [...p.candidates, newCandidate] }
              : p
          ),
          currentProject: state.currentProject?.id === projectId
            ? { ...state.currentProject, candidates: [...(state.currentProject.candidates || []), newCandidate] }
            : state.currentProject,
        }));
      },

      getCandidates: (projectId: string) => {
        const { projects } = get();
        const project = projects.find(p => p.id === projectId);
        return project?.candidates || [];
      },
    }),
    {
      name: 'hirelytics-org',
    }
  )
);
