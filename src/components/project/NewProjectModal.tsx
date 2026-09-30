import { Check, FileText, LoaderCircle, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { assetPaths } from '../../assets/paths';
import { createCyberSecurityProject } from '../../mocks/projectStore';
import { Button } from '../ui/Button';
import styles from './NewProjectModal.module.css';

type NewProjectModalProps = {
  onClose: () => void;
  onCreated: (projectId: string) => void;
};

export function NewProjectModal({ onClose, onCreated }: NewProjectModalProps) {
  const [projectName, setProjectName] = useState('Cybersecurity Module');
  const [creating, setCreating] = useState(false);

  const createProject = () => {
    if (!projectName.trim()) return;
    setCreating(true);
    window.setTimeout(() => {
      const project = createCyberSecurityProject(projectName);
      onCreated(project.id);
    }, 650);
  };

  return <div className={styles.backdrop} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="new-project-title">
      <button className={styles.close} type="button" aria-label="Close new project dialog" onClick={onClose}><X size={20} /></button>
      <span className={styles.eyebrow}><Plus size={16} /> New project</span>
      <h2 id="new-project-title">Create a learning project</h2>
      <p className={styles.intro}>Start with a course PDF and we’ll prepare a workspace for practice.</p>
      <label className={styles.field}>
        <span>Project name</span>
        <input value={projectName} onChange={(event) => setProjectName(event.target.value)} autoFocus />
      </label>
      <div className={styles.fileBlock}>
        <div className={styles.fileIcon}><img src={assetPaths.pdf} alt="PDF" /></div>
        <div className={styles.fileCopy}><strong>Untapped Sample Content Genius Armoury Module 2 Hackathon.pdf</strong><small>Sample PDF · 4.0 MB · 31 pages</small></div>
        <Check size={20} className={styles.fileCheck} />
      </div>
      <p className={styles.note}><FileText size={16} /> Demo mode uses a prepared sample file record. PDF parsing will connect to the backend later.</p>
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onClose} disabled={creating}>Cancel</Button>
        <Button onClick={createProject} disabled={!projectName.trim() || creating}>{creating ? <><LoaderCircle className={styles.spinner} size={18} /> Creating…</> : <>Create project <Plus size={18} /></>}</Button>
      </div>
    </section>
  </div>;
}
