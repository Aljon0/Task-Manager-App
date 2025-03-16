import React from "react";

const TaskFilter = ({ categories, currentFilter, onFilterChange }) => {
  return (
    <div className="inline-flex rounded-md shadow-sm">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={`px-4 py-2 text-sm font-medium ${
            currentFilter === category
              ? "bg-[#EB5E28] text-white"
              : "bg-white text-[#403D39] hover:bg-[#CCC5B9] hover:text-[#252422]"
          } ${
            categories.indexOf(category) === 0
              ? "rounded-l-md"
              : categories.indexOf(category) === categories.length - 1
              ? "rounded-r-md"
              : ""
          } border border-[#CCC5B9]`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
