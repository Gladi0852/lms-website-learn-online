import React from "react";

import LoginContextProvider from "../Store/ContextFiles/login-context";
import { LoginForm } from "../Component/authComponent/LoginForm";

const Login = () => {
  return (
    <LoginContextProvider>
      <LoginForm />
    </LoginContextProvider>
  );
};

export default Login;

//when using only react redux not the redux toolkit
// import { useDispatch } from "react-redux";

// const dispatch = useDispatch();
// dispatch({
//   type: "LOGIN",
//   payload: {
//     email: formData.get("email"),
//     password: formData.get("password"),
//   },
// });
