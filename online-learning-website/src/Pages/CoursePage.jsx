import React, { useEffect } from "react";
import Courses from "./Courses";
import CoursesListProvider from "../Store/ContextFiles/course-list-store";
import { Outlet } from "react-router-dom";

const CoursePage = () => {
  useEffect(() => {
    document.title = "LFO - Courses";
  }, []);
  return (
    <CoursesListProvider>
      <Outlet />
    </CoursesListProvider>
  );
};

export default CoursePage;
