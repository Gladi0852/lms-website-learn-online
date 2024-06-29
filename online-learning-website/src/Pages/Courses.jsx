import React, { useContext } from "react";
import BannerPage from "../Component/BannerPage";
import SideBar from "../Component/SideBar";
import CourseContent from "../Component/CourseContent";
import LoadingSpinner from "../Component/LoadingSpinner";
import bg_image from "../assets/courses-bg.jpeg";
import { CoursesList } from "../Store/ContextFiles/course-list-store";

const CoursePage = () => {
  const { courseData } = useContext(CoursesList);
  return (
    <div id="courses" className="w-full">
      <BannerPage
        heading="All the skills you need in one place"
        desc="From critical skills to technical topics, We will supports your professional development."
        bg_image={bg_image}
      />
      <div
        id="content"
        className="w-full xl:flex px-10 sm:px-20 xl:px-[10rem] xl:gap-5 my-5"
      >
        <SideBar />
        {!courseData.loading ? <CourseContent /> : <LoadingSpinner />}
      </div>
    </div>
  );
};

export default CoursePage;
