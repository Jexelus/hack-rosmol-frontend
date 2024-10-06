import { ProjectsStore } from '../ProjectsStore';
import { IProjectsStore } from '../ProjectsStore/types';

export interface IRootStore {
  projectsStore: IProjectsStore;
}

export class RootStore implements IRootStore {
  readonly projectsStore: IProjectsStore = new ProjectsStore();
}
