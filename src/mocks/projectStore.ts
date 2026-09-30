import { projectSchema, type Project } from '../api/contracts';
import { cyberSecurityProject, demoProject } from './fixtures';

export const projectsChangedEvent = 'armoury-quest:projects-changed';
let createdProject: Project | null = null;

export function getCreatedProject(): Project | null {
  return createdProject;
}

export function listDemoProjects(): Project[] {
  const createdProject = getCreatedProject();
  return createdProject ? [demoProject, createdProject] : [demoProject];
}

export function getProjectById(projectId: string): Project | null {
  if (projectId === 'demo' || projectId === demoProject.id) return demoProject;
  if (projectId === cyberSecurityProject.id) return getCreatedProject() ?? null;
  return null;
}

export function createCyberSecurityProject(name = cyberSecurityProject.name): Project {
  const project = projectSchema.parse({
    ...cyberSecurityProject,
    name: name.trim() || cyberSecurityProject.name,
    materials: cyberSecurityProject.materials.map((material) => ({ ...material }))
  });
  createdProject = project;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(projectsChangedEvent));
  }
  return project;
}
