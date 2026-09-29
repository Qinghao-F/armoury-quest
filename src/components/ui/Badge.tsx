import type { HTMLAttributes, PropsWithChildren } from 'react';
import styles from './ui.module.css';

type BadgeProps = PropsWithChildren<HTMLAttributes<HTMLSpanElement>> & { tone?: 'neutral' | 'primary' | 'success' };

export function Badge({ children, tone = 'neutral', className = '', ...props }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[`badge${tone[0].toUpperCase()}${tone.slice(1)}`]} ${className}`} {...props}>{children}</span>;
}
