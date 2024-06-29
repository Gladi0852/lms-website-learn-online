import React, { useEffect, useState } from "react";

function AlertBox({ message, color }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-4 right-[45%] bg-green-500 ${
        color === "red" && "bg-red-500"
      } text-white p-4 rounded shadow z-10`}
    >
      {message}
    </div>
  );
}

export default AlertBox;
