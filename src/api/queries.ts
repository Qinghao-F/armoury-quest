import { dashboardSchema, projectSchema, teamSchema, type DashboardSummary, type Project, type Team } from './contracts';
import { getJson } from './client';
import { demoDashboard, demoProject, demoTeams } from '../mocks/fixtures';

const useMocks = import.meta.env.VITE_USE_MOCKS !== 'false';

function delay<T>(value: T, ms = 160) {
  return new Promise<T>((resolve) => window.setTimeout(() => resolve(value), ms));
}

export const projectApi = {
  async getProject(projectId: string): Promise<Project> {
    if (useMocks) return delay(projectSchema.parse({ ...demoProject, id: projectId }));
    return projectSchema.parse(await getJson(`/projects/${projectId}`));
  }
};

export const dashboardApi = {
  async getSummary(): Promise<DashboardSummary> {
    if (useMocks) return delay(dashboardSchema.parse(demoDashboard));
    return dashboardSchema.parse(await getJson('/dashboard'));
  }
};

export const teamsApi = {
  async listTeams(): Promise<Team[]> {
    if (useMocks) return delay(teamSchema.array().parse(demoTeams));
    return teamSchema.array().parse(await getJson('/teams'));
  }
};
