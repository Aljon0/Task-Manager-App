import React from "react";

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="text-center py-10 px-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 mx-auto text-gray-400 mb-4"
        style={{ color: "#A1A6B4" }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      <p className="text-gray-500 mb-4" style={{ color: "#A1A6B4" }}>
        {message}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 rounded-md text-white font-medium"
          style={{ backgroundColor: "#94C5CC" }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
