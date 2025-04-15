import React from "react";

const TaskDashboard = ({ tasks }) => {
  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "high" && !task.completed
  ).length;

  // Get tasks due today
  const today = new Date().toISOString().split("T")[0];
  const dueTodayTasks = tasks.filter(
    (task) => task.due_date === today && !task.completed
  ).length;

  // Calculate completion percentage
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#CCC5B9]">
      <div className="bg-[#252422] text-white p-4">
        <h2 className="text-lg font-semibold">Task Dashboard</h2>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#403D39]">Completion Progress</span>
            <span className="text-sm font-medium text-[#EB5E28]">
              {completionPercentage}%
            </span>
          </div>
          <div className="w-full bg-[#CCC5B9] rounded-full h-2">
            <div
              className="bg-[#EB5E28] h-2 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#FFFCF2] p-4 rounded-lg border border-[#CCC5B9]">
            <p className="text-xs text-[#403D39] mb-1">Total Tasks</p>
            <p className="text-2xl font-bold text-[#252422]">{totalTasks}</p>
          </div>

          <div className="bg-[#FFFCF2] p-4 rounded-lg border border-[#CCC5B9]">
            <p className="text-xs text-[#403D39] mb-1">Pending</p>
            <p className="text-2xl font-bold text-[#252422]">{pendingTasks}</p>
          </div>

          <div className="bg-[#FFFCF2] p-4 rounded-lg border border-[#CCC5B9]">
            <p className="text-xs text-[#403D39] mb-1">Completed</p>
            <p className="text-2xl font-bold text-[#252422]">
              {completedTasks}
            </p>
          </div>

          <div className="bg-[#FFFCF2] p-4 rounded-lg border border-[#CCC5B9]">
            <p className="text-xs text-[#403D39] mb-1">High Priority</p>
            <p className="text-2xl font-bold text-[#EB5E28]">
              {highPriorityTasks}
            </p>
          </div>
        </div>

        {dueTodayTasks > 0 && (
          <div className="mt-4 bg-[#EB5E28] bg-opacity-10 border border-[#EB5E28] border-opacity-30 text-[#EB5E28] p-3 rounded-md">
            <p className="text-sm font-medium">
              {dueTodayTasks} task{dueTodayTasks > 1 ? "s" : ""} due today!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;
