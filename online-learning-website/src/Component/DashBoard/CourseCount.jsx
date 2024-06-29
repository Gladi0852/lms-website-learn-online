import React from "react";
import { useSelector } from "react-redux";

const CourseCount = ({ data, index, showAll }) => {
  const { role } = useSelector((store) => store.userInfo);
  return (
    <div
      className={`w-[30%] bg-[#202020] py-5 flex flex-col gap-5 px-2 ${
        showAll ? "" : index === 2 ? "" : "opacity-50"
      }`}
    >
      <h3 className="text-lg lg:text-2xl italic">{data.heading}</h3>
      <h1 className="text-2xl lg:text-4xl">{data.number}</h1>
    </div>
  );
};

export default CourseCount;
