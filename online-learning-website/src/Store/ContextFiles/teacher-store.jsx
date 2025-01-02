import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

const base_url = "https://lms-backend-1-je3i.onrender.com";
// const base_url = "http://localhost:8080";

const INITIAL_STATE = {
  data: "",
  loading: true,
  error: null,
  totalPage: 0,
};
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";
const FETCH_START = "FETCH_START";
const UPDATE_PAGE = "UPDATE_PAGE";

const teacherDetailsReducer = (state, action) => {
  if (action.type === FETCH_START) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  } else if (action.type === FETCH_SUCCESS) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  } else if (action.type === FETCH_ERROR) {
    return {
      ...state,
      data: "",
      loading: false,
      error: action.payload.error,
    };
  } else if (action.type === UPDATE_PAGE) {
    return {
      ...state,
      totalPage: action.payload.data,
    };
  }
};

export const TeacherContext = createContext({
  teachersData: INITIAL_STATE,
  fetchTeachers: async () => {},
});

const TeachersContextProvider = ({ children }) => {
  const [teachersData, dispatchTeachersData] = useReducer(
    teacherDetailsReducer,
    INITIAL_STATE
  );
  const fetchTeachers = async (pageNumber = 1) => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatchTeachersData({ type: FETCH_START });

    const storedData = sessionStorage.getItem(`teachers_${pageNumber}`);

    if (storedData) {
      dispatchTeachersData({
        type: FETCH_SUCCESS,
        payload: { data: JSON.parse(storedData) },
      });
      return;
    }

    try {
      const response = await axios.get(
        `${base_url}/teacher?pageNumber=${pageNumber}`,
        { signal }
      );
      const responseData = response.data;
      // console.log(responseData);

      if (responseData.length === 0) {
        dispatchTeachersData({ type: FETCH_SUCCESS, payload: { data: "NIL" } });
      } else {
        sessionStorage.setItem(
          `teachers_${pageNumber}`,
          JSON.stringify(responseData)
        );
        dispatchTeachersData({
          type: FETCH_SUCCESS,
          payload: { data: responseData },
        });
      }
    } catch (error) {
      console.log("There was an error making the request", error);
      dispatchTeachersData({
        type: FETCH_ERROR,
        payload: { error: "Error Fetching Data" },
      });
    }
    return () => {
      controller.abort();
    };
  };
  const toatalTeacher = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await axios.get(`${base_url}/teacher/total`, {
        signal,
      });
      dispatchTeachersData({
        type: UPDATE_PAGE,
        payload: { data: Math.ceil(response.data / 4) },
      });
    } catch (error) {
      console.log("error");
    }
    return () => {
      controller.abort();
    };
  };
  useEffect(() => {
    fetchTeachers();
    toatalTeacher();
  }, []);

  return (
    <TeacherContext.Provider value={{ teachersData, fetchTeachers }}>
      {children}
    </TeacherContext.Provider>
  );
};

export default TeachersContextProvider;
