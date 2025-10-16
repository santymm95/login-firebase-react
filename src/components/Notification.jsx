import React, { useEffect } from "react";

const Notification = ({ message, type = "info", onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  }[type];

  return (
    <div className={`fixed top-5 right-5 ${bgColor} text-white px-4 py-2 rounded shadow-lg animate-slide-in`}>
      {message}
      <button onClick={onClose} className="ml-2 font-bold">
        ×
      </button>
    </div>
  );
};

export default Notification;
