import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  limitedEnrolledCourse: [],
  allEnrolledCourse: [],
  createdContent: [],
  limitedCreatedContent: [],
  publishedContents: 0,
  // loading: false,
};

const SET_LIMITED = "SET_LIMITED";
const SET_ALL = "SET_ALL";
const SET_CONTENT = "SET_CONTENT";
const SET_LIMITED_CONTENT = "SET_LIMITED_CONTENT";
const SET_TOTAL_PUBLISHED_CONTENT = "SET_TOTAL_PUBLISHED_CONTENT";
// const SET_LOADING = "SET_LOADING";

const DashboardReducer = (state, action) => {
  switch (action.type) {
    case SET_ALL:
      return {
        ...state,
        allEnrolledCourse: action.payload.courses,
      };
    case SET_LIMITED:
      return {
        ...state,
        limitedEnrolledCourse: action.payload.courses,
      };
    case SET_CONTENT:
      return {
        ...state,
        createdContent: action.payload.content,
      };
    case SET_LIMITED_CONTENT:
      return {
        ...state,
        limitedCreatedContent: action.payload.content,
      };
    case SET_TOTAL_PUBLISHED_CONTENT:
      return {
        ...state,
        publishedContents: action.payload.count,
      };
    // case SET_LOADING:
    //   return {
    //     ...state,
    //     loading: action.payload.loading,
    //   };
  }
};

export const DashboardContext = createContext({
  dashboardData: INITIAL_STATE,
});

const DashboardContextProvider = ({ children }) => {
  const [dashboardData, dispatchReducer] = useReducer(
    DashboardReducer,
    INITIAL_STATE
  );
  useEffect(() => {
    const fetchEnrolledCourse = async () => {
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        try {
          const response = await axios.get(
            `http://localhost:8080/auth/fetchEnrolledCourse`,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          if (response.status === 200) {
            const topCourses = response.data.slice(0, 3);
            dispatchReducer({
              type: SET_ALL,
              payload: { courses: response.data },
            });
            dispatchReducer({
              type: SET_LIMITED,
              payload: { courses: topCourses },
            });
          }
        } catch (error) {
          if (error.response.status === 404) {
            console.log(error.response);
          } else console.log(error);
        }
      }
    };
    const fetchContent = async () => {
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        try {
          const response = await axios.get(
            `http://localhost:8080/draftCourses/fetchCourses`,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          if (response.status === 200) {
            const publishedContents = response.data.filter(
              (item) => item.status === true
            ).length;
            dispatchReducer({
              type: SET_TOTAL_PUBLISHED_CONTENT,
              payload: { count: publishedContents },
            });
            const topContents = response.data
              .filter((item) => item.status === true)
              .slice(0, 3);
            dispatchReducer({
              type: SET_CONTENT,
              payload: { content: response.data },
            });
            dispatchReducer({
              type: SET_LIMITED_CONTENT,
              payload: { content: topContents },
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchContent();
    fetchEnrolledCourse();
  }, []);
  return (
    <DashboardContext.Provider value={{ dashboardData }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
