import type { DashboardSummary, Project, Team } from '../api/contracts';

export const demoProject: Project = {
  id: 'demo',
  name: 'Cybersecurity Module',
  description: 'Learn and apply what is in your materials.',
  materialCount: 3,
  progress: 68
};

export const demoMaterials = [
  { id: 'module-1', name: 'Module 1.pdf', size: '4.2 MB', topic: 'Introduction to threats' },
  { id: 'module-2', name: 'Module 2.pdf', size: '2.4 MB', topic: 'Phishing and social engineering' },
  { id: 'workshop-notes', name: 'Workshop Notes.pdf', size: '5.8 MB', topic: 'Practice examples' }
];

export const demoDashboard: DashboardSummary = {
  learnerName: 'Amanda Chen',
  role: 'Interaction Designer',
  overallMastery: 68,
  conceptsMastered: 34,
  conceptsTotal: 50,
  practiceActivities: 12
};

export const demoSkills = [
  { label: 'Threat recognition', value: 68, target: 82 },
  { label: 'Authentication & access control', value: 58, target: 78 },
  { label: 'Data protection', value: 76, target: 86 },
  { label: 'Incident response', value: 72, target: 84 },
  { label: 'Security awareness', value: 61, target: 80 }
];

export const demoReviewItems = [
  { title: 'Multi-factor authentication', due: 'Today', tone: 'today' },
  { title: 'Social engineering', due: 'Tomorrow', tone: 'tomorrow' },
  { title: 'Incident response basics', due: 'In 3 days', tone: 'later' }
];

export const demoRecentActivity = [
  { type: 'ask', label: 'You asked a question', detail: 'What are common signs of a phishing email?', time: '2 hours ago' },
  { type: 'quiz', label: 'You completed a quiz', detail: 'Quiz 2 – Authentication and Access Control', time: '1 day ago' },
  { type: 'quest', label: 'You completed a quest', detail: 'Identify phishing attempts in realistic scenarios', time: '2 days ago' }
];

export const demoQuestions = [
  {
    id: 1,
    question: 'What is the main goal of phishing?',
    answer: 'To trick people into revealing information or taking an unsafe action.',
    reference: 'To deceive people into sharing sensitive information or clicking malicious links.',
    correct: true,
    why: 'Phishing relies on social engineering to make a harmful request feel trustworthy.',
    source: 'Module 2.pdf · p. 4'
  },
  {
    id: 2,
    question: 'Which action is safest when you receive a suspicious email?',
    answer: 'Report it through the organisation’s security channel.',
    reference: 'Verify the request through a trusted channel before taking action.',
    correct: true,
    why: 'Using a separate, trusted channel prevents an attacker from controlling the conversation.',
    source: 'Module 2.pdf · p. 6'
  },
  {
    id: 3,
    question: 'Which detail is the strongest reason to question this sign-in email?',
    answer: 'It uses the company logo',
    reference: 'The link leads to a domain that does not match the organisation.',
    correct: false,
    why: 'Attackers often copy company logos to look legitimate. The destination domain is a stronger indicator.',
    source: 'Module 2.pdf · p. 8'
  },
  {
    id: 4,
    question: 'What does multi-factor authentication (MFA) add?',
    answer: 'An additional proof of identity beyond a password.',
    reference: 'A second or additional verification factor beyond a password.',
    correct: true,
    why: 'MFA reduces the impact of a stolen password by requiring another factor.',
    source: 'Module 1.pdf · p. 12'
  },
  {
    id: 5,
    question: 'Which information should you avoid sharing?',
    answer: 'Passwords and one-time authentication codes.',
    reference: 'Passwords, one-time codes and other sensitive credentials.',
    correct: true,
    why: 'Credentials can give an attacker direct access to your accounts and systems.',
    source: 'Module 1.pdf · p. 15'
  }
];

export const demoLeaderboard = [
  { rank: 1, initials: 'JT', name: 'Jamie Tan', project: 'Cybersecurity Module', points: 920, color: '#cce8ff' },
  { rank: 2, initials: 'MK', name: 'Maya Kim', project: 'UX Research', points: 780, color: '#ded7ff' },
  { rank: 3, initials: 'SL', name: 'Sam Lee', project: 'Cybersecurity Module', points: 640, color: '#b9efde' },
  { rank: 4, initials: 'AC', name: 'Amanda Chen', project: 'Cybersecurity Module', points: 520, color: '#ffe38d' },
  { rank: 5, initials: 'RD', name: 'Riley Davis', project: 'UX Research', points: 430, color: '#f9c3d5' }
];

export const demoTeams: Team[] = [
  { id: 'cybersecurity-study-group', name: 'Cybersecurity Study Group', memberCount: 5, challenge: 'Threat recognition basics' },
  { id: 'ux-research-circle', name: 'UX Research Circle', memberCount: 4, challenge: 'User interviews and insights' }
];
