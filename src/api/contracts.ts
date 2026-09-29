import { z } from 'zod';

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  materialCount: z.number(),
  progress: z.number().min(0).max(100)
});

export const dashboardSchema = z.object({
  learnerName: z.string(),
  role: z.string(),
  overallMastery: z.number().min(0).max(100),
  conceptsMastered: z.number(),
  conceptsTotal: z.number(),
  practiceActivities: z.number()
});

export const teamSchema = z.object({
  id: z.string(),
  name: z.string(),
  memberCount: z.number(),
  challenge: z.string()
});

export type Project = z.infer<typeof projectSchema>;
export type DashboardSummary = z.infer<typeof dashboardSchema>;
export type Team = z.infer<typeof teamSchema>;
