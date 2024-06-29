import { createSlice } from "@reduxjs/toolkit";

const loginStatusSlice = createSlice({
  name: "loginStatus",
  initialState: {
    error: "",
    success: false,
    isAuthorised: false,
  },
  reducers: {
    status: (state, action) => {
      state.error = action.payload.error;
    },
    success: (state, action) => {
      state.success = action.payload.status;
    },
    authorization: (state, action) => {
      state.isAuthorised = action.payload.status;
    },
  },
});

export const loginStatusAction = loginStatusSlice.actions;
export const { status, success, authorization } = loginStatusSlice.actions;
export default loginStatusSlice;
