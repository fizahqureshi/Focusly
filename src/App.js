 import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Progress from "./components/Progress";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import Timeline from "./components/Timeline";
import Motivation from "./components/Motivation";
import "./index.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem("tasks_v1");
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [ ];
  });

  const [editingTask, setEditingTask] = useState(null);
  const [showMotivation, setShowMotivation] = useState(false);
  const [motivationMessage, setMotivationMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks_v1", JSON.stringify(tasks));
  }, [tasks]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const addTask = ({ text, dueDate }) => {
    const newTask = {
      id: Date.now(),
      text: text.trim(),
      dueDate: dueDate || null,
      completed: false,
    };
    setTasks((p) => [...p, newTask]);
  };

  const updateTask = (id, updates) => {
    setTasks((p) => p.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    setEditingTask(null);
  };

  const cancelEdit = () => setEditingTask(null);

  const startEdit = (task) => setEditingTask(task);

  const toggleComplete = (id) => {
    setTasks((p) =>
      p.map((t) => {
        if (t.id === id) {
          const updated = { ...t, completed: !t.completed };
          if (updated.completed) {
            setMotivationMessage("Keep it up! Buddy You completed a task ");
            setShowMotivation(true);
            setTimeout(() => setShowMotivation(false), 2500);
          }
          return updated;
        }
        return t;
      })
    );
  };

  const deleteTask = (id) => setTasks((p) => p.filter((t) => t.id !== id));

  return (
    <div className={`app ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} appName="FOCUSLy" />

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "1rem" }}>
        <Progress tasks={tasks} />

        <TaskForm
          addTask={addTask}
          editingTask={editingTask}
          updateTask={updateTask}
          cancelEdit={cancelEdit}
        />

        <div style={{ marginTop: 16 }}>
          {tasks.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>
              No tasks yet
            </p>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                toggleComplete={toggleComplete}
                deleteTask={deleteTask}
                startEdit={startEdit}
              />
            ))
          )}
        </div>

        <div style={{ marginTop: 24 }}>
          <Timeline tasks={tasks} />
        </div>
      </main>

      <Motivation show={showMotivation} message={motivationMessage} />
    </div>
  );
}

export default App;
