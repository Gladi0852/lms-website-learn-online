import React, { useContext } from "react";
import HeadingDesign from "./HeadingDesign";
import bgImage from "../assets/teacherBG.jpg";
import LoadingSpinner from "./LoadingSpinner";
import TeachingReasons from "../Local Data/AboutTeaching.json";
import TeacherTemplate from "./TeacherTemplate";
import ButtonWithBG from "./ButtonWithBG";
import { HomePageContext } from "../Store/ContextFiles/homepage-store";

const Teacher = () => {
  const { teachers } = useContext(HomePageContext);
  return (
    <div id="teacher">
      <div className="px-10 sm:px-20 xl:px-[10rem] py-10">
        <HeadingDesign
          headingType={"Instructors"}
          heading={"EXPERT INSTRUCTORS"}
        />
      </div>
      {!teachers.loading ? (
        <div
          style={{ backgroundImage: `url(${bgImage})` }}
          className="px-10 sm:px-20 xl:px-[10rem] w-full bg-cover bg-center brightness-70 bg-fixed py-10 flex flex-col items-center gap-20 sm:flex-row sm:justify-between sm:flex-wrap sm:gap-0 xl:py-20"
        >
          {teachers.data.map((data, index) => (
            <TeacherTemplate data={data} key={index} />
          ))}
          <div className="flex justify-center w-full sm:mt-10">
            <ButtonWithBG text="All Instructors" link="teacher" />
          </div>
        </div>
      ) : (
        <div className="px-10 sm:px-20 xl:px-[10rem]">
          <LoadingSpinner />
        </div>
      )}
      <div className="px-10 sm:px-20 xl:px-[10rem] py-10 bg-[#4bd7d723] w-full">
        <h1 className="text-center text-2xl md:text-3xl">
          Become <span className="text-[#49e4e4]">An Instructor</span>
        </h1>
        <h1 className="text-center text-2xl md:text-3xl">of Our Platform</h1>
        <div className="mt-5 flex flex-col gap-5 items-center lg:flex-row lg:gap-10">
          {TeachingReasons.map((data) => (
            <div
              key={data.id}
              className="bg-white flex flex-col items-center w-4/5 p-5"
            >
              <div className="icon">
                <img src={data.icon} />
              </div>
              <h3 className="text-center text-lg font-bold">{data.heading}</h3>
              <p className="text-center font-light leading-5">{data.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teacher;
