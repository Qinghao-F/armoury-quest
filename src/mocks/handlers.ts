import { http, HttpResponse } from 'msw';
import { demoDashboard, demoProject, demoTeams } from './fixtures';

export const handlers = [
  http.get('/api/projects/:projectId', ({ params }) => {
    return HttpResponse.json({ ...demoProject, id: String(params.projectId) });
  }),
  http.get('/api/dashboard', () => HttpResponse.json(demoDashboard)),
  http.get('/api/teams', () => HttpResponse.json(demoTeams))
];
