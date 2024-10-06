import { computed, makeObservable, observable } from 'mobx';
import axios from 'axios';
import { apiUrls } from '@/api';
import { ProjectModel } from '@/models/ProjectModel';
import { ProjectServer } from '@/entities/project';
import { IProjectsStore } from './types';

export class ProjectsStore implements IProjectsStore {
  private _projects: ProjectModel[] = [];

  constructor() {
    makeObservable<this, '_projects'>(this, {
      _projects: observable,
      projects: computed,
    });
  }

  get projects(): ProjectModel[] {
    return this._projects;
  }

  setProjects(projects: ProjectModel[]): void {
    this._projects = projects;
  }

  async fetchProjects(): Promise<void> {
    const response = await axios.get<ProjectServer[]>(apiUrls.getProjects);
    const projects = response.data.map((project) => ProjectModel.normalizeJson(project));
    this.setProjects(projects);
  }
}
