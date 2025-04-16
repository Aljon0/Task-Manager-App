/* eslint-disable no-unused-vars */ import React, {
  useEffect,
  useState,
} from "react";
import AddTaskForm from "./AddTaskForm";
import TaskDashboard from "./TaskDashboard";
import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import "../index.css";

function TaskApp() {
  const { user, signOut } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showSignOutAlert, setShowSignOutAlert] = useState(false);
  const [categories, setCategories] = useState([
    "Work",
    "Personal",
    "Finance",
    "Health",
    "Study",
  ]);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from Supabase
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .eq("user_id", user.id) // Filter tasks by user_id
          .order("due_date", { ascending: true });

        if (error) throw error;
        setTasks(data || []);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTasks();
    }

    // Set up real-time subscription
    const subscription = supabase
      .channel("tasks_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
          filter: user ? `user_id=eq.${user.id}` : undefined,
        },
        (payload) => {
          console.log("Real-time update received:", payload); // Add this for debugging

          if (payload.eventType === "INSERT") {
            setTasks((current) => [...current, payload.new]);
          } else if (payload.eventType === "UPDATE") {
            setTasks((current) =>
              current.map((task) =>
                task.id === payload.new.id ? payload.new : task
              )
            );
          } else if (payload.eventType === "DELETE") {
            setTasks((current) =>
              current.filter((task) => task.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user]);

  const addTask = async (task) => {
    try {
      // Create a temp ID for optimistic update
      const tempId = `temp-${Date.now()}`;

      // Add to local state immediately with temp ID
      const newTask = {
        id: tempId,
        title: task.title,
        description: task.description,
        due_date: task.dueDate,
        priority: task.priority,
        category: task.category,
        completed: false,
        user_id: user.id,
        // Add a flag to indicate this is temporary
        isTemp: true,
      };

      setTasks((current) => [...current, newTask]);
      setIsAddTaskModalOpen(false);

      // Then add to database
      const { data, error } = await supabase
        .from("tasks")
        .insert([
          {
            title: task.title,
            description: task.description,
            due_date: task.dueDate,
            priority: task.priority,
            category: task.category,
            completed: false,
            user_id: user.id,
          },
        ])
        .select();

      if (error) throw error;

      // Replace temp task with real one from database
      if (data && data.length > 0) {
        setTasks((current) =>
          current.map((t) => (t.id === tempId ? data[0] : t))
        );
      }
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .update({
          title: updatedTask.title,
          description: updatedTask.description,
          due_date: updatedTask.dueDate,
          priority: updatedTask.priority,
          category: updatedTask.category,
          completed: updatedTask.completed,
        })
        .eq("id", updatedTask.id)
        .eq("user_id", user.id);
      if (error) throw error;
      setTaskToEdit(null);
      setIsAddTaskModalOpen(false);
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const toggleTaskCompletion = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      setTasks((current) =>
        current.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );

      const { error } = await supabase
        .from("tasks")
        .update({ completed: !task.completed })
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error toggling task completion:", error.message);
      setTasks((current) => [...tasks]);
    }
  };

  const editTask = (task) => {
    setTaskToEdit({
      ...task,
      dueDate: task.due_date,
    });
    setIsAddTaskModalOpen(true);
  };

  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.category === filter);

  const handleSignOutClick = () => {
    setShowSignOutAlert(true);
  };

  const confirmSignOut = () => {
    signOut();
    setShowSignOutAlert(false);
  };

  const cancelSignOut = () => {
    setShowSignOutAlert(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFCF2]">
      <header className="bg-[#252422] text-white p-4 shadow-md">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <h1 className="text-2xl font-bold">
              Task<span className="text-[#EB5E28]">Master</span>
            </h1>
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-2 sm:space-y-0 w-full sm:w-auto">
              <span className="text-sm text-center w-full sm:w-auto">
                Welcome, {user?.email}
              </span>
              <div className="flex space-x-2 w-full sm:w-auto justify-center sm:justify-end">
                <button
                  onClick={() => setIsAddTaskModalOpen(true)}
                  className="bg-[#EB5E28] hover:bg-[#d55523] text-white px-4 py-2 rounded-md transition duration-300"
                >
                  Add New Task
                </button>
                <button
                  onClick={handleSignOutClick}
                  className="bg-transparent hover:bg-gray-700 text-white px-4 py-2 rounded-md transition duration-300"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sign Out Alert Modal */}
      {showSignOutAlert && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 border-l-4 border-[#EB5E28]">
            <h3 className="text-xl font-semibold text-[#252422] mb-3">
              Sign Out Confirmation
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to sign out from TaskMaster?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelSignOut}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmSignOut}
                className="px-4 py-2 bg-[#EB5E28] hover:bg-[#d55523] text-white rounded-md transition duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

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
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center p-4 z-50">
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

export default TaskApp;
