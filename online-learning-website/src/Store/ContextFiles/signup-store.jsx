import { createContext, useReducer, useRef, useState } from "react";
import axios from "axios";

const base_url = "https://lms-backend-1-je3i.onrender.com";
// const base_url = "http://localhost:8080";

const INITIAL_STATE = {
  initial: true,
  otpCom: false,
  success: false,
  loading: false,
  currOTP: 0,
};
const SHOW_OTP_PAGE = "SHOW_OTP_PAGE";
const OTP_GENERATED = "OTP_GENERATING";
const LOADING_ON = "LOADING_ON";
const LOADING_OFF = "LOADING_OFF";
const OTP_EXPIRED = "OTP_EXPIRED";
const SHOW_SUCCESS = "SHOW_SUCCESS";

const SignupReducer = (state, action) => {
  switch (action.type) {
    case SHOW_OTP_PAGE:
      return { ...state, initial: false, otpCom: true };
    case LOADING_ON:
      return { ...state, loading: true };
    case OTP_GENERATED:
      return { ...state, currOTP: action.payload.data };
    case LOADING_OFF:
      return { ...state, loading: false };
    case OTP_EXPIRED:
      return { ...state, currOTP: 0 };
    case SHOW_SUCCESS:
      return { ...state, otpCom: false, success: true };
    default:
      return state;
  }
};

export const SignupContext = createContext({
  signupData: INITIAL_STATE,
  handleSubmit: async () => {},
  finalSubmission: () => {},
});
const SignupContextProvider = ({ children }) => {
  const [signupData, dispatchSignupData] = useReducer(
    SignupReducer,
    INITIAL_STATE
  );
  const timeoutRef = useRef(null);
  const form = useRef();
  const [activeRole, setActiveRole] = useState("Student");
  const [error, setError] = useState("");
  const userData = useRef({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password");

    userData.current = { name, email, password, confirmPassword };
    const controller = new AbortController();
    const signal = controller.signal;
    if (password.length < 8) {
      setError("Password must be at least 8 characters long!");
    } else if (password !== confirmPassword) {
      setError("Both Password Should Match!");
    } else {
      try {
        const response = await axios.get(
          `${base_url}/auth/signup/find`,
          {
            params: {
              email: email,
            },
          },
          { signal }
        );
        if (response.data) setError("User Already Exist. You Can Login");
        else {
          dispatchSignupData({ type: SHOW_OTP_PAGE });
          sendOTP();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    return () => {
      controller.abort();
    };
  };
  const sendOTP = async () => {
    const randomOTP = Math.floor(1000 + Math.random() * 9000);
    const controller = new AbortController();
    const signal = controller.signal;
    dispatchSignupData({
      type: LOADING_ON,
      payload: { data: randomOTP },
    });
    dispatchSignupData({
      type: OTP_GENERATED,
      payload: { data: randomOTP },
    });
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    try {
      await axios.post(
        `${base_url}/api/emailVerify`,
        {
          email: userData.current.email,
          otp: randomOTP,
        },
        { signal }
      );
      dispatchSignupData({ type: LOADING_OFF });
      timeoutRef.current = setTimeout(() => {
        dispatchSignupData({ type: OTP_EXPIRED });
        alert("OTP Expired!");
      }, 600000);
    } catch (error) {
      console.error("Error sending OTP: ", error);
    }
    return () => {
      controller.abort();
    };
  };
  const finalSubmission = async (otp) => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (otp === signupData.currOTP) {
      dispatchSignupData({ type: SHOW_SUCCESS });
      dispatchSignupData({ type: LOADING_ON });
      try {
        await axios.post(`${base_url}/auth/signup/add`, {
          name: userData.current.name,
          email: userData.current.email,
          password: userData.current.password,
          role: activeRole,
        });
        dispatchSignupData({ type: LOADING_OFF });
        clearTimeout(timeoutRef.current);
        dispatchSignupData({ type: OTP_EXPIRED });
        userData.current = {
          name: "",
          email: "",
          password: 0,
          confirmPassword: 0,
        };
      } catch (error) {
        console.log(error);
        dispatchSignupData({ type: LOADING_OFF });
      }
    } else {
      setError("OTP mismatch");
    }
    return () => {
      controller.abort();
    };
  };

  return (
    <SignupContext.Provider
      value={{
        signupData,
        handleSubmit,
        finalSubmission,
        activeRole,
        setActiveRole,
        error,
        setError,
        form,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export default SignupContextProvider;

// if (action.type === SHOW_OTP_PAGE) {
//   return {
//     ...state,
//     initial: false,
//     otpCom: true,
//   };
// } else if (action.type === LOADING_ON) {
//   return {
//     ...state,
//     loading: true,
//   };
// } else if (action.type === OTP_GENERATED) {
//   return {
//     ...state,
//     currOTP: action.payload.data,
//   };
// } else if (action.type === LOADING_OFF) {
//   return {
//     ...state,
//     loading: false,
//   };
// } else if (action.type === OTP_EXPIRED) {
//   return {
//     ...state,
//     currOTP: 0,
//   };
// } else if (action.type === SHOW_SUCCESS) {
//   return {
//     ...state,
//     otpCom: false,
//     success: true,
//   };
// }
