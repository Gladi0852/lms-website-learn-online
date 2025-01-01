import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdCurrencyRupee } from "react-icons/md";
import { Link } from "react-router-dom";

const CreatedContentTemplate = ({ courses }) => {
  return (
    <div className="mt-10 px-2 lg:px-10">
      <div className="grid grid-cols-3 lg:grid-cols-5 border py-3 rounded-xl text-lg">
        <h4 className="text-center col-span-2">Title</h4>
        <h4 className="text-center hidden lg:block">Price</h4>
        <h4 className="text-center hidden lg:block">Status</h4>
        <h4 className="text-center"></h4>
      </div>
      {courses.map((data, index) => (
        <div
          className="grid grid-cols-3 lg:grid-cols-5 border py-3 px-2 rounded-xl text-base"
          key={index}
        >
          <p
            className={`text-center col-span-2 rounded-full py-1 text-white lg:text-black ${
              data.status
                ? "bg-blue-600 lg:bg-transparent"
                : "bg-gray-500 lg:bg-transparent"
            }`}
          >
            {data.course_name}
          </p>
          <p className="text-center items-center justify-center hidden lg:flex">
            <MdCurrencyRupee />
            {data.price}
          </p>
          <p
            className={`text-center text-white rounded-full py-1 hidden lg:flex justify-center items-center ${
              data.status ? "bg-blue-600" : "bg-gray-500 "
            }`}
          >
            {data.status ? "Published" : "Unpublished"}
          </p>
          <Link
            to={`/add-course/${data._id.toString()}`}
            className="text-center flex items-center justify-center gap-2"
          >
            <FiEdit />
            <p className="hidden lg:block">Edit</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CreatedContentTemplate;
