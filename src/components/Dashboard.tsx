import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import CategoryFilter from "./CategoryFilter";
import EmptyState from "./EmptyState";
import Notification from "./Notification";
import SearchBar from "./SearchBar";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskStats from "./TaskStats";

const Dashboard: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const {
    tasks,
    searchResults,
    searchTasks,
    notifications,
    dismissNotification,
  } = useTaskContext();

  const displayedTasks =
    searchResults !== null
      ? searchResults
      : selectedCategory
      ? tasks.filter((task) => task.category === selectedCategory)
      : tasks;

  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1
          className="text-3xl font-bold text-gray-900"
          style={{ color: "#000100" }}
        >
          Task Manager
        </h1>
        <p className="text-gray-500" style={{ color: "#A1A6B4" }}>
          Organize your tasks efficiently
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div
            className="bg-white rounded-lg shadow-sm p-4 mb-6"
            style={{ backgroundColor: "#F8F8F8", borderColor: "#B4D2E7" }}
          >
            <TaskStats />
          </div>
          <div
            className="bg-white rounded-lg shadow-sm p-4"
            style={{ backgroundColor: "#F8F8F8", borderColor: "#B4D2E7" }}
          >
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold" style={{ color: "#000100" }}>
              {searchResults !== null
                ? `Search Results (${searchResults.length})`
                : selectedCategory
                ? `${selectedCategory} Tasks`
                : "All Tasks"}
            </h2>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-4 py-2 rounded-md text-white font-medium"
              style={{ backgroundColor: "#94C5CC" }}
            >
              Add New Task
            </button>
          </div>

          <SearchBar onSearch={searchTasks} />

          <div
            className="bg-white rounded-lg shadow-sm p-4"
            style={{ backgroundColor: "#F8F8F8", borderColor: "#B4D2E7" }}
          >
            {displayedTasks.length > 0 ? (
              <TaskList tasks={displayedTasks} />
            ) : (
              <EmptyState
                message={
                  searchResults !== null
                    ? "No tasks match your search."
                    : "No tasks found. Add your first task!"
                }
                actionLabel="Add Task"
                onAction={() => setIsFormOpen(true)}
              />
            )}
          </div>
        </div>
      </div>

      {isFormOpen && <TaskForm onClose={() => setIsFormOpen(false)} />}

      {/* Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            type={notification.type}
            message={notification.message}
            onClose={() => dismissNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
