import React, { useState, useEffect } from "react";
import styles from "./TaskForm.module.css";

function TaskForm({ addTask, editingTask, updateTask, cancelEdit }) {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setText(editingTask.text || "");
      setDueDate(editingTask.dueDate || "");
    } else {
      setText("");
      setDueDate("");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (editingTask) {
      updateTask(editingTask.id, { text: text.trim(), dueDate: dueDate || null });
    } else {
      addTask({ text: text.trim(), dueDate: dueDate || null });
    }
    setText("");
    setDueDate("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        className={styles.dateInput}
        type="date"
        value={dueDate || ""}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <div className={styles.buttons}>
        {editingTask && (
          <button type="button" className={styles.cancelBtn} onClick={cancelEdit}>
            Cancel
          </button>
        )}
        <button type="submit" className={styles.addBtn}>
          {editingTask ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
