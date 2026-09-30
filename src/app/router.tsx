import { createHashRouter, Navigate } from 'react-router-dom';
import { AppShell } from '../layouts/AppShell/AppShell';
import { DashboardPage } from '../pages/DashboardPage/DashboardPage';
import { ProjectPage } from '../pages/ProjectPage/ProjectPage';
import { TeamsPage } from '../pages/TeamsPage/TeamsPage';
import { QuizSetupPage } from '../pages/QuizSetupPage/QuizSetupPage';
import { QuizResultsPage } from '../pages/QuizResultsPage/QuizResultsPage';
import { PlaceholderPage } from '../pages/PlaceholderPage/PlaceholderPage';

// Hash routes make every screen refresh-safe on GitHub Pages, which has no
// server-side SPA fallback for nested paths.
export const router = createHashRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <Navigate to="/projects/ux-research" replace /> },
      { path: '/projects/:projectId', element: <ProjectPage /> },
      { path: '/projects/:projectId/ask', element: <PlaceholderPage title="Ask" description="Get clear answers from your study materials." /> },
      { path: '/projects/:projectId/quiz/setup', element: <QuizSetupPage /> },
      { path: '/projects/:projectId/quiz/results', element: <QuizResultsPage /> },
      { path: '/projects/:projectId/quest', element: <PlaceholderPage title="Quest" description="Apply your knowledge in realistic scenarios." /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/teams', element: <TeamsPage /> }
    ]
  }
]);
