import { IProject, ProjectServer } from '../entities/project';

export class ProjectModel implements IProject {
  readonly id: number;
  readonly authorId: number | null;
  readonly creationTimeUnix: number | null;
  readonly name: string | null;
  readonly category: string | null;
  readonly region: string | null;
  readonly logo: string | null;
  readonly contactInfo: string | null;
  readonly projectScale: string | null;
  readonly projectStartTime: string | null;
  readonly projectEndTime: string | null;
  readonly videoPreview: string | null;
  readonly roles: Record<string, unknown> | null;
  readonly mentors: Record<string, unknown> | null;
  readonly description: string | null;
  readonly issueDescription: string | null;
  readonly projectPeopleGroupTarget: string | null;
  readonly projectTarget: string | null;
  readonly experienceOfProjects: Record<string, unknown> | null;
  readonly perspectiveOfProject: string | null;
  readonly projectState: string | null;
  readonly teamId: number | null;

  constructor({
    id,
    authorId,
    creationTimeUnix,
    name,
    category,
    region,
    logo,
    contactInfo,
    projectScale,
    projectStartTime,
    projectEndTime,
    videoPreview,
    roles,
    mentors,
    description,
    issueDescription,
    projectPeopleGroupTarget,
    projectTarget,
    experienceOfProjects,
    perspectiveOfProject,
    projectState,
    teamId,
  }: IProject) {
    this.id = id;
    this.authorId = authorId;
    this.creationTimeUnix = creationTimeUnix;
    this.name = name;
    this.category = category;
    this.region = region;
    this.logo = logo;
    this.contactInfo = contactInfo;
    this.projectScale = projectScale;
    this.projectStartTime = projectStartTime;
    this.projectEndTime = projectEndTime;
    this.videoPreview = videoPreview;
    this.roles = roles;
    this.mentors = mentors;
    this.description = description;
    this.issueDescription = issueDescription;
    this.projectPeopleGroupTarget = projectPeopleGroupTarget;
    this.projectTarget = projectTarget;
    this.experienceOfProjects = experienceOfProjects;
    this.perspectiveOfProject = perspectiveOfProject;
    this.projectState = projectState;
    this.teamId = teamId;
  }

  public static normalizeJson(serverData: ProjectServer): ProjectModel {
    return new ProjectModel({
      id: serverData.id,
      authorId: serverData.author_id,
      creationTimeUnix: serverData.creation_time_unix,
      name: serverData.name,
      category: serverData.category,
      region: serverData.region,
      logo: serverData.logo,
      contactInfo: serverData.contact_info,
      projectScale: serverData.project_scale,
      projectStartTime: serverData.project_start_time,
      projectEndTime: serverData.project_end_time,
      videoPreview: serverData.video_preview,
      roles: serverData.roles,
      mentors: serverData.mentors,
      description: serverData.description,
      issueDescription: serverData.issue_description,
      projectPeopleGroupTarget: serverData.project_people_group_target,
      projectTarget: serverData.project_target,
      experienceOfProjects: serverData.expireance_of_projects,
      perspectiveOfProject: serverData.perspective_of_project,
      projectState: serverData.project_state,
      teamId: serverData.team_id,
    });
  }
}
