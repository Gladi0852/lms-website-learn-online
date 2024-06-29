import React, { useContext } from "react";
import { AddCourseContext } from "../../Store/ContextFiles/addCourse-store";
import CourseDetails from "./CourseDetails";
import AddLecture from "./AddLecture";
import { Outlet } from "react-router-dom";

const ShowCourseEditPage = () => {
  const { addCourseData } = useContext(AddCourseContext);
  return (
    <>
      {addCourseData.initialPage ? (
        <CourseDetails />
      ) : (
        // <AddLecture lectureId={addCourseData.lectureId} />
        <Outlet />
      )}
    </>
  );
};

export default ShowCourseEditPage;
