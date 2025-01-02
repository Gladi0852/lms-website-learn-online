import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import ErrorPage from "./ErrorPage";
import axios from "axios";
import IndividualCourseContent from "./IndividualCourseContent";
import { useSelector } from "react-redux";

const base_url = "https://lms-backend-1-je3i.onrender.com";
// const base_url = "http://localhost:8080";

const IndividualCoursePage = () => {
  const { enrolled_course, email } = useSelector((store) => store.userInfo);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const [error, setError] = useState("");
  const [enrolledStatus, setEnrolledStatus] = useState(false);
  const [message, setmessage] = useState("");
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseID = params.courseID;
        const response = await axios.get(`${base_url}/course/fetchCourse`, {
          params: { courseID },
        });
        if (response.status === 200) {
          if (response.data.email === email) {
            setEnrolledStatus(true);
            setmessage("Don't worry, owner don't need to enroll or buy course");
          }
          setCourseData(response.data);
          setLoading(false);
        }
      } catch (error) {
        setError("Course Not Found");
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.courseID]);
  useEffect(() => {
    const checkEnrolledStatus = () => {
      const courseID = params.courseID;
      if (enrolled_course.some((course) => course._id === courseID)) {
        setEnrolledStatus(true);
      } else setEnrolledStatus(false);
    };
    checkEnrolledStatus();
  }, [enrolled_course]);
  const handleEnrollButton = async () => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      try {
        const response = await axios.patch(
          `${base_url}/auth/addCourseAsEnrolled`,
          { courseID: params.courseID },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (response.status === 200) {
          setEnrolledStatus(true);
          alert("Congrats!!! You are now enrolled to this course");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      {loading ? (
        <div className="w-full h-[50vh] flex flex-col items-center justify-center">
          <LoadingSpinner />
          <h3 className="text-3xl">Loading Courses...</h3>
        </div>
      ) : (
        <div>
          {courseData ? (
            <IndividualCourseContent
              courseData={courseData}
              handleEnroll={handleEnrollButton}
              enrolledStatus={enrolledStatus}
              message={message}
            />
          ) : (
            <ErrorPage error={error} />
          )}
        </div>
      )}
    </div>
  );
};

export default IndividualCoursePage;
