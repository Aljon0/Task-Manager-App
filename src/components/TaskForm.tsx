import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";
import { Task } from "../types/Task";

interface TaskFormProps {
  onClose: () => void;
  task?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose, task }) => {
  const { darkMode } = useTheme();
  const { addTask, updateTask, categories, addCategory } = useTaskContext();
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    dueDate: task?.dueDate ? task.dueDate.split("T")[0] : "",
    priority: task?.priority || "medium",
    category: task?.category || categories[0] || "",
    completed: task?.completed || false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setFormData({
        ...formData,
        category: newCategory.trim(),
      });
      setNewCategory("");
      setShowNewCategoryInput(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.dueDate) return;

    if (task) {
      updateTask({
        ...task,
        ...formData,
      });
    } else {
      addTask(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto transition-colors duration-200"
        style={{ backgroundColor: darkMode ? "#1F2937" : "#F8F8F8" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-xl font-semibold"
            style={{ color: darkMode ? "#FFFFFF" : "#000100" }}
          >
            {task ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium"
              style={{ color: darkMode ? "#FFFFFF" : "#000100" }}
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              style={{
                borderColor: "#94C5CC",
                backgroundColor: darkMode ? "#374151" : "#FFFFFF",
                color: darkMode ? "#FFFFFF" : "#000100",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
              style={{ color: "#000100" }}
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              style={{
                borderColor: darkMode ? "#6B7280" : "#D1D5DB",
                backgroundColor: darkMode ? "#374151" : "#FFFFFF",
                color: darkMode ? "#FFFFFF" : "#000100",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
              style={{ color: "#000100" }}
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              style={{ borderColor: "#94C5CC" }}
            />
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
              style={{ color: "#000100" }}
            >
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              style={{
                borderColor: darkMode ? "#6B7280" : "#D1D5DB",
                backgroundColor: darkMode ? "#374151" : "#FFFFFF",
                color: darkMode ? "#FFFFFF" : "#000100",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700"
              style={{ color: "#000100" }}
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              style={{ borderColor: "#94C5CC" }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
              style={{ color: "#000100" }}
            >
              Category
            </label>
            {showNewCategoryInput ? (
              <div className="flex mt-1">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  style={{
                    borderColor: darkMode ? "#6B7280" : "#D1D5DB",
                    backgroundColor: darkMode ? "#374151" : "#FFFFFF",
                    color: darkMode ? "#FFFFFF" : "#000100",
                  }}
                  placeholder="New category name"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                  style={{ backgroundColor: "#94C5CC" }}
                >
                  Add
                </button>
              </div>
            ) : (
              <div className="flex mt-1">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  style={{ borderColor: "#94C5CC" }}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowNewCategoryInput(true)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300"
                  style={{ backgroundColor: "#B4D2E7", color: "#000100" }}
                >
                  New
                </button>
              </div>
            )}
          </div>

          {task && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="completed"
                name="completed"
                checked={formData.completed}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="completed"
                className="ml-2 block text-sm text-gray-700"
                style={{
                  borderColor: darkMode ? "#6B7280" : "#D1D5DB",
                  backgroundColor: darkMode ? "#374151" : "#FFFFFF",
                  color: darkMode ? "#FFFFFF" : "#000100",
                }}
              >
                Mark as completed
              </label>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition-colors duration-200"
              style={{
                borderColor: darkMode ? "#6B7280" : "#D1D5DB",
                backgroundColor: darkMode ? "#374151" : "#FFFFFF",
                color: darkMode ? "#FFFFFF" : "#000100",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              style={{ backgroundColor: "#94C5CC" }}
            >
              {task ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
