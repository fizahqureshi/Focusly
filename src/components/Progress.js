 import { TrendingUp } from "lucide-react";
import styles from "./Progress.module.css";

const Progress = ({ tasks }) => {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <TrendingUp color="var(--accent)" />
        <h3 className={styles.title}>Progress Overview</h3>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.number}>{percent}%</div>
          <div>Completed</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.number}>{completed}</div>
          <div>Finished</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.number}>{total - completed}</div>
          <div>Remaining</div>
        </div>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};

export default Progress;
