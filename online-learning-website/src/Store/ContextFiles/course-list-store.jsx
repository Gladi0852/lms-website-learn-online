import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";

const INITIAL_STATE = {
  data: "",
  loading: true,
  error: null,
};
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";
const FETCH_START = "FETCH_START";

const courseDataReducer = (state, action) => {
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
export const CoursesList = createContext({
  courseData: INITIAL_STATE,
  fetchCourses: async () => {},
});
const CoursesListProvider = ({ children }) => {
  const [courseData, dispatchCourseData] = useReducer(
    courseDataReducer,
    INITIAL_STATE
  );
  const [category, setCategory] = useState(() => {
    const storedCategory = sessionStorage.getItem("category");
    return storedCategory ? storedCategory : "All";
  });
  const [price, setPrice] = useState(() => {
    const storedPrice = sessionStorage.getItem("price");
    return storedPrice ? storedPrice : "All";
  });
  const handleBeforeUnload = () => {
    const storageKey = `courses_${category}_${price}`;
    sessionStorage.removeItem(storageKey);
  };
  window.addEventListener("load", handleBeforeUnload);

  const fetchCourses = async (category = "All", price = "All") => {
    dispatchCourseData({ type: FETCH_START });
    const storageKey = `courses_${category}_${price}`;
    const storedData = sessionStorage.getItem(storageKey);
    const controller = new AbortController();
    const signal = controller.signal;

    if (storedData) {
      dispatchCourseData({
        type: FETCH_SUCCESS,
        payload: { data: JSON.parse(storedData) },
      });
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/course?category=${category}&price=${price}`,
        { signal }
      );
      const responseData = response.data;
      if (responseData.length === 0) {
        dispatchCourseData({ type: FETCH_SUCCESS, payload: { data: "NIL" } });
      } else {
        sessionStorage.setItem(storageKey, JSON.stringify(responseData));
        dispatchCourseData({
          type: FETCH_SUCCESS,
          payload: { data: responseData },
        });
      }
    } catch (error) {
      console.error("There was an error making the request", error);
      dispatchCourseData({
        type: FETCH_ERROR,
        payload: { error: "Error fetching data" },
      });
    }
    return () => {
      controller.abort();
    };
  };

  useEffect(() => {
    sessionStorage.setItem("category", category);
    sessionStorage.setItem("price", price);
  }, [category, price]);

  useEffect(() => {
    fetchCourses(category, price);
  }, []);

  return (
    <CoursesList.Provider
      value={{
        courseData,
        fetchCourses,
        category,
        setCategory,
        price,
        setPrice,
      }}
    >
      {children}
    </CoursesList.Provider>
  );
};

export default CoursesListProvider;
