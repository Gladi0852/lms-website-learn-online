import React from "react";
import { MdEdit } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";

const ComingSoon = ({ heading, editButton, icon }) => {
  return (
    <div className="bg-gray-200 p-5 rounded-lg">
      <div className="flex justify-between mb-3">
        <h4 className="text-base md:text-lg font-bold">{heading}</h4>
        <button
          className="flex items-center gap-2 text-lg cursor-not-allowed"
          // onClick={handleAddClick}
        >
          {icon === "edit" && <MdEdit />}
          {icon === "add" && <IoMdAddCircleOutline />}
          <p className="font-medium text-sm md:text-base">{editButton}</p>
        </button>
      </div>
      <div>
        <h4 className="text-lg text-gray-500 italic">Coming Soon!!!</h4>
      </div>
    </div>
  );
};

export default ComingSoon;
