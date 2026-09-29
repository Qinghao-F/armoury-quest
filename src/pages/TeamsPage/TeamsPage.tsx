import { ArrowRight, CalendarDays, CheckCircle2, ChevronDown, Clock3, FolderOpen, Plus, Shield, Target, UsersRound } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { teamsApi } from '../../api/queries';
import { demoLeaderboard } from '../../mocks/fixtures';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import styles from './TeamsPage.module.css';

const teamMembers = { 'Cybersecurity Study Group': ['AC', 'JT', 'MK', 'SL', 'RD'], 'UX Research Circle': ['AC', 'EP', 'LW', 'ND'] };

export function TeamsPage() {
  const teams = useQuery({ queryKey: ['teams'], queryFn: teamsApi.listTeams });
  const [range, setRange] = useState('This week');
  const [feedback, setFeedback] = useState('');
  if (teams.isLoading) return <div className="page"><EmptyState title="Loading teams" description="Preparing your collaboration space." /></div>;
  if (teams.isError || !teams.data) return <div className="page"><EmptyState title="Teams unavailable" description="Try again when the collaboration service is available." /></div>;
  const showFeedback = (message: string) => { setFeedback(message); window.setTimeout(() => setFeedback(''), 2200); };
  return <div className="page teamsPage">
    <header className={styles.teamsHeader}><h1>Teams</h1><p>Learn together, challenge yourself, and celebrate progress.</p></header>
    <div className={styles.topGrid}>
      <Card className={styles.myTeamsCard}><div className={styles.cardHeading}><h2>My teams <span><UsersRound size={17} /></span></h2><Button variant="secondary" onClick={() => showFeedback('Showing your team list.')}>View my teams</Button></div><div className={styles.teamList}>{teams.data.map((team) => <article className={styles.team} key={team.id}><span className={`${styles.teamBadge} ${team.id.includes('ux') ? styles.ux : ''}`}>{team.id.includes('ux') ? <UsersRound size={27} /> : <Shield size={27} />}</span><div className={styles.teamInfo}><h3>{team.name}</h3><p>{team.memberCount} members</p><div className={styles.memberRow}>{(teamMembers[team.name as keyof typeof teamMembers] ?? []).map((member, index) => <span key={`${member}-${index}`} className={styles.memberAvatar}>{member}</span>)}</div><span className={styles.projectName}><FolderOpen size={16} /> {team.id.includes('ux') ? 'UX Research' : 'Cybersecurity Module'}</span></div><div className={styles.challenge}><span className={styles.challengeIcon}><CalendarDays size={22} /></span><div><small>Upcoming team challenge</small><strong>5-question challenge</strong><p>{team.challenge}<br />Tomorrow, 10:00 AM</p></div><Button onClick={() => showFeedback(`Opening ${team.name}.`)}>Open team <ArrowRight size={17} /></Button></div></article>)}</div><button className={styles.joinTeam} type="button" onClick={() => showFeedback('Create or join a team is ready for the backend connection.')}><Plus size={24} /> <strong>Join or create a team</strong></button></Card>
      <Card className={styles.leaderboardCard}><div className={styles.cardHeading}><h2>Top 5 learners <span><UsersRound size={17} /></span></h2><label className={styles.selectWrap}><select value={range} onChange={(event) => setRange(event.target.value)}><option>This week</option><option>Last week</option><option>This month</option></select><ChevronDown size={16} /></label></div><div className={styles.leaderboard}>{demoLeaderboard.map((learner) => <div className={`${styles.learner} ${learner.initials === 'AC' ? styles.currentLearner : ''}`} key={learner.rank}><span className={styles.rank}>{learner.rank}</span><span className={styles.leaderAvatar} style={{ background: learner.color }}>{learner.initials}</span><div><strong>{learner.name}</strong><small>{learner.project}</small></div><div className={styles.points}><strong>{learner.points}</strong><small>points</small></div></div>)}</div><button className={styles.viewTop} type="button" onClick={() => showFeedback(`Viewing top learners for ${range.toLowerCase()}.`)}>View Top 5 <ArrowRight size={17} /></button></Card>
    </div>
    <Card className={styles.activityCard}><div className={styles.activityHeading}><h2>Your team activity <span><UsersRound size={17} /></span></h2></div><div className={styles.teamActivity}><div className={`${styles.activityMark} ${styles.challengeMark}`}><CalendarDays size={25} /></div><div className={styles.activityCopy}><small>UPCOMING CHALLENGE</small><strong>Cybersecurity Study Group</strong><p>5-question challenge — Threat recognition basics</p></div><div className={styles.activityMeta}><Clock3 size={21} /><div><strong>Tomorrow, 10:00 AM</strong><small>5 questions · Team challenge</small></div></div><Button onClick={() => showFeedback('Opening Cybersecurity Study Group.')}>Open team <ArrowRight size={17} /></Button></div><div className={styles.teamActivity}><div className={`${styles.activityMark} ${styles.resultMark}`}><Target size={25} /></div><div className={styles.activityCopy}><small>RECENT RESULT</small><strong>UX Research Circle</strong><p>Quiz 3 — User personas and journey mapping</p></div><div className={styles.activityMeta}><CheckCircle2 size={21} /><div><strong>Completed 2 days ago</strong><small>4/5 correct (80%) · Team result</small></div></div><Button onClick={() => showFeedback('Opening UX Research Circle.')}>Open team <ArrowRight size={17} /></Button></div></Card>
    {feedback && <div className={styles.toast} role="status">{feedback}</div>}
  </div>;
}
