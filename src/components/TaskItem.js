import React from "react";
import { Edit2, Trash2 } from "lucide-react"; 
import styles from "./TaskItem.module.css";

function TaskItem({ task, toggleComplete, deleteTask, startEdit }) {
  const formatDate = (d) => {
    if (!d) return "";
    try {
      const dt = new Date(d);
      return dt.toLocaleDateString();
    } catch {
      return d;
    }
  };

  return (
    <div className={`${styles.card} ${task.completed ? styles.completed : ""}`}>
      <div className={styles.left}>
        <input
          type="checkbox"
          checked={!!task.completed}
          onChange={() => toggleComplete(task.id)}
        />
        <div className={styles.info}>
          <div className={styles.text}>{task.text}</div>
          {task.dueDate && <div className={styles.date}>Due: {formatDate(task.dueDate)}</div>}
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.edit} onClick={() => startEdit(task)}>
          <Edit2 size={18} /> 
        </button>
        <button className={styles.del} onClick={() => deleteTask(task.id)}>
          <Trash2 size={18} /> 
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
