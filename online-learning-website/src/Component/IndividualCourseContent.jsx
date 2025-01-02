import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDropdown } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { useSelector } from "react-redux";

// const base_url = "http://localhost:8080";
const base_url = "https://lms-backend-1-je3i.onrender.com";

const IndividualCourseContent = ({
  courseData,
  handleEnroll,
  enrolledStatus,
  message,
}) => {
  const { isAuthorised } = useSelector((store) => store.loginStatus);
  const [activeIndex, setActiveIndex] = useState(null);
  const handleClick = (index) => {
    if (enrolledStatus || index === 0)
      setActiveIndex(activeIndex === index ? null : index);
    else alert("You Must Enrolled to See");
  };
  const handleEnrollClick = () => {
    if (isAuthorised) handleEnroll();
    else alert("You must be logged in to enroll");
  };
  return (
    <div className="w-full px-10 sm:px-20 xl:px-[10rem] py-10">
      <header className="flex flex-col-reverse lg:flex-row lg:justify-between bg-[#2D2F31] text-white py-10 lg:py-0">
        <div
          id="left"
          className="w-full lg:w-[45%] px-10 lg:py-10 flex flex-col gap-5"
        >
          <p className="text-[#00ffff]">{courseData.category}</p>
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-medium italic leading-6">
            {courseData.course_name}
          </h1>
          <div
            className="text-white text-base lg:text-lg xl:text-xl leading-5"
            dangerouslySetInnerHTML={{ __html: courseData.course_desc }}
          />
          <p>Created by {courseData.name}</p>
          <p className="bg-[green] px-5 w-fit">
            Price: &#x20b9;{courseData.price}
          </p>
          {courseData.price === 0 ? (
            <motion.button
              className={`w-fit px-5 py-2 text-base lg:text-lg font-bold rounded-xl  ${
                enrolledStatus
                  ? "bg-gray-400 text-gray-500 opacity-50 pointer-events-none"
                  : "bg-[#00ffff] text-black"
              }`}
              whileHover={{ scale: 0.9 }}
              onClick={handleEnrollClick}
            >
              {enrolledStatus ? "Enrolled" : "Enroll"}
            </motion.button>
          ) : (
            <motion.button
              className={`w-fit px-5 py-2 text-base lg:text-lg font-bold rounded-xl  ${
                enrolledStatus
                  ? "bg-gray-400 text-gray-500 opacity-50 pointer-events-none"
                  : "bg-[#00ffff] text-black"
              }`}
              // onClick={handleEnrollClick}
            >
              {enrolledStatus ? "Enrolled" : "Buy Now"}
            </motion.button>
          )}
          {message && <p className="text-blue-600">{message}</p>}
        </div>
        <div
          id="right"
          className="w-full lg:w-[45%] p-5 flex justify-center items-center"
        >
          <img
            src={`${base_url}/CourseImages/${courseData.course_image}`}
            alt="Course Photo"
            className="object-left object-cover w-full"
          />
        </div>
      </header>
      <main className="lg:px-20 xl:px-[10rem] py-10 w-full">
        <h1 className="text-3xl font-medium mb-8">Course Content</h1>
        {courseData.course_lectures.map((lecture, index) => (
          <div
            key={index}
            className={`border border-gray-400 ${
              enrolledStatus || index === 0
                ? "cursor-pointer"
                : "pointer-events-none"
            }`}
          >
            <div
              className="w-full bg-[#deeaf1] py-5 px-5 lg:px-10 flex justify-between items-center"
              onClick={() => handleClick(index)}
            >
              <h1 className="text-lg lg:text-xl font-medium">
                {lecture.lecture_name}
              </h1>
              {enrolledStatus || index === 0 ? (
                <IoIosArrowDropdown
                  className={`text-2xl lg:text-3xl transition-transform duration-300 ${
                    activeIndex === index ? "-rotate-180" : ""
                  }`}
                />
              ) : (
                <FaLock className="text-2xl lg:text-3xl text-[#FF9966] " />
              )}
            </div>
            <div
              className={`w-full xl:w-2/3 px-5 lg:px-10 xl:px-0 lg:mx-auto flex flex-col gap-5 overflow-hidden transition-max-height duration-700 ease-in-out ${
                activeIndex === index ? "max-h-screen" : "max-h-0"
              }`}
              style={{ maxHeight: activeIndex === index ? "none" : "0" }}
            >
              {lecture.lecture_video && (
                <div className="pt-8 xl:pt-16">
                  <h1 className="text-[#00ffff] font-medium text-lg lg:text-xl xl:text-2xl bg-black py-2 px-2 mb-5">
                    Lecture Video
                  </h1>
                  <video preload="auto" controls className="w-full">
                    <source
                      src={`${base_url}/CourseVideos/${lecture.lecture_video}`}
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              {lecture.lecture_video && (
                <div className="w-full h-[1px] bg-gray-300"></div>
              )}
              <div
                className={`pb-8 xl:pb-16 ${
                  !lecture.lecture_video ? "pt-5" : ""
                }`}
              >
                <h1 className="text-[#00ffff] font-medium text-lg lg:text-xl xl:text-2xl bg-black py-2 px-2 mb-5">
                  Lecture Details
                </h1>
                <div
                  className="text-lg lg:text-xl xl:text-2xl"
                  dangerouslySetInnerHTML={{ __html: lecture.lecture_desc }}
                />
              </div>
            </div>
          </div>
        ))}
      </main>
      <section className="bg-[#2D2F31] py-10 px-5 lg:px-0">
        <h2 className="text-3xl font-medium italic text-center mb-10 text-white">
          Instructor
        </h2>
        <div className="flex flex-col items-center py-5 gap-5 w-full lg:w-2/3 mx-auto bg-white rounded-3xl shadow-2xl shadow-black">
          <div className="w-[45vw] sm:w-[35vw] md:w-[30vw] lg:w-[18vw] h-[45vw] sm:h-[35vw] md:h-[30vw] lg:h-[18vw] rounded-full">
            <img
              src={`${base_url}/UploadedImages/${courseData.profile_photo}`}
              alt="Instructor Photo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-[#19608f] text-2xl font-medium">
              {courseData.name}
            </h2>
            <p className="text-lg text-gray-500">{courseData.designation}</p>
          </div>
          <p className="text-base lg:text-xl px-3 lg:px-10 text-center">
            {courseData.about}
          </p>
        </div>
      </section>
    </div>
  );
};

export default IndividualCourseContent;
