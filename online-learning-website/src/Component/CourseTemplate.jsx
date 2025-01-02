import React from "react";
import { Link } from "react-router-dom";

// const base_url = "http://localhost:8080";
const base_url = "https://lms-backend-1-je3i.onrender.com";

const CourseTemplate = ({ topCourses }) => {
  return topCourses.map((data, index) => (
    <Link
      to={`/courses/${data._id}`}
      className="w-full flex flex-col md:flex-row lg:flex-col 2xl:flex-row gap-5 bg-[#4bd7d723] py-5 px-5 rounded-xl cursor-pointer"
      key={index}
    >
      <div className="photo w-full md:w-1/3 md:flex md:items-center lg:w-full 2xl:w-1/3">
        <img
          src={`${base_url}/CourseImages/${data.course_image}`}
          alt={data.course_image}
          className="w-full h-full"
        />
      </div>
      <div className="content w-full md:w-2/3 flex flex-col md:flex-row lg:flex-col lg:w-full 2xl:w-2/3 2xl:flex-row gap-3 md:justify-between">
        <div className="content-info w-full md:w-4/5 lg:w-full 2xl:w-4/5">
          <div className="heading flex flex-col gap-2 2xl:gap-1">
            <h1 className="text-xl font-bold md:text-lg">{data.course_name}</h1>
            <div
              className="text-sm font-thin xl:text-base 2xl:text-sm"
              dangerouslySetInnerHTML={{ __html: data.course_desc }}
            />
          </div>
        </div>
        <div className="price">
          <h1 className="text-lg font-bold">
            &#x20b9; {data.price == 0 ? "FREE" : data.price}
          </h1>
        </div>
      </div>
    </Link>
  ));
};

export default CourseTemplate;
