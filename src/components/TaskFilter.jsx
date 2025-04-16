import React from "react";

const TaskFilter = ({ categories, currentFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
            currentFilter === category
              ? "bg-[#EB5E28] text-white"
              : "bg-white text-[#403D39] hover:bg-[#CCC5B9] hover:text-[#252422]"
          } border border-[#CCC5B9]`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
