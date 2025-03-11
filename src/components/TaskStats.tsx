import React, { useMemo } from "react";
import { useTaskContext } from "../context/TaskContext";

const TaskStats: React.FC = () => {
  const { tasks } = useTaskContext();

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length;
    const pending = tasks.length - completed;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const overdue = tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return !task.completed && dueDate < today;
    }).length;

    const dueSoon = tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      const threeDaysLater = new Date(today);
      threeDaysLater.setDate(today.getDate() + 3);
      return !task.completed && dueDate >= today && dueDate <= threeDaysLater;
    }).length;

    const highPriority = tasks.filter(
      (task) => !task.completed && task.priority === "high"
    ).length;

    return {
      total: tasks.length,
      completed,
      pending,
      overdue,
      dueSoon,
      highPriority,
    };
  }, [tasks]);

  const StatItem = ({
    label,
    value,
    color,
  }: {
    label: string;
    value: number;
    color: string;
  }) => (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600" style={{ color: "#000100" }}>
        {label}
      </span>
      <span
        className="px-2 py-1 rounded-full text-xs font-medium"
        style={{ backgroundColor: color, color: "#FFFFFF" }}
      >
        {value}
      </span>
    </div>
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3" style={{ color: "#000100" }}>
        Task Overview
      </h3>
      <div className="space-y-2">
        <StatItem label="Total Tasks" value={stats.total} color="#94C5CC" />
        <StatItem label="Completed" value={stats.completed} color="#94C5CC" />
        <StatItem label="Pending" value={stats.pending} color="#A1A6B4" />
        <StatItem label="Overdue" value={stats.overdue} color="#FF4747" />
        <StatItem
          label="Due Soon (3 days)"
          value={stats.dueSoon}
          color="#FFA500"
        />
        <StatItem
          label="High Priority"
          value={stats.highPriority}
          color="#FF4747"
        />
      </div>
    </div>
  );
};

export default TaskStats;
