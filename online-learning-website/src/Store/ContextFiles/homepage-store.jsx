import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

const CATEGORIES_INITIAL_STATE = {
  data: "",
  loading: true,
  error: null,
};
const COURSES_INITIAL_STATE = {
  data: "",
  loading: true,
  error: null,
};
const TEACHER_INITIAL_STATE = {
  data: "",
  loading: true,
  error: null,
};

const FETCH_START = "FETCH_START";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

const commonReducer = (state, action) => {
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
  }
};

export const HomePageContext = createContext({
  categories: CATEGORIES_INITIAL_STATE,
  topCourses: COURSES_INITIAL_STATE,
  teachers: TEACHER_INITIAL_STATE,
});

const HomePageContextProvider = ({ children }) => {
  const [categories, dispatchCategories] = useReducer(
    commonReducer,
    CATEGORIES_INITIAL_STATE
  );
  const [courses, dispatchCourses] = useReducer(
    commonReducer,
    COURSES_INITIAL_STATE
  );
  const [teachers, dispatchTeachers] = useReducer(
    commonReducer,
    TEACHER_INITIAL_STATE
  );

  const fetchCategories = async () => {
    dispatchCategories({ type: FETCH_START });
    const storedData = sessionStorage.getItem("topCategories");
    const controller = new AbortController();
    const signal = controller.signal;

    if (storedData) {
      dispatchCategories({
        type: FETCH_SUCCESS,
        payload: { data: JSON.parse(storedData) },
      });
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:8080/course/category",
        { signal }
      );
      const responseData = response.data.slice(0, 4);
      if (responseData.length === 0) {
        dispatchCategories({ type: FETCH_SUCCESS, payload: { data: "NIL" } });
      } else {
        sessionStorage.setItem("topCategories", JSON.stringify(responseData));
        dispatchCategories({
          type: FETCH_SUCCESS,
          payload: { data: responseData },
        });
      }
    } catch (error) {
      console.log("There was an error making the request", error);
      dispatchCategories({
        type: FETCH_ERROR,
        payload: { error: "Error Fetching Data" },
      });
    }
    return () => {
      controller.abort();
    };
  };
  const fetchTopCourses = async () => {
    dispatchCourses({ type: FETCH_START });
    const storedData = sessionStorage.getItem("topCourses");
    const controller = new AbortController();
    const signal = controller.signal;

    if (storedData) {
      dispatchCourses({
        type: FETCH_SUCCESS,
        payload: { data: JSON.parse(storedData) },
      });
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:8080/course/getlimited",
        { signal }
      );
      const responseData = response.data;
      if (responseData.length === 0) {
        dispatchCourses({ type: FETCH_SUCCESS, payload: { data: "NIL" } });
      } else {
        sessionStorage.setItem("topCourses", JSON.stringify(responseData));
        dispatchCourses({
          type: FETCH_SUCCESS,
          payload: { data: responseData },
        });
      }
    } catch (error) {
      console.log("There was an error making the request", error);
      dispatchCourses({
        type: FETCH_ERROR,
        payload: { error: "Error Fetching Data" },
      });
    }
    return () => {
      controller.abort();
    };
  };
  const fetchTeacher = async () => {
    dispatchTeachers({ type: FETCH_START });
    const storedData = sessionStorage.getItem("teacher");
    const controller = new AbortController();
    const signal = controller.signal;

    if (storedData) {
      dispatchTeachers({
        type: FETCH_SUCCESS,
        payload: { data: JSON.parse(storedData) },
      });
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:8080/teacher/getlimited",
        { signal }
      );
      const responseData = response.data;
      if (responseData.length === 0) {
        dispatchTeachers({ type: FETCH_SUCCESS, payload: { data: "NIL" } });
      } else {
        sessionStorage.setItem("teacher", JSON.stringify(responseData));
        dispatchTeachers({
          type: FETCH_SUCCESS,
          payload: { data: responseData },
        });
      }
    } catch (error) {
      console.log("There was an error making the request", error);
      dispatchTeachers({
        type: FETCH_ERROR,
        payload: { error: "Error Fetching Data" },
      });
    }
    return () => {
      controller.abort();
    };
  };

  useEffect(() => {
    fetchCategories();
    fetchTopCourses();
    fetchTeacher();
  }, []);

  return (
    <HomePageContext.Provider value={{ categories, courses, teachers }}>
      {children}
    </HomePageContext.Provider>
  );
};

export default HomePageContextProvider;
