import { ArrowLeft, ArrowRight, Check, FileText, Minus, Plus } from 'lucide-react';
import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { demoProject } from '../../mocks/fixtures';
import { getProjectById } from '../../mocks/projectStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { assetPaths } from '../../assets/paths';
import styles from './QuizSetupPage.module.css';

export function QuizSetupPage() {
  const { projectId = 'demo' } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(projectId) ?? demoProject;
  const materials = project.materials;
  const [confidence, setConfidence] = useState(60);
  const [selected, setSelected] = useState<string[]>(materials.slice(0, 2).map((material) => material.id));
  const [feedback, setFeedback] = useState('');
  const allSelected = selected.length === materials.length;
  const confidenceLabel = confidence < 30 ? 'Not confident yet' : confidence < 70 ? 'Somewhat confident' : 'Very confident';
  const scopeText = useMemo(() => `${selected.length} PDF${selected.length === 1 ? '' : 's'}  •  5 questions`, [selected.length]);
  const toggleMaterial = (id: string) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const toggleAll = () => setSelected(allSelected ? [] : materials.map((material) => material.id));
  const generateQuiz = () => { if (!selected.length) { setFeedback('Select at least one PDF to generate a quiz.'); return; } navigate(`/projects/${projectId}/quiz/results`); };
  useEffect(() => setSelected(materials.slice(0, 2).map((material) => material.id)), [project.id]);

  return <div className="page quizSetupPage">
    <div className={styles.breadcrumbs}><Link to={`/projects/${projectId}`}>Projects</Link><span>›</span><Link to={`/projects/${projectId}`}>{project.name}</Link><span>›</span><strong>Quiz setup</strong></div>
    <header className={styles.setupHeader}><div><h1>Set up your quiz</h1><p>Choose what to practise and tell us how confident you feel.</p></div><span className={styles.stepPill}>Step 1 of 2 <i>•</i> Before you begin</span></header>
    <div className={styles.setupGrid}>
      <Card className={styles.confidenceCard}><h2>How confident are you with this<br />project’s material?</h2><p>This is your starting point. We will compare it with your quiz result.</p><div className={styles.sliderArea}><div className={styles.valueBubble} style={{ left: `${Math.min(Math.max(confidence, 11), 88)}%` }}>{confidence}% <span>— {confidenceLabel}</span></div><input aria-label="Confidence level" style={{ '--confidence': `${confidence}%` } as CSSProperties} type="range" min="0" max="100" step="5" value={confidence} onChange={(event) => setConfidence(Number(event.target.value))} /><div className={styles.sliderTicks}><span>0</span><span>25</span><span>50</span><span>75</span><span>100</span></div><div className={styles.sliderCaption}><span>Not confident yet</span><span>Very confident</span></div></div></Card>
      <Card className={styles.materialCard}><h2>Choose materials for this quiz</h2><p>Select one or more PDFs from {project.name}.</p><button className={styles.selectAll} type="button" onClick={toggleAll}><span className={`${styles.checkbox} ${allSelected ? styles.checked : selected.length ? styles.partial : ''}`}>{allSelected ? <Check size={16} /> : selected.length ? <Minus size={16} /> : null}</span><strong>Select all</strong><span>{selected.length} of {materials.length} documents selected</span></button><div className={styles.materialChoices}>{materials.map((material) => <label className={styles.materialChoice} key={material.id}><input type="checkbox" checked={selected.includes(material.id)} onChange={() => toggleMaterial(material.id)} /><span className={`${styles.checkbox} ${selected.includes(material.id) ? styles.checked : ''}`}>{selected.includes(material.id) && <Check size={16} />}</span><img src={assetPaths.pdf} alt="PDF" /><span className={styles.materialCopy}><strong>{material.name}</strong><small>{material.topic}</small></span><span className={styles.fileSize}>{material.size}</span></label>)}</div></Card>
    </div>
    <Card className={styles.setupFooter}><div className={styles.scope}><span className={styles.scopeIcon}><FileText size={28} /></span><div><strong>Quiz scope</strong><p>{scopeText}</p></div></div><div className={styles.footerActions}><Button variant="secondary" onClick={() => navigate(`/projects/${projectId}`)}><ArrowLeft size={18} /> Back to project</Button><Button onClick={generateQuiz}>Generate quiz <ArrowRight size={19} /></Button></div></Card>
    {feedback && <div className={styles.toast} role="status">{feedback}</div>}
  </div>;
}
