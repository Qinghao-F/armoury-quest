import { assetPaths } from '../../assets/paths';
import styles from './ui.module.css';

export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className={styles.emptyState}><img src={assetPaths.mark} alt="" /><h2>{title}</h2><p>{description}</p></div>;
}
