import React from "react";
import ShowCourseEditPage from "./ShowCourseEditPage";
import AddCourseContextProvider from "../../Store/ContextFiles/addCourse-store";
import { Outlet } from "react-router-dom";

const AddCourse = () => {
  return (
    <AddCourseContextProvider>
      {/* <ShowCourseEditPage /> */}
      <Outlet />
    </AddCourseContextProvider>
  );
};

export default AddCourse;
