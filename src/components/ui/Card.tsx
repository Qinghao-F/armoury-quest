import type { HTMLAttributes, PropsWithChildren } from 'react';
import styles from './ui.module.css';

export function Card({ children, className = '', ...props }: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return <section className={`${styles.card} ${className}`} {...props}>{children}</section>;
}

export function CardHeader({ children, className = '', ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return <div className={`${styles.cardHeader} ${className}`} {...props}>{children}</div>;
}
