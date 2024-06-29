import React from "react";

const ErrorPage = ({ error }) => {
  return (
    <div className="w-full h-[50vh] flex flex-col gap-10 justify-center items-center">
      <h1 className="text-red-500 text-4xl">{error}</h1>
      <p className="text-xl">!!!Please back to homepage!!!</p>
    </div>
  );
};

export default ErrorPage;
