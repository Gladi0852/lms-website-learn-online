import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { IoIosWarning } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import InputTextComponent from "./InputTextComponent";
import ImageUploadComponent from "./ImageUploadComponent";
import Lectures from "./Lectures";
import { MdSell } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";

import ComingSoon from "./ComingSoon";
import { AddCourseContext } from "../../Store/ContextFiles/addCourse-store";

const base_url = "https://lms-backend-1-je3i.onrender.com";
// const base_url = "http://localhost:8080";

const CourseDetails = () => {
  const {
    addCourseData,
    handleDeleteClick,
    isEditing,
    handlePublishButton,
    params,
  } = useContext(AddCourseContext);
  const [courseInfo, setCourseInfo] = useState({
    courseName: "",
    courseDesc: "",
    courseImage: "",
    courseLectures: [],
  });

  const handleImageDeleteClick = async () => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      try {
        const response = await axios.delete(
          `${base_url}/draftCourses/deleteCoursePhoto`,
          {
            data: { course_image: courseInfo.courseImage }, // data field for the body of the request
            params: { id: params.objectId }, // query parameters
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      } finally {
        setCourseInfo((prev) => ({
          ...prev,
          courseImage: "", // Reset courseImage in courseInfo
        }));
      }
    }
  };

  useEffect(() => {
    setCourseInfo({
      courseName: addCourseData.courseName,
      courseDesc: addCourseData.courseDesc,
      courseImage: addCourseData.courseImage,
      courseLectures: addCourseData.courseLectures,
    });
  }, [addCourseData]);
  return (
    <div>
      {addCourseData.pageError ? (
        <ErrorPage error={addCourseData.pageError} />
      ) : (
        <div className="w-full px-10 sm:px-20 xl:px-[10rem] py-10 bg-gray-200">
          <div className="bg-white rounded-xl overflow-hidden">
            {!addCourseData.courseStatus && (
              <div className="flex items-center gap-3 bg-[#FFF3A5] px-5 py-5">
                <IoIosWarning className="text-7xl md:text-5xl lg:text-3xl" />
                <p className="text-sm lg:text-base">
                  This course is unpublished. It will not be visible to
                  students. Create atleast 1 lectuer to publish
                </p>
              </div>
            )}
            <div className="px-5 lg:px-10">
              <div className="flex justify-between items-center py-5">
                <h1 className="text-xl lg:text-2xl font-semibold">
                  Course Setup
                </h1>
                {addCourseData.error && (
                  <h1 className="text-red-500 mt-5">{addCourseData.error}</h1>
                )}
                <div className="flex items-center gap-5">
                  <button
                    className="text-base lg:text-lg font-medium border border-[#0069D9] hover:bg-[#0069D9] text-[#0069D9] hover:text-white px-2 py-1 rounded-md"
                    onClick={() => handlePublishButton(courseInfo)}
                  >
                    {addCourseData.courseStatus ? "Update" : "Publish"}
                  </button>
                  <button
                    className="text-xl lg:text-2xl text-white bg-black p-1 rounded-lg"
                    onClick={handleDeleteClick}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
              <div className="py-10 flex flex-col lg:flex-row gap-10 justify-between">
                <div className="left w-full lg:w-[49%] flex flex-col gap-8">
                  <div className="flex items-center gap-3">
                    <MdOutlineDashboardCustomize className="text-4xl lg:text-5xl bg-[#00ffff] text-white p-2 rounded-full" />
                    <h3 className="text-xl lg:text-2xl italic font-semibold">
                      Customize your course
                    </h3>
                  </div>
                  <InputTextComponent
                    title="Course title"
                    name="course_name"
                    isEditing={isEditing.course_name}
                    inputBoxValue={courseInfo.courseName}
                    setInputBoxValue={(value) =>
                      setCourseInfo((prev) => ({ ...prev, courseName: value }))
                    }
                    showData={courseInfo.courseName}
                    textBox="input"
                    type="course"
                  />
                  <InputTextComponent
                    title="Course description"
                    name="course_desc"
                    isEditing={isEditing.course_desc}
                    inputBoxValue={courseInfo.courseDesc}
                    setInputBoxValue={(value) =>
                      setCourseInfo((prev) => ({ ...prev, courseDesc: value }))
                    }
                    showData={courseInfo.courseDesc}
                    textBox="textarea"
                    type="course"
                  />
                  <ImageUploadComponent
                    title="Course Image"
                    name="course_image"
                    imageUrl={courseInfo.courseImage}
                    // imageUrl={addCourseData.courseImage}
                    setImageUrl={(url) =>
                      setCourseInfo((prev) => ({ ...prev, courseImage: url }))
                    }
                    setCourseInfo={setCourseInfo}
                    isEditing={isEditing.course_image}
                    handleImageDeleteClick={handleImageDeleteClick}
                    type="course"
                  />
                </div>
                <div className="right w-full lg:w-[49%] flex flex-col gap-16">
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-3">
                      <MdOutlineDashboardCustomize className="text-4xl lg:text-5xl bg-[#00ffff] text-white p-2 rounded-full" />
                      <h3 className="text-xl lg:text-2xl italic font-semibold">
                        Course Chapters
                      </h3>
                    </div>
                    <Lectures courseLectures={courseInfo.courseLectures} />
                  </div>
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-3">
                      <MdSell className="text-4xl lg:text-5xl bg-[#00ffff] text-white p-2 rounded-full" />
                      <h3 className="text-xl lg:text-2xl italic font-semibold">
                        Sell your course
                      </h3>
                    </div>
                    <ComingSoon
                      heading="Course Price"
                      editButton="Edit Price"
                      icon="edit"
                    />
                  </div>
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-3">
                      <GrAttachment className="text-4xl lg:text-5xl bg-[#00ffff] text-white p-2 rounded-full" />
                      <h3 className="text-xl lg:text-2xl italic font-semibold">
                        Resourse & Attachments
                      </h3>
                    </div>
                    <ComingSoon
                      heading="Course Attachments"
                      editButton="Add a file"
                      icon="add"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
