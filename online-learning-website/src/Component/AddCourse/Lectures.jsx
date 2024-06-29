import React, { useContext, useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { AddCourseContext } from "../../Store/ContextFiles/addCourse-store";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const Lectures = ({ courseLectures }) => {
  const { editLecturePage, params, updateCourseLecture } =
    useContext(AddCourseContext);
  const [lectures, setLectures] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleAddClick = () => {
    setShowInput(true);
  };
  const handleCancelClick = () => {
    setShowInput(false);
    setInputValue("");
  };
  const handleCreateClick = async () => {
    if (inputValue.trim() !== "") {
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        try {
          const response = await axios.patch(
            `http://localhost:8080/draftCourses/updateLecture`,
            { value: inputValue },
            {
              params: { id: params.objectId },
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          if (response.status === 200) {
            setLectures(response.data.courseInfo.course_lectures);
            updateCourseLecture(response.data.courseInfo.course_lectures);
          }
          setShowInput(false);
          setInputValue("");
        } catch (error) {
          if (error.response.status === 400)
            alert("This name is already added");
          console.log(error);
        }
      }
    }
  };
  const handleDeleteClick = async (lectureId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this lecture?"
    );
    if (isConfirmed) {
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        try {
          const response = await axios.delete(
            `http://localhost:8080/draftCourses/deleteChapter`,
            {
              data: {
                lectureId: lectureId,
              },
              params: { id: params.objectId }, // query parameters
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          if (response.status === 200) {
            const updatedLectures = lectures.filter(
              (lecture) => lecture._id !== lectureId
            );
            setLectures(updatedLectures);
            updateCourseLecture(updatedLectures);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  useEffect(() => {
    setLectures(courseLectures);
  }, [courseLectures]);
  return (
    <div className="bg-gray-200 p-5 rounded-lg">
      <div className="flex justify-between mb-3">
        <h4 className="text-base md:text-lg font-bold">Course Lectures</h4>
        {showInput ? (
          <button
            className="flex items-center gap-2 text-lg"
            onClick={handleCancelClick}
          >
            <p className="font-medium">Cancel</p>
          </button>
        ) : (
          <button
            className="flex items-center gap-2 text-lg"
            onClick={handleAddClick}
          >
            <IoMdAddCircleOutline />
            <p className="font-medium text-sm md:text-base">Add a lecture</p>
          </button>
        )}
      </div>
      <div className="lectures">
        {lectures.length > 0
          ? lectures.map((lecture, index) => (
              <div
                key={index}
                className="mb-2 flex px-5 py-2 bg-gray-300 border border-gray-300 rounded-lg items-center justify-between"
              >
                <p
                  className={`text-white lg:text-black px-3 rounded-md lg:px-0 lg:rounded-none ${
                    lecture.lecture_status
                      ? "bg-blue-600 lg:bg-transparent"
                      : "bg-gray-500 lg:bg-transparent"
                  }`}
                >
                  {lecture.lecture_name}
                </p>
                <div className="flex items-center gap-4">
                  <p
                    className={`text-center text-white rounded-full py-1 hidden lg:block px-3 ${
                      lecture.lecture_status ? "bg-blue-600" : "bg-gray-500 "
                    }`}
                  >
                    {lecture.lecture_status ? "Completed" : "Incomplete"}
                  </p>
                  <Link to={`edit-chapter/${lecture._id}`}>
                    <MdEdit
                      className="text-xl cursor-pointer"
                      onClick={() => editLecturePage(lecture._id)}
                    />
                  </Link>
                  <MdDelete
                    className="text-xl cursor-pointer"
                    onClick={() => handleDeleteClick(lecture._id)}
                  />
                </div>
              </div>
            ))
          : !showInput && (
              <h4 className="text-lg text-gray-500 italic">No lectures</h4>
            )}
        {showInput && (
          <div className="mb-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter lecture title"
              className="border rounded-lg p-2 w-full text-lg"
            />
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 text-lg rounded-lg"
              onClick={handleCreateClick}
            >
              Create
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lectures;
