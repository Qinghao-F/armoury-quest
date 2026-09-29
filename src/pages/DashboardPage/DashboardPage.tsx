import { ArrowUpRight, CalendarDays, ChevronDown, ChevronRight, Info, MessageCircle, Pencil, ShieldCheck, SquareCheckBig, Target } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useState, type CSSProperties } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { dashboardApi } from '../../api/queries';
import { demoRecentActivity, demoReviewItems, demoSkills } from '../../mocks/fixtures';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import styles from './DashboardPage.module.css';

const activityIcons = { ask: MessageCircle, quiz: SquareCheckBig, quest: Target };
const practiceByRange = { 'Last 4 weeks': [2, 4, 7, 9], 'Last 3 months': [4, 8, 11, 14], 'This year': [7, 10, 14, 18] };

function Donut({ value }: { value: number }) {
  return <div className={styles.donut} style={{ '--value': `${value * 3.6}deg` } as CSSProperties}><span>{value}%</span></div>;
}

export function DashboardPage() {
  const summary = useQuery({ queryKey: ['dashboard'], queryFn: dashboardApi.getSummary });
  const [range, setRange] = useState<keyof typeof practiceByRange>('Last 4 weeks');
  const [feedback, setFeedback] = useState('');
  if (summary.isLoading) return <div className="page"><EmptyState title="Loading dashboard" description="Preparing your learning summary." /></div>;
  if (summary.isError || !summary.data) return <div className="page"><EmptyState title="Dashboard unavailable" description="Try again when the learning service is available." /></div>;
  const data = summary.data;
  const practiceData = practiceByRange[range].map((value, index) => ({ week: `Week ${index + 1}`, activities: value }));
  const showFeedback = (message: string) => { setFeedback(message); window.setTimeout(() => setFeedback(''), 2200); };

  return <div className="page dashboardPage">
    <header className={styles.dashboardHeader}><div><h1>Your learning dashboard</h1><p>Track your progress and build real-world skills.</p></div></header>

    <Card className={styles.profileCard}>
      <div className={styles.profileIdentity}><span className={styles.profileAvatar}>AC</span><div><h2>{data.learnerName}</h2><p>{data.role}</p><Badge tone="primary">Beginner</Badge></div></div>
      <div className={styles.goal}><span className={styles.goalIcon}><Target size={25} /></span><div><strong>Learning goal</strong><p>Build practical cybersecurity skills<br />to stay safe at work and beyond.</p></div><Button variant="secondary" onClick={() => showFeedback('Profile editing is ready for the next step.')}><Pencil size={16} /> Edit profile</Button></div>
    </Card>

    <div className={styles.analyticsGrid}>
      <Card className={styles.chartCard}><div className={styles.chartHeading}><div><h2>Skill proficiency <Info size={16} /></h2></div><div className={styles.legend}><span><i className={styles.currentDot} />Current level</span><span><i className={styles.targetDot} />Target level</span></div></div><div className={styles.radarWrap}><ResponsiveContainer width="100%" height="100%"><RadarChart cx="50%" cy="51%" outerRadius="67%" data={demoSkills}><PolarGrid stroke="#d4d9df" /><PolarAngleAxis dataKey="label" tick={{ fill: '#536582', fontSize: 13 }} /><PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} /><Radar name="Target level" dataKey="target" stroke="#cdd1d4" fill="#dfe2e3" fillOpacity={0.45} isAnimationActive={false} /><Radar name="Current level" dataKey="value" stroke="#ffb90b" fill="#ffc62f" fillOpacity={0.52} isAnimationActive={false} /></RadarChart></ResponsiveContainer></div></Card>
      <Card className={styles.chartCard}><div className={styles.chartHeading}><h2>Practice activity <Info size={16} /></h2><label className={styles.selectWrap}><select value={range} onChange={(event) => setRange(event.target.value as keyof typeof practiceByRange)}><option>Last 4 weeks</option><option>Last 3 months</option><option>This year</option></select><ChevronDown size={16} /></label></div><div className={styles.barWrap}><ResponsiveContainer width="100%" height="100%"><BarChart data={practiceData} margin={{ top: 14, right: 6, left: -20, bottom: 0 }}><CartesianGrid vertical={false} stroke="#e3e2de" /><XAxis dataKey="week" tick={{ fill: '#536582', fontSize: 13 }} axisLine={{ stroke: '#d9dbe0' }} tickLine={false} /><YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} tick={{ fill: '#536582', fontSize: 12 }} axisLine={{ stroke: '#d9dbe0' }} tickLine={false} /><Tooltip cursor={{ fill: 'rgba(255,208,71,.08)' }} contentStyle={{ borderRadius: 10, border: '1px solid #ebe9e1', fontFamily: 'Inter' }} /><Bar dataKey="activities" fill="#ffc52f" radius={[5, 5, 0, 0]} barSize={72} isAnimationActive={false} /></BarChart></ResponsiveContainer></div><div className={styles.activityStat}><span className={styles.sectionIcon}><ShieldCheck size={25} /></span><div><strong>12</strong><small>Practice activities</small></div><div className={styles.activityGrowth}><ArrowUpRight size={20} /> <strong>33%</strong><small>vs. previous 4 weeks</small></div></div></Card>
    </div>

    <div className={styles.lowerGrid}>
      <Card className={styles.masteryCard}><h2>Concepts mastered</h2><div className={styles.masteryContent}><Donut value={data.overallMastery} /><div><strong>{data.conceptsMastered} of {data.conceptsTotal} concepts</strong><div className={styles.masteryBar}><span style={{ width: `${data.overallMastery}%` }} /></div><p>Keep going! You’re on track.</p></div></div></Card>
      <Card className={styles.reviewCard}><div className={styles.cardHeading}><h2>Review due <Info size={16} /></h2><Button variant="secondary" onClick={() => showFeedback('Showing all review items.')}>View all</Button></div><div className={styles.reviewList}>{demoReviewItems.map((item) => <button key={item.title} className={styles.reviewItem} type="button" onClick={() => showFeedback(`Opening ${item.title}.`)}><span className={`${styles.calendarIcon} ${styles[item.tone]}`}><CalendarDays size={18} /></span><span>{item.title}</span><strong>{item.due}</strong><ChevronRight size={18} /></button>)}</div></Card>
    </div>

    <Card className={styles.recentCard}><div className={styles.cardHeading}><h2>Recent activity</h2><Button variant="secondary" onClick={() => showFeedback('Showing your complete activity history.')}>View all</Button></div><div className={styles.activityList}>{demoRecentActivity.map((activity) => { const Icon = activityIcons[activity.type as keyof typeof activityIcons]; return <button className={styles.activityItem} key={activity.detail} type="button" onClick={() => showFeedback(`Opening: ${activity.detail}`)}><span className={`${styles.activityIcon} ${styles[activity.type]}`}><Icon size={21} /></span><strong>{activity.label}</strong><span className={styles.activityDetail}>{activity.detail}</span><span className={styles.activityTime}>{activity.time}</span><ChevronRight size={17} /></button>; })}</div></Card>
    {feedback && <div className={styles.toast} role="status">{feedback}</div>}
  </div>;
}
