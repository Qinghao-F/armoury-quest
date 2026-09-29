import { ArrowRight, BarChart3, Check, CheckCircle2, FileText, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { demoQuestions } from '../../mocks/fixtures';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import styles from './QuizResultsPage.module.css';

export function QuizResultsPage() {
  const { projectId = 'demo' } = useParams();
  const [selectedId, setSelectedId] = useState(3);
  const [saved, setSaved] = useState(false);
  const questionIndex = demoQuestions.findIndex((question) => question.id === selectedId);
  const question = demoQuestions[questionIndex] ?? demoQuestions[0];
  const nextQuestion = () => setSelectedId(demoQuestions[(questionIndex + 1) % demoQuestions.length].id);
  return <div className="page quizResultsPage">
    <div className={styles.breadcrumbs}><Link to={`/projects/${projectId}`}>Projects</Link><span>›</span><Link to={`/projects/${projectId}`}>Cybersecurity Module</Link><span>›</span><strong>Quiz results</strong></div>
    <header className={styles.resultsHeader}><h1>Review answers &amp; sources</h1><p>Check each answer against your course materials.</p></header>
    <Card className={styles.summaryCard}><span className={styles.summaryIcon}><BarChart3 size={29} /></span><div><strong>Quiz complete <i>•</i> 4 of 5 correct</strong><p>You’re on the right track! Review the questions below to build on your understanding.</p></div><span className={styles.confidence}>Before quiz: <strong>60% confident</strong></span></Card>
    <div className={styles.resultsGrid}>
      <Card className={styles.questionListCard}><div className={styles.questionListHeader}><h2>Questions</h2><strong>4 of 5 correct</strong></div><div className={styles.questionList}>{demoQuestions.map((item) => <button key={item.id} type="button" className={`${styles.questionItem} ${item.id === selectedId ? styles.selected : ''}`} onClick={() => { setSelectedId(item.id); setSaved(false); }}><span className={styles.questionNumber}>{item.id}</span><span className={styles.questionText}>{item.question}</span><span className={`${styles.resultBadge} ${item.correct ? styles.correct : styles.incorrect}`}>{item.correct ? <CheckCircle2 size={17} /> : <X size={17} />}{item.correct ? 'Correct' : 'Incorrect'}</span></button>)}</div></Card>
      <Card className={styles.detailCard}><div className={styles.detailLabel}>Question {question.id} of {demoQuestions.length}</div><h2>{question.question}</h2><div className={`${styles.answerBox} ${styles.yourAnswer}`}><div><strong>Your answer</strong><p>{question.answer}</p></div><span>{question.correct ? <CheckCircle2 size={23} /> : <X size={23} />}{question.correct ? 'Correct' : 'Incorrect'}</span></div><div className={`${styles.answerBox} ${styles.referenceAnswer}`}><div><strong>Reference answer</strong><p>{question.reference}</p></div><span><Check size={22} /></span></div><div className={styles.why}><h3>Why it matters</h3><p>{question.why}</p><Link to="#source" className={styles.source}><FileText size={18} />{question.source}<ArrowRight size={16} /></Link></div><div className={styles.detailActions}><Button variant="secondary" className={saved ? styles.saved : ''} onClick={() => setSaved((current) => !current)}>{saved ? <Check size={19} /> : <Plus size={20} />} {saved ? 'Added to mistake book' : 'Add to mistake book'}</Button><Button onClick={nextQuestion}>Review next question <ArrowRight size={19} /></Button></div></Card>
    </div>
  </div>;
}
