import { PackageOpen } from 'lucide-react';
import styles from './ui.module.css';

export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className={styles.emptyState}><PackageOpen size={28} /><h2>{title}</h2><p>{description}</p></div>;
}
