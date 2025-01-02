import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const base_url = "https://lms-backend-1-je3i.onrender.com";
// const base_url = "http://localhost:8080";

const INITIAL_STATE = {
  courseName: "",
  courseDesc: "",
  courseImage: "",
  courseLectures: [],
  courseStatus: false,
  initialPage: true,
  pageError: "",
  lectureId: "",
  error: "",
};
const SET_DATA = "SET_DATA";
const INITIAL_PAGE_TRUE = "INITIAL_PAGE_TRUE";
const INITIAL_PAGE_FALSE = "INITIAL_PAGE_FALSE";
const SET_ERROR = "SET_ERROR";
const SET_PAGE_ERROR = "SET_PAGE_ERROR";
const SET_LECTURE_ID = "SET_LECTURE_ID";
const SET_COURSE_LECTURE = "SET_COURSE_LECTURE";
const SET_COURSE_STATUS = "SET_COURSE_STATUS";
const AddCourseReducer = (state, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        courseName: action.payload.courseName,
        courseDesc: action.payload.courseDesc,
        courseImage: action.payload.courseImage,
        courseLectures: action.payload.courseLectures,
        courseStatus: action.payload.courseStatus,
      };
    case INITIAL_PAGE_FALSE:
      return { ...state, initialPage: false };
    case INITIAL_PAGE_TRUE:
      return { ...state, initialPage: true };
    case SET_ERROR:
      return { ...state, error: action.payload.error };
    case SET_PAGE_ERROR:
      return { ...state, pageError: action.payload.error };
    case SET_LECTURE_ID:
      return { ...state, lectureId: action.payload.id };
    case SET_COURSE_LECTURE:
      return { ...state, courseLectures: action.payload.courseLectures };
    case SET_COURSE_STATUS:
      return { ...state, courseStatus: true };
  }
};

export const AddCourseContext = createContext({
  addCourseData: INITIAL_STATE,
});

const AddCourseContextProvider = ({ children }) => {
  const [addCourseData, dispatchReducer] = useReducer(
    AddCourseReducer,
    INITIAL_STATE
  );
  const navigate = useNavigate();
  const params = useParams();
  const [isEditing, setIsEditing] = useState({
    course_name: false,
    course_desc: false,
    course_image: false,
    lecture_name: false,
    lecture_desc: false,
    lecture_video: false,
  });
  useEffect(() => {
    const fetchCourse = async () => {
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        try {
          const response = await axios.get(
            `${base_url}/draftCourses/fetchCourseById`,
            {
              params: { id: params.objectId },
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          dispatchReducer({
            type: SET_DATA,
            payload: {
              courseName: response.data.course_name,
              courseDesc: response.data.course_desc,
              courseImage: response.data.course_image,
              courseLectures: response.data.course_lectures,
              courseStatus: response.data.status,
            },
          });
        } catch (error) {
          if (error.response.status === 404) {
            dispatchReducer({
              type: SET_PAGE_ERROR,
              payload: { error: "Page not found" },
            });
          }
        }
      }
    };

    fetchCourse();
  }, [params.objectId]);

  const handleDeleteClick = async () => {
    const userToken = localStorage.getItem("userToken");
    const courseId = params.objectId;

    if (userToken) {
      const confirmation = window.confirm(
        "Are you sure you want to delete this course?"
      );
      if (confirmation) {
        try {
          await axios.delete(`${base_url}/draftCourses/deleteCourse`, {
            params: { id: courseId },
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          alert("Course deleted successfully.");
          navigate("/dashboard/my-contents", { replace: true }); // Redirect to the courses list or another page
        } catch (error) {
          console.error("Error deleting the course:", error);
          alert("There was an error deleting the course. Please try again.");
        }
      }
    } else {
      alert("User not authenticated.");
    }
  };
  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };
  const courseUpdateCall = async (field, value, type) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      let formData = new FormData();
      formData.append("field", field);
      if (value instanceof File) {
        formData.append("file", value);
      } else {
        formData.append("value", value);
      }
      try {
        if (type === "course") {
          const response = await axios.patch(
            `${base_url}/draftCourses/updateCourse`,
            formData,
            {
              params: { id: params.objectId },
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
        } else if (type === "chapter") {
          formData.append("lectureId", addCourseData.lectureId);
          const response = await axios.patch(
            `${base_url}/draftCourses/updateLecture`,
            formData,
            {
              params: { id: params.objectId },
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          if (response.status === 200) {
            dispatchReducer({
              type: SET_COURSE_LECTURE,
              payload: {
                courseLectures: response.data.courseInfo.course_lectures,
              },
            });
            return "Upload";
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleSaveClick = async (field, value, type) => {
    if (field === "course_desc" || field === "lecture_desc") {
      if (value.length > 100) {
        return courseUpdateCall(field, value, type);
      } else {
        dispatchReducer({
          type: SET_ERROR,
          payload: { error: "Minimum 100 character needed" },
        });
        const timer = setTimeout(() => {
          dispatchReducer({
            type: SET_ERROR,
            payload: { error: "" },
          });
        }, 3000);

        return () => {
          clearTimeout(timer);
        };
      }
    } else {
      return courseUpdateCall(field, value, type);
    }
  };
  const handleCancelButton = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };
  const editLecturePage = (lectureId) => {
    dispatchReducer({ type: INITIAL_PAGE_FALSE });
    dispatchReducer({ type: SET_LECTURE_ID, payload: { id: lectureId } });
  };
  const handlePublishButton = async (courseInfo) => {
    if (
      courseInfo.courseName &&
      courseInfo.courseDesc &&
      courseInfo.courseImage &&
      courseInfo.courseLectures.length > 0 &&
      courseInfo.courseLectures.every((lecture) => lecture.lecture_status)
    ) {
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        try {
          const response = await axios.put(
            `${base_url}/publisCourse/`,
            {},
            {
              params: { id: params.objectId },
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          if (response.status === 200) {
            dispatchReducer({ type: SET_COURSE_STATUS });
            alert("Your course is now Published");
            navigate("/dashboard/my-contents", { replace: true });
          }

          // navigate(-1);
        } catch (error) {
          if (error.response.status === 400) {
            console.log(error.response.data.message);
          } else console.log(error);
        }
      }
    } else {
      dispatchReducer({
        type: SET_ERROR,
        payload: {
          error:
            "Please fill all the data or maybe all created chapter is not completed",
        },
      });

      const timer = setTimeout(() => {
        dispatchReducer({
          type: SET_ERROR,
          payload: { error: "" },
        });
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  };
  const updateCourseLecture = (lectures) => {
    dispatchReducer({
      type: SET_COURSE_LECTURE,
      payload: { courseLectures: lectures },
    });
  };
  return (
    <AddCourseContext.Provider
      value={{
        addCourseData,
        handleDeleteClick,
        handleEditClick,
        handleSaveClick,
        isEditing,
        editLecturePage,
        handlePublishButton,
        handleCancelButton,
        params,
        updateCourseLecture,
      }}
    >
      {children}
    </AddCourseContext.Provider>
  );
};

export default AddCourseContextProvider;
