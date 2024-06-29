import React from "react";
import spinner from "../assets/spinner.svg";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center">
      <img src={spinner} />
    </div>
  );
};

export default LoadingSpinner;
