import { ProjectModel } from '@/models/ProjectModel';

export interface IProjectsStore {
  projects: ProjectModel[];
  setProjects(projects: ProjectModel[]): void;
  fetchProjects(): Promise<void>;
}
