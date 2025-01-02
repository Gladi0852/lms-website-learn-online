import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { loginStatusAction } from "../../Store/Slices/loginStatusSlice";
import { userInfoAction } from "../../Store/Slices/userInfoSlice";
import { useNavigate } from "react-router-dom";

const base_url = "https://lms-backend-1-je3i.onrender.com";
// const base_url = "http://localhost:8080";

const AutoLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${base_url}/auth/verifyToken`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (response.status === 200) {
          dispatch(loginStatusAction.authorization({ status: true }));
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
          sessionStorage.setItem("auth", true);
        }
      } catch (error) {
        // console.log(error);
        if (error.response.status === 401) {
          localStorage.removeItem("userToken");
          sessionStorage.removeItem("auth");
          dispatch(loginStatusAction.authorization({ status: false }));
          window.location.reload();
          navigate("/");
        } else {
          console.log(error.message);
        }
      }
    };
    verifyToken();
  }
  return <></>;
};

export default AutoLogin;
