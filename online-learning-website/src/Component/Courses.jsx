import { useContext } from "react";
import HeadingDesign from "./HeadingDesign";
import LoadingSpinner from "./LoadingSpinner";
import CourseTemplate from "./CourseTemplate";
import ButtonWithBg from "./ButtonWithBG";
import { HomePageContext } from "../Store/ContextFiles/homepage-store";
const Courses = () => {
  const { courses } = useContext(HomePageContext);
  return (
    <div id="courses" className="px-10 sm:px-20 xl:px-[10rem] py-10">
      <HeadingDesign headingType={"Courses"} heading={"RECENT COURSES"} />
      <div
        className={`courseSection w-full ${
          courses.data && courses.data.length > 2
            ? "grid lg:grid-rows-2 lg:grid-cols-2 gap-10"
            : "grid lg:grid-rows-1 lg:grid-cols-2 gap-10"
        }`}
      >
        {!courses.loading ? (
          <CourseTemplate topCourses={courses.data} />
        ) : (
          <LoadingSpinner />
        )}
      </div>
      {courses.data && (
        <div className="mt-10 flex justify-center">
          <ButtonWithBg text="View All Course" link="courses" />
        </div>
      )}
    </div>
  );
};

export default Courses;
