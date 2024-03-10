import { nanoid } from "nanoid";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
}

interface UseTaskManagerReturn {
  tasks: Task[];
  addTask: (title: string) => void;
  completeTask: (id: string) => void;
  updateTask: (id: string, taskUpdate: Partial<Task>) => void;
  filteredTasks: Task[];
  setSearchKeyword: (keyword: string) => void;
}

const useTaskManager = (): UseTaskManagerReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const addTask = (title: string) => {
    if (title.length < 1) {
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      title,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const completeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, taskUpdate: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...taskUpdate } : task))
    );
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return {
    tasks,
    addTask,
    completeTask,
    updateTask,
    filteredTasks,
    setSearchKeyword,
  };
};

export default useTaskManager;
