import React, { useState, useEffect } from "react";

const TaskList = ({ tasks, onDelete, onToggleComplete, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  // Sort tasks: incomplete first, then by priority, then by due date
  const sortedTasks = [...tasks].sort((a, b) => {
    // First by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    // Then by priority
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    // Finally by due date
    return new Date(a.due_date) - new Date(b.due_date);
  });

  // Update pagination whenever tasks change or page changes
  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(sortedTasks.length / tasksPerPage)));

    // Ensure current page is valid
    if (
      currentPage > Math.ceil(sortedTasks.length / tasksPerPage) &&
      sortedTasks.length > 0
    ) {
      setCurrentPage(Math.ceil(sortedTasks.length / tasksPerPage));
    }

    // Get current tasks for this page
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    setDisplayedTasks(sortedTasks.slice(indexOfFirstTask, indexOfLastTask));
  }, [sortedTasks, currentPage, tasksPerPage]);

  const goToPage = (pageNumber) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  const handleTasksPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    setTasksPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-[#403D39]">
        <p>No tasks found. Add a task to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4 mb-6">
        {displayedTasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
              task.completed
                ? "border-l-green-500 opacity-75"
                : task.priority === "high"
                ? "border-l-red-500"
                : task.priority === "medium"
                ? "border-l-yellow-500"
                : "border-l-green-500"
            }`}
          >
            <div className="p-4">
              <div className="flex flex-col sm:flex-row items-start justify-between">
                <div className="flex items-start space-x-3 mb-3 sm:mb-0">
                  <div>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => onToggleComplete(task.id)}
                      className="h-5 w-5 rounded border-[#CCC5B9] text-[#EB5E28] focus:ring-[#EB5E28]"
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-medium ${
                        task.completed
                          ? "line-through text-[#CCC5B9]"
                          : "text-[#252422]"
                      }`}
                    >
                      {task.title}
                    </h3>
                    <p
                      className={`mt-1 text-sm ${
                        task.completed ? "text-[#CCC5B9]" : "text-[#403D39]"
                      }`}
                    >
                      {task.description}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center text-xs bg-[#FFFCF2] px-2 py-1 rounded-md text-[#403D39]">
                        {task.category}
                      </span>
                      <span
                        className={`inline-flex items-center text-xs ${getPriorityColor(
                          task.priority
                        )} px-2 py-1 rounded-md bg-opacity-10 bg-current`}
                      >
                        {task.priority.charAt(0).toUpperCase() +
                          task.priority.slice(1)}
                      </span>
                      <span className="inline-flex items-center text-xs text-[#403D39] px-2 py-1 rounded-md">
                        Due: {new Date(task.due_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 ml-8 sm:ml-0">
                  <button
                    onClick={() => onEdit(task)}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label="Edit task"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Delete task"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center mb-3 sm:mb-0">
          <span className="text-sm text-[#403D39] mr-2">Show:</span>
          <select
            value={tasksPerPage}
            onChange={handleTasksPerPageChange}
            className="bg-white border border-[#CCC5B9] text-[#403D39] text-sm rounded-md focus:ring-[#EB5E28] focus:border-[#EB5E28]"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
          <span className="text-sm text-[#403D39] ml-2">tasks per page</span>
        </div>

        <div className="flex items-center">
          <span className="text-sm text-[#403D39] mr-4">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex space-x-1">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-[#403D39] hover:bg-[#CCC5B9] border border-[#CCC5B9]"
              }`}
              aria-label="First page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-[#403D39] hover:bg-[#CCC5B9] border border-[#CCC5B9]"
              }`}
              aria-label="Previous page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-[#403D39] hover:bg-[#CCC5B9] border border-[#CCC5B9]"
              }`}
              aria-label="Next page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-[#403D39] hover:bg-[#CCC5B9] border border-[#CCC5B9]"
              }`}
              aria-label="Last page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 4.5l7.5 7.5-7.5 7.5m6-15l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
