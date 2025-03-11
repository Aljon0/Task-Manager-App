import React from "react";
import { useTaskContext } from "../context/TaskContext";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { categories, tasks } = useTaskContext();

  // Count tasks in each category
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = tasks.filter((task) => task.category === category).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3" style={{ color: "#000100" }}>
        Categories
      </h3>

      <div className="space-y-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left px-3 py-2 rounded-md transition ${
            selectedCategory === null
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-100"
          }`}
          style={{
            backgroundColor:
              selectedCategory === null ? "#B4D2E7" : "transparent",
            color: "#000100",
          }}
        >
          <div className="flex justify-between items-center">
            <span>All Tasks</span>
            <span
              className="px-2 py-1 rounded-full text-xs"
              style={{ backgroundColor: "#94C5CC", color: "#FFFFFF" }}
            >
              {tasks.length}
            </span>
          </div>
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`w-full text-left px-3 py-2 rounded-md transition ${
              selectedCategory === category
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
            style={{
              backgroundColor:
                selectedCategory === category ? "#B4D2E7" : "transparent",
              color: "#000100",
            }}
          >
            <div className="flex justify-between items-center">
              <span>{category}</span>
              <span
                className="px-2 py-1 rounded-full text-xs"
                style={{ backgroundColor: "#94C5CC", color: "#FFFFFF" }}
              >
                {categoryCounts[category] || 0}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
