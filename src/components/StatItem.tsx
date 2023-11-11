import { ReactNode } from 'react'
import styles from './stat-item.module.css'

type StatItemProps = {
  count: string;
  title: string;
  icon: ReactNode;
  type: string;
};
const StatItem = ({ count, title, icon, type}: StatItemProps) => {
  let sArticle = styles.articlePrimary;
  let sCount = styles.countPrimary;
  let sIcon = styles.iconPrimary;
  if (type === 'secondary') {
    sArticle = styles.articleSecondary;
    sCount = styles.countSecondary;
    sIcon = styles.iconSecondary;
  }
  if (type === "ternary") {
    sArticle = styles.articleTernary;
    sCount = styles.countTernary;
    sIcon = styles.iconTernary;
  }
  return (
    <article className={sArticle}>
      <header className={styles.header}>
        <span className={sCount}>{count}</span>
        <span className={sIcon}>{icon}</span>
      </header>
      <h5 className={styles.title}>{title}</h5>
    </article>
  );
};

export default StatItem