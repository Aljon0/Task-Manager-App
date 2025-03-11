import React, { useEffect, useState } from "react";

export type NotificationType = "success" | "error" | "info";

interface NotificationProps {
  type: NotificationType;
  message: string;
  duration?: number;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow time for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          backgroundColor: "#94C5CC",
          borderColor: "#94C5CC",
          icon: "check-circle",
        };
      case "error":
        return {
          backgroundColor: "#FF4747",
          borderColor: "#FF4747",
          icon: "x-circle",
        };
      case "info":
      default:
        return {
          backgroundColor: "#B4D2E7",
          borderColor: "#B4D2E7",
          icon: "info",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-md p-4 rounded-lg shadow-lg border-l-4 transform transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{
        backgroundColor: "#FFFFFF",
        borderLeftColor: styles.borderColor,
      }}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0" style={{ color: styles.borderColor }}>
          {styles.icon === "check-circle" && (
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          {styles.icon === "x-circle" && (
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
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          {styles.icon === "info" && (
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        <div className="ml-3 flex-1">
          <p
            className="text-sm font-medium text-gray-900"
            style={{ color: "#000100" }}
          >
            {message}
          </p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none"
          style={{ color: "#A1A6B4" }}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
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
    </div>
  );
};

export default Notification;
