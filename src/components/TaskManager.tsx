import React, { useState } from "react";
import "./TaskManager.css";
import useTaskManager from "./UseTaskManager";

export const TaskManager: React.FC = () => {
  const {
    addTask,
    completeTask,
    updateTask,
    filteredTasks,
    setSearchKeyword,
  } = useTaskManager();

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(ev.target.value);
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() !== "") {
      addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search Task"
        />
      </div>

      <div className="task">
        <input
          type="text"
          placeholder="Add new task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul className="container">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                value={task.title}
                onChange={(e) => updateTask(task.id, { title: e.target.value })}
              />
              <button onClick={() => completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
