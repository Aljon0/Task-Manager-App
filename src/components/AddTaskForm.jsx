import React, { useEffect, useState } from "react";

const AddTaskForm = ({
  onAdd,
  onUpdate,
  onCancel,
  categories,
  onAddCategory,
  task,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isNewCategoryMode, setIsNewCategoryMode] = useState(false);

  // If editing a task, populate form with task data
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
      setPriority(task.priority);
      setCategory(task.category);
    } else {
      // Default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDueDate(tomorrow.toISOString().split("T")[0]);

      // Set default category if available
      if (categories.length > 0 && categories[0] !== "All") {
        setCategory(categories[0]);
      }
    }
  }, [task, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    const selectedCategory = isNewCategoryMode ? newCategory : category;

    if (!selectedCategory) {
      alert("Please select or create a category");
      return;
    }

    // If in new category mode, add the new category
    if (isNewCategoryMode && newCategory) {
      onAddCategory(newCategory);
    }

    const taskData = {
      title,
      description,
      dueDate: dueDate,
      priority,
      category: selectedCategory,
      completed: task ? task.completed : false,
    };

    if (task) {
      onUpdate({ ...taskData, id: task.id });
    } else {
      onAdd(taskData);
    }
  };

  const toggleCategoryMode = () => {
    setIsNewCategoryMode(!isNewCategoryMode);
    setNewCategory("");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
      <h2 className="text-xl font-bold text-[#252422] mb-4">
        {task ? "Edit Task" : "Add New Task"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-[#403D39] mb-1"
          >
            Title*
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-[#CCC5B9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB5E28]"
            placeholder="Enter task title"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-[#403D39] mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-[#CCC5B9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB5E28]"
            placeholder="Enter task description"
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-[#403D39] mb-1"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border border-[#CCC5B9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB5E28]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-[#403D39] mb-1">
            Priority
          </label>
          <div className="flex space-x-2">
            {["low", "medium", "high"].map((p) => (
              <label key={p} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="priority"
                  value={p}
                  checked={priority === p}
                  onChange={() => setPriority(p)}
                  className="h-4 w-4 text-[#EB5E28] focus:ring-[#EB5E28]"
                />
                <span className="text-sm text-[#403D39] capitalize">{p}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-[#403D39]">
              Category
            </label>
            <button
              type="button"
              onClick={toggleCategoryMode}
              className="text-xs text-[#EB5E28] hover:text-[#d55523]"
            >
              {isNewCategoryMode ? "Select Existing" : "Create New"}
            </button>
          </div>

          {isNewCategoryMode ? (
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-3 py-2 border border-[#CCC5B9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB5E28]"
              placeholder="Enter new category name"
            />
          ) : (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-[#CCC5B9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EB5E28]"
            >
              <option value="">Select a category</option>
              {categories
                .filter((cat) => cat !== "All")
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          )}
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-[#CCC5B9] text-[#403D39] rounded-md hover:bg-[#CCC5B9] hover:text-[#252422] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#EB5E28] text-white rounded-md hover:bg-[#d55523] transition-colors"
          >
            {task ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
