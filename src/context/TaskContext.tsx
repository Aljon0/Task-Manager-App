import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../types/Task";

export type NotificationType = "success" | "error" | "info";

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}

interface TaskContextType {
  tasks: Task[];
  categories: string[];
  searchResults: Task[] | null;
  notifications: Notification[];
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  addCategory: (category: string) => void;
  searchTasks: (query: string) => void;
  showNotification: (type: NotificationType, message: string) => void;
  dismissNotification: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories
      ? JSON.parse(savedCategories)
      : ["Work", "Personal", "Study"];
  });

  const [searchResults, setSearchResults] = useState<Task[] | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addTask = (taskDetails: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskDetails,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    showNotification("success", "Task created successfully!");
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    showNotification("success", "Task updated successfully!");
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    showNotification("info", "Task deleted");
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const newStatus = !task.completed;
          showNotification(
            "success",
            newStatus
              ? "Task marked as completed!"
              : "Task marked as incomplete"
          );
          return { ...task, completed: newStatus };
        }
        return task;
      })
    );
  };

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
      showNotification("success", `Category "${category}" added`);
    }
  };

  const searchTasks = (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerQuery) ||
        task.description.toLowerCase().includes(lowerQuery) ||
        task.category.toLowerCase().includes(lowerQuery)
    );

    setSearchResults(results);
  };

  const showNotification = (type: NotificationType, message: string) => {
    const id = uuidv4();
    setNotifications((prev) => [...prev, { id, type, message }]);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      dismissNotification(id);
    }, 3000);
  };

  const dismissNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        categories,
        searchResults,
        notifications,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        addCategory,
        searchTasks,
        showNotification,
        dismissNotification,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
