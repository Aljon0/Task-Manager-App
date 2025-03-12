import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";
import { Task } from "../types/Task";
import TaskForm from "./TaskForm";
interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { darkMode } = useTheme();
  const { toggleTaskStatus, deleteTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue = () => {
    const now = new Date();
    const dueDate = new Date(task.dueDate);
    return !task.completed && dueDate < now;
  };

  return (
    <div className="cursor-move">
      {isEditing ? (
        <TaskForm task={task} onClose={() => setIsEditing(false)} />
      ) : (
        <div
          className={`p-4 rounded-lg border-l-4 transition-all ${
            task.completed
              ? "dark:bg-gray-800 bg-gray-50 border-gray-300 dark:border-gray-600"
              : isOverdue()
              ? "dark:bg-red-900/20 bg-red-50 border-red-500"
              : "dark:bg-gray-800 bg-white border-l-4"
          }`}
          style={{
            backgroundColor: task.completed
              ? darkMode
                ? "#1A1E29"
                : "#F8F8F8"
              : darkMode
              ? "#1F2937"
              : "#FFFFFF",
            borderLeftColor: task.completed
              ? darkMode
                ? "#6B7280"
                : "#A1A6B4"
              : isOverdue()
              ? "#FF4747"
              : "#94C5CC",
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <button
                onClick={() => toggleTaskStatus(task.id)}
                className={`mt-1 w-5 h-5 rounded-full border ${
                  task.completed
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-300 dark:border-gray-600"
                } flex items-center justify-center`}
                style={{
                  backgroundColor: task.completed ? "#94C5CC" : "transparent",
                  borderColor: task.completed
                    ? "#94C5CC"
                    : darkMode
                    ? "#6B7280"
                    : "#A1A6B4",
                }}
              >
                {task.completed && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>

              <div className="flex-1">
                <h3
                  className={`font-medium ${
                    task.completed
                      ? "text-gray-500 dark:text-gray-400 line-through"
                      : "text-gray-900 dark:text-gray-100"
                  }`}
                  style={{
                    color: task.completed
                      ? darkMode
                        ? "#9CA3AF"
                        : "#A1A6B4"
                      : darkMode
                      ? "#FFFFFF"
                      : "#000100",
                  }}
                >
                  {task.title}
                </h3>

                {task.description && (
                  <p
                    className={`mt-1 text-sm ${
                      task.completed
                        ? "text-gray-400 dark:text-gray-500"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                    style={{
                      color: task.completed
                        ? darkMode
                          ? "#6B7280"
                          : "#A1A6B4"
                        : darkMode
                        ? "#D1D5DB"
                        : "#000100",
                    }}
                  >
                    {task.description}
                  </p>
                )}

                <div className="mt-2 flex flex-wrap gap-2 items-center text-xs">
                  <span
                    className="px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: darkMode ? "#374151" : "#B4D2E7",
                      color: darkMode ? "#D1D5DB" : "#000100",
                    }}
                  >
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}
                  </span>

                  <span
                    className="px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: darkMode ? "#1A1E29" : "#F8F8F8",
                      color: darkMode ? "#D1D5DB" : "#000100",
                      border: `1px solid ${darkMode ? "#4B5563" : "#94C5CC"}`,
                    }}
                  >
                    {task.category}
                  </span>

                  <span
                    className="px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: isOverdue()
                        ? darkMode
                          ? "#7F1D1D"
                          : "#FFE5E5"
                        : darkMode
                        ? "#1A1E29"
                        : "#F8F8F8",
                      color: isOverdue()
                        ? darkMode
                          ? "#FCA5A5"
                          : "#FF4747"
                        : darkMode
                        ? "#D1D5DB"
                        : "#000100",
                    }}
                  >
                    Due: {formatDate(task.dueDate)}
                    {isOverdue() && " (Overdue)"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                style={{ color: darkMode ? "#60A5FA" : "#94C5CC" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                style={{ color: darkMode ? "#F87171" : "#FF4747" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
