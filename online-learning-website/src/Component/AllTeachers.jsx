import React, { useContext } from "react";
import bgImage from "../assets/teacherBG.jpg";
import TeacherTemplate from "./TeacherTemplate";
import { TeacherContext } from "../Store/ContextFiles/teacher-store";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";

const AllTeachers = () => {
  const { teachersData } = useContext(TeacherContext);

  return (
    <>
      {!teachersData.loading ? (
        <div className="w-full mb-10">
          {teachersData.data ? (
            teachersData.data === "NIL" ? (
              <h1 className="text-center text-xl font-medium">
                There are no teacher to show
              </h1>
            ) : (
              <div
                className="w-full px-10 sm:px-20 xl:px-[10rem] bg-cover bg-center brightness-70 bg-fixed  py-10 xl:py-20"
                style={{ backgroundImage: `url(${bgImage})` }}
              >
                <div className="flex flex-col items-center gap-20 sm:flex-row sm:justify-between sm:flex-wrap sm:gap-0">
                  {teachersData.data.map((data, index) => (
                    <TeacherTemplate data={data} key={index} />
                  ))}
                </div>
                <Pagination />
              </div>
            )
          ) : (
            <h1 className="text-center text-xl font-medium">
              Some Error Occurred
            </h1>
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default AllTeachers;
