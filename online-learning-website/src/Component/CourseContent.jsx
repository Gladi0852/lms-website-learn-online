import React, { useContext } from "react";
import CourseTemplate from "./CourseTemplate";
import { CoursesList } from "../Store/ContextFiles/course-list-store";

const CourseContent = () => {
  const { courseData } = useContext(CoursesList);
  return (
    <div className="w-full xl:w-3/4 mt-10 xl:mt-0">
      {!courseData.error ? (
        courseData.data === "NIL" ? (
          <h1 className="text-center text-xl font-medium">
            There are no posts
          </h1>
        ) : (
          <div className="w-full grid lg:grid-cols-2 gap-10">
            {/* lg:grid-rows-2 */}
            <CourseTemplate topCourses={courseData.data} />
          </div>
        )
      ) : (
        <h1 className="text-center text-xl font-medium">{courseData.error}</h1>
      )}
    </div>
  );
};

export default CourseContent;
