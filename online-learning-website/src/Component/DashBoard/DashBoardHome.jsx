import React, { useContext } from "react";
import DashboardHeader from "./DashboardHeader";
import { useSelector } from "react-redux";
import CourseCount from "./CourseCount";
import { DashboardContext } from "../../Store/ContextFiles/dashboard-store";
import CourseTemplate from "../CourseTemplate";
import CreatedContentTemplate from "./CreatedContentTemplate";

const DashBoardHome = () => {
  const { name, role } = useSelector((store) => store.userInfo);
  const courseNumbers = [
    {
      heading: "Active Courses",
      number: 0,
    },
    {
      heading: "Completed Courses",
      number: 0,
    },
    {
      heading: "Enrolled Courses",
      number: 0,
    },
  ];
  const lectureStatus = [
    {
      heading: "Published Contents",
      number: 0,
    },
    {
      heading: "Unpublished Contents",
      number: 0,
    },
    {
      heading: "Total Contents",
      number: 0,
    },
  ];
  const { dashboardData } = useContext(DashboardContext);
  courseNumbers[2].number = dashboardData.allEnrolledCourse.length;
  if (role === "Teacher") {
    lectureStatus[0].number = dashboardData.publishedContents;
    lectureStatus[1].number =
      dashboardData.createdContent.length - dashboardData.publishedContents;
    lectureStatus[2].number = dashboardData.createdContent.length;
  }
  return (
    <div>
      <DashboardHeader
        heading="Your Dashboard"
        subHead="Check your activities in one glance from here"
      />
      <div className="border border-t-0 border-[#00ffff]">
        <h3 className="text-center bg-[#00ffff] text-white font-semibold text-xl">
          Welcome, {name}!
        </h3>
        <div className="w-full px-5 lg:px-20 py-10 flex justify-between text-white text-center">
          {courseNumbers.map((data, index) => (
            <CourseCount key={index} data={data} index={index} />
          ))}
        </div>
        <div className="w-full h-[1px] bg-[#202020]"></div>

        <div className="py-10">
          <h1 className="text-center text-3xl lg:text-4xl italic font-semibold text-[#00ffff]">
            Your Recent Enrolled Courses
          </h1>
          <div className="px-5 lg:px-10 mt-8">
            {dashboardData.limitedEnrolledCourse.length > 0 ? (
              <CourseTemplate
                topCourses={dashboardData.limitedEnrolledCourse}
              />
            ) : (
              <p className="text-center mt-5">
                You are not enrolled in any courses!
              </p>
            )}
          </div>
        </div>
        {role === "Teacher" && (
          <div className="">
            <div className="w-full h-[1px] bg-[#202020] mb-10"></div>
            <h3 className="text-center text-3xl lg:text-4xl italic font-semibold text-[#00ffff]">
              Your Contents
            </h3>
            <div className="w-full px-5 lg:px-20 py-10 flex justify-between text-white text-center">
              {lectureStatus.map((data, index) => (
                <CourseCount
                  key={index}
                  data={data}
                  index={index}
                  showAll={true}
                />
              ))}
            </div>
            <div className="w-full h-[1px] bg-[#202020] mb-10"></div>
            <div className="pb-10">
              <h1 className="text-center text-3xl lg:text-4xl italic font-semibold text-[#00ffff]">
                Your Content's Activity
              </h1>
              <div>
                {dashboardData.createdContent.length > 0 ? (
                  <CreatedContentTemplate
                    courses={dashboardData.limitedCreatedContent}
                  />
                ) : (
                  <p className="text-center mt-5">
                    You haven't posted any contents!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoardHome;
