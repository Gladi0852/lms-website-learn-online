import React from "react";

const DashboardHeader = ({ heading, subHead }) => {
  return (
    <div className="flex flex-col justify-center items-center border border-[#00ffff] gap-2 py-10 px-5">
      <h2 className="text-3xl lg:text-4xl font-medium italic">{heading}</h2>
      <p className="text-base md:text-lg lg:text-xl">{subHead}</p>
    </div>
  );
};

export default DashboardHeader;
