export interface IProject {
  id: number;
  authorId: number | null;
  creationTimeUnix: number | null;
  name: string | null;
  category: string | null;
  region: string | null;
  logo: string | null;
  contactInfo: string | null;
  projectScale: string | null;
  projectStartTime: string | null;
  projectEndTime: string | null;
  videoPreview: string | null;
  roles: Record<string, unknown> | null;
  mentors: Record<string, unknown> | null;
  description: string | null;
  issueDescription: string | null;
  projectPeopleGroupTarget: string | null;
  projectTarget: string | null;
  experienceOfProjects: Record<string, unknown> | null;
  perspectiveOfProject: string | null;
  projectState: string | null;
  teamId: number | null;
}
