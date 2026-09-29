import { ArrowRight, CalendarDays, FileText, MessageCircle, MoreHorizontal, Plus, SquareCheckBig, Target, Upload } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { useState, type CSSProperties } from 'react';
import { projectApi } from '../../api/queries';
import { demoMaterials } from '../../mocks/fixtures';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { assetPaths } from '../../assets/paths';
import styles from './ProjectPage.module.css';

const actionCards = [
  { title: 'Ask', description: 'Get clear answers from your study materials.', label: 'Ask a question', to: '/projects/demo/ask', icon: MessageCircle, className: 'ask' },
  { title: 'Quiz', description: 'Check your understanding with quick quizzes.', label: 'Start quiz', to: '/projects/demo/quiz/setup', icon: SquareCheckBig, className: 'quiz' },
  { title: 'Quest', description: 'Apply your knowledge in realistic scenarios.', label: 'Start quest', to: '/projects/demo/quest', icon: Target, className: 'quest' }
];

export function ProjectPage() {
  const { projectId = 'demo' } = useParams();
  const project = useQuery({ queryKey: ['project', projectId], queryFn: () => projectApi.getProject(projectId) });
  const [feedback, setFeedback] = useState('');

  if (project.isLoading) return <div className="page"><EmptyState title="Loading project" description="Preparing your learning workspace." /></div>;
  if (project.isError || !project.data) return <div className="page"><EmptyState title="Project unavailable" description="The project could not be loaded." /></div>;

  const data = project.data;
  const showFeedback = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(''), 2400);
  };

  return (
    <div className="page projectPage">
      <header className={styles.projectHeader}>
        <div>
          <div className={styles.breadcrumbs}><span>Projects</span><span>›</span><strong>{data.name}</strong></div>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
        </div>
        <Card className={styles.progressCard}>
          <div className={styles.progressRing} style={{ '--progress': `${data.progress}%` } as CSSProperties}><strong>{data.progress}%</strong></div>
          <div><h2>Project progress</h2><div className={styles.progressBar}><span style={{ width: `${data.progress}%` }} /></div><p>4 of 6 activities complete</p></div>
        </Card>
      </header>

      <Card className={styles.materialsCard}>
        <div className={styles.materialsHeading}>
          <div className={styles.sectionTitle}><span className={styles.sectionIcon}><FileText size={26} /></span><div><h2>Project materials</h2><p>{data.materialCount} files uploaded <span>•</span> 12.4 MB</p></div></div>
          <div className={styles.materialActions}><Button variant="dark" onClick={() => showFeedback('Upload flow is ready for the backend connection.')}><Upload size={18} /> Upload from computer</Button><button className={styles.moreButton} type="button" aria-label="More material actions"><MoreHorizontal size={22} /></button></div>
        </div>
        <div className={styles.materialList}>
          {demoMaterials.map((material) => <article className={styles.material} key={material.id}><div className={styles.materialTop}><img src={assetPaths.pdf} alt="PDF" /><MoreHorizontal size={20} /></div><strong>{material.name}</strong><span>{material.size}</span></article>)}
          <button className={styles.addMaterial} type="button" onClick={() => showFeedback('Add material is ready for the backend connection.')}><span><Plus size={28} /></span><strong>Add material</strong></button>
        </div>
      </Card>

      <div className={styles.moduleGrid}>
        {actionCards.map(({ title, description, label, to, icon: Icon, className }) => <Card className={`${styles.moduleCard} ${styles[className]}`} key={title}>
          <span className={styles.moduleIcon}><Icon size={32} strokeWidth={2.2} /></span><h2>{title}</h2><p>{description}</p><Link to={to} className={styles.moduleLink}>{label}<ArrowRight size={19} /></Link>
        </Card>)}
      </div>

      <Card className={styles.continueCard}>
        <div className={styles.continueLead}><span className={styles.sectionIcon}><FileText size={25} /></span><div><h2>Continue learning</h2><p>Complete Quiz 2 based on Module 2</p></div></div>
        <div className={styles.continueDue}><span className={styles.sectionIcon}><CalendarDays size={24} /></span><div><strong>Due in 3 days</strong><p>Last activity: 2 Jan 2025</p></div></div>
        <Button onClick={() => showFeedback('Continuing your latest quiz.')}><span>Continue</span><ArrowRight size={19} /></Button>
      </Card>
      {feedback && <div className={styles.toast} role="status">{feedback}</div>}
    </div>
  );
}
