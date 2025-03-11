import React from "react";
import { Task } from "../types/Task";
import TaskItem from "./TaskItem";
interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  // Sort tasks by due date (closest first) and then by priority
  const sortedTasks = [...tasks].sort((a, b) => {
    // First by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    // Then by due date
    const dateA = new Date(a.dueDate).getTime();
    const dateB = new Date(b.dueDate).getTime();
    if (dateA !== dateB) {
      return dateA - dateB;
    }

    // Finally by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  if (sortedTasks.length === 0) {
    return (
      <div
        className="text-center py-8 text-gray-500"
        style={{ color: "#A1A6B4" }}
      >
        No tasks found. Add a new task to get started!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
