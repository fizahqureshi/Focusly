import React from "react";
import styles from "./Timeline.module.css";

function Timeline({ tasks }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className={styles.wrapper}>
        <h3>Timeline</h3>
        <p style={{ color: "var(--text-secondary)", textAlign: "center" }}>
          No tasks yet.
        </p>
      </div>
    );
  }
  const tasksByDate = tasks.reduce((acc, task) => {
    const key = task.dueDate || new Date().toISOString().split("T")[0];
    if (!acc[key]) acc[key] = [];
    acc[key].push(task);
    return acc;
  }, {});

  const dates = Object.keys(tasksByDate).sort();

  return (
    <div className={styles.wrapper}>
      <h3>Timeline</h3>
      {dates.map((date) => (
        <div className={styles.dateGroup} key={date}>
          <div className={styles.dateHeader}>{date}</div>
          <ul className={styles.taskList}>
            {tasksByDate[date].map((task) => (
              <li key={task.id} className={task.completed ? styles.completed : ""}>
                {task.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
