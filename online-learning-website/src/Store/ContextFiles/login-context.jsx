import axios from "axios";
import { createContext } from "react";
import { useDispatch } from "react-redux";
import { loginStatusAction } from "../Slices/loginStatusSlice";
import { userInfoAction } from "../Slices/userInfoSlice";

export const LoginContext = createContext({
  fetchUser: async () => {},
});

const LoginContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const loginUser = async (email, password) => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email,
          password,
        },
        { signal }
      );
      if (response.status === 200) {
        sessionStorage.setItem("auth", true);
        dispatch(loginStatusAction.success({ status: true }));
        dispatch(
          userInfoAction.setInfo({
            name: response.data.user.name,
            email: response.data.user.email,
            role: response.data.user.role,
            gender: response.data.user.gender,
            phone_number: response.data.user.phoneNumber,
            about: response.data.user.about,
            photo: response.data.user.profile_photo,
            ...(response.data.user.role === "Teacher" && {
              designation: response.data.user.designation,
            }),
            enrolledCourse: response.data.user.enrolled_course,
          })
        );
        const timer = setTimeout(() => {
          dispatch(loginStatusAction.success({ status: false }));
          dispatch(loginStatusAction.authorization({ status: true }));

          localStorage.setItem("userToken", response.data.token);
        }, 3050);

        return () => {
          dispatch(loginStatusAction.success({ status: false }));
          clearTimeout(timer);
        };
      }
    } catch (error) {
      if (error.response) {
        dispatch(
          loginStatusAction.status({ error: error.response.data.message })
        );
      } else {
        dispatch(
          loginStatusAction.status({
            error: "An error occurred. Please try again.",
          })
        );
      }
    }
  };
  return (
    <LoginContext.Provider value={{ loginUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
