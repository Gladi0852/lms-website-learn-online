import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    name: "",
    email: "",
    role: "",
    gender: "",
    phone_number: "",
    about: "",
    profile_photo: "",
    designation: "",
    enrolled_course: [],
  },
  reducers: {
    setInfo: (state, action) => {
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
        gender: action.payload.gender,
        phone_number: action.payload.phone_number,
        about: action.payload.about,
        profile_photo: action.payload.photo,
        ...(state.role === "Teacher" && {
          designation: action.payload.designation,
        }),
        enrolled_course: action.payload.enrolledCourse,
      };
    },
    setBasicDetails: (state, action) => {
      return {
        ...state,
        name: action.payload.name,
        gender: action.payload.gender,
        phone_number: action.payload.phone_number,
        about: action.payload.about,
        ...(state.role === "Teacher" && {
          designation: action.payload.designation,
        }),
      };
    },
    setProfilePhoto: (state, action) => {
      return {
        ...state,
        profile_photo: action.payload.photo,
      };
    },
  },
});

export const userInfoAction = userInfoSlice.actions;
export const { setInfo } = userInfoSlice.actions;
export default userInfoSlice;
