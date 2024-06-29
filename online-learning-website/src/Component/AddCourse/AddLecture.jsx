import React, { useContext, useEffect, useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { AddCourseContext } from "../../Store/ContextFiles/addCourse-store";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import InputTextComponent from "./InputTextComponent";
import { useNavigate, useParams } from "react-router-dom";
import ImageUploadComponent from "./ImageUploadComponent";
import VideoUpload from "./VideoUpload";
import axios from "axios";

const AddLecture = () => {
  const params = useParams();
  const navigate = useNavigate();
  const lectureId = params.lectureId;
  const { addCourseData, isEditing } = useContext(AddCourseContext);
  const [lectureInfo, setLectureInfo] = useState({
    lecture_name: "",
    lecture_desc: "",
    lecture_video: "",
  });
  useEffect(() => {
    const foundLecture = addCourseData.courseLectures.filter(
      (lecture) => lecture._id === lectureId
    );
    if (foundLecture.length > 0) {
      setLectureInfo({
        lecture_name: foundLecture[0].lecture_name,
        lecture_desc: foundLecture[0].lecture_desc || "",
        lecture_video: foundLecture[0].lecture_video || "",
      });
    } else {
      navigate(-1);
    }
  }, [addCourseData, lectureId]);
  const handleVideoDeleteClick = async () => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      try {
        const response = await axios.delete(
          "http://localhost:8080/draftCourses/deleteLectureVideo",
          {
            data: {
              lecture_video: lectureInfo.lecture_video,
              lectureId: lectureId,
            },
            params: { id: params.objectId }, // query parameters
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setLectureInfo((prev) => ({
          ...prev,
          lecture_video: "", // Reset courseImage in courseInfo
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="w-full px-10 sm:px-20 xl:px-[10rem] py-10 bg-gray-200">
      <div className="bg-white rounded-xl overflow-hidden py-5 px-5">
        <div className="flex justify-between">
          <h1 className="text-xl lg:text-2xl font-semibold">
            Lecture Creation
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-[#00ffff] px-2 rounded-md font-medium"
          >
            <IoIosArrowRoundBack /> Back to course setup
          </button>
        </div>
        {addCourseData.error && (
          <h1 className="text-red-500 mt-5">{addCourseData.error}</h1>
        )}
        <div className="py-10 flex flex-col lg:flex-row gap-10 justify-between">
          <div className="left w-full lg:w-[49%] flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <MdOutlineDashboardCustomize className="text-4xl lg:text-5xl bg-[#00ffff] text-white p-2 rounded-full" />
              <h3 className="text-xl lg:text-2xl italic font-semibold">
                Customize your chapter
              </h3>
            </div>
            <InputTextComponent
              title="Chapter title"
              name="lecture_name"
              isEditing={isEditing.lecture_name}
              inputBoxValue={lectureInfo.lecture_name}
              setInputBoxValue={(value) =>
                setLectureInfo((prev) => ({ ...prev, lecture_name: value }))
              }
              showData={lectureInfo.lecture_name}
              textBox="input"
              type="chapter"
            />
            <InputTextComponent
              title="Chapter Description"
              name="lecture_desc"
              isEditing={isEditing.lecture_desc}
              inputBoxValue={lectureInfo.lecture_desc}
              setInputBoxValue={(value) =>
                setLectureInfo((prev) => ({ ...prev, lecture_desc: value }))
              }
              showData={lectureInfo.lecture_desc}
              textBox="textarea"
              type="chapter"
            />
          </div>
          <div className="right w-full lg:w-[49%] flex flex-col gap-16">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <AiOutlineVideoCameraAdd className="text-4xl lg:text-5xl bg-[#00ffff] text-white p-2 rounded-full" />
                <h3 className="text-xl lg:text-2xl italic font-semibold">
                  Add a video
                </h3>
              </div>
              <VideoUpload
                title="Lecture Video (Optional)"
                name="lecture_video"
                isEditing={isEditing.lecture_video}
                videoUrl={lectureInfo.lecture_video}
                setVideoUrl={(url) =>
                  setLectureInfo((prev) => ({ ...prev, lecture_video: url }))
                }
                deleteVideo={handleVideoDeleteClick}
                type="chapter"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLecture;
