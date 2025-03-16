// src/App.jsx
import React, { useEffect, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskDashboard from "./components/TaskDashboard";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import "./index.css";

function App() {
  // Initial sample tasks
  const initialTasks = [
    {
      id: 1,
      title: "Complete project proposal",
      description: "Finalize the Q2 marketing campaign proposal document",
      dueDate: "2025-03-20",
      priority: "high",
      category: "Work",
      completed: false,
    },
    {
      id: 2,
      title: "Grocery shopping",
      description: "Buy vegetables, fruits, and household items",
      dueDate: "2025-03-18",
      priority: "medium",
      category: "Personal",
      completed: true,
    },
    {
      id: 3,
      title: "Weekly team meeting",
      description: "Discuss project progress and next steps",
      dueDate: "2025-03-17",
      priority: "high",
      category: "Work",
      completed: false,
    },
    {
      id: 4,
      title: "Pay utility bills",
      description: "Electricity, water, and internet bills",
      dueDate: "2025-03-25",
      priority: "low",
      category: "Finance",
      completed: false,
    },
  ];

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  const [filter, setFilter] = useState("All");
  const [categories, setCategories] = useState([
    "Work",
    "Personal",
    "Finance",
    "Health",
    "Study",
  ]);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    // Create a new task with a unique ID
    const newTask = {
      ...task,
      id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    };
    setTasks([...tasks, newTask]);
    setIsAddTaskModalOpen(false);
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setTaskToEdit(null);
    setIsAddTaskModalOpen(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (task) => {
    setTaskToEdit(task);
    setIsAddTaskModalOpen(true);
  };

  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.category === filter);

  return (
    <div className="min-h-screen bg-[#FFFCF2]">
      <header className="bg-[#252422] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Task<span className="text-[#EB5E28]">Master</span>
          </h1>
          <button
            onClick={() => setIsAddTaskModalOpen(true)}
            className="bg-[#EB5E28] hover:bg-[#d55523] text-white px-4 py-2 rounded-md transition duration-300"
          >
            Add New Task
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <TaskDashboard tasks={tasks} />

        <section className="mt-8">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#403D39]">Your Tasks</h2>
            <TaskFilter
              categories={["All", ...categories]}
              currentFilter={filter}
              onFilterChange={setFilter}
            />
          </div>

          <TaskList
            tasks={filteredTasks}
            onDelete={deleteTask}
            onToggleComplete={toggleTaskCompletion}
            onEdit={editTask}
          />
        </section>
      </main>

      {isAddTaskModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <AddTaskForm
            onAdd={addTask}
            onUpdate={updateTask}
            onCancel={() => {
              setIsAddTaskModalOpen(false);
              setTaskToEdit(null);
            }}
            categories={categories}
            onAddCategory={addCategory}
            task={taskToEdit}
          />
        </div>
      )}
    </div>
  );
}

export default App;
