import React, { useContext, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import NoDataPage from "../NoDataPage";
import { DashboardContext } from "../../Store/ContextFiles/dashboard-store";
import CourseTemplate from "../CourseTemplate";

const UserCourses = () => {
  const { dashboardData } = useContext(DashboardContext);
  useEffect(() => {
    document.title = "LFO - Dashboard-MyCourses";
  }, []);
  return (
    <div>
      <DashboardHeader
        heading="All Courses"
        subHead="All enroled courses are here where you enroled"
      />
      <div className="border border-t-0 border-[#00ffff]">
        <div className="px-5 lg:px-10 py-8">
          {dashboardData.allEnrolledCourse.length > 0 ? (
            <CourseTemplate topCourses={dashboardData.allEnrolledCourse} />
          ) : (
            <NoDataPage
              message="You havn't enrolled to any of our courses"
              link="courses"
              buttonText="Explore Courses"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCourses;
