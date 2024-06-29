import React from "react";
import SignupContextProvider from "../Store/ContextFiles/signup-store";
import SignUpPage from "../Component/authComponent/SignUpPage";

const SignUp = () => {
  return (
    <SignupContextProvider>
      <SignUpPage />
    </SignupContextProvider>
  );
};

export default SignUp;

// const currOTP = useRef();
// // const [otpSend, setOTPSend] = useState(false);
// // const [countDown, setCountDown] = useState();
// const [error, setError] = useState("");
// const [activeRole, setActiveRole] = useState("Student");
// const userData = { name: null, email: null, password: null };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const formData = new FormData(form.current);
//   userData.name = formData.get("name");
//   userData.email = formData.get("email");
//   userData.password = formData.get("password");
//   const confirmPassword = formData.get("confirm_password");
//   if (userData.password !== confirmPassword) {
//     setError("Both Password Should Match!");
//   } else {
//     try {
//       let response;
//       if (activeRole === "Teacher") {
//         response = await axios.get(
//           "http://localhost:8080/auth/teacher/find",
//           {
//             params: {
//               email: userData.email,
//             },
//           }
//         );
//       } else if (activeRole === "Student") {
//         console.log("Coming Soon");
//       }
//       if (!response) console.log("Coming Soon");
//       else if (response.data) setError("User Already Exist. You Can Login");
//       else {
//         setShowCom((prevState) => ({
//           ...prevState,
//           otpCom: true,
//           initial: false,
//         }));
//         sendOTP();
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }
// };
// const sendOTP = async () => {
//   setShowCom((prevState) => ({
//     ...prevState,
//     loading: true,
//   }));
//   // const email = formData.get("email");
//   currOTP.current = Math.floor(1000 + Math.random() * 9000);
//   if (timeoutRef.current) {
//     clearTimeout(timeoutRef.current);
//   }
//   try {
//     await axios.post("http://localhost:8080/api/emailVerify", {
//       email: userData.email,
//       otp: currOTP.current,
//     });
//     setShowCom((prevState) => ({
//       ...prevState,
//       loading: false,
//     }));
//     timeoutRef.current = setTimeout(() => {
//       currOTP.current = 0;
//       alert("OTP Expired!");
//     }, 600000);
//     // setOTPSend(true);
//   } catch (error) {
//     console.error("Error sending OTP: ", error);
//   }
// };
// const finalSubmission = (otp) => {
//   if (otp === currOTP.current) {
//     console.log("data = ", userData.email);
//   } else {
//     setError("OTP mismatch");
//   }
// };
// const startCountDown = () => {
//   const timer = setInterval(() => {
//     setCountDown((prevCountDown) => {
//       if (prevCountDown <= 0) {
//         clearInterval(timer);
//         return 0;
//       }
//       return prevCountDown - 1;
//     });
//   }, 1000);

//   return () => clearInterval(timer);
// };
// useEffect(() => {
//   if (otpSend) {
//     setCountDown(120);
//     startCountDown();
//     const timer = setTimeout(() => {
//       setOTPSend(false);
//     }, 120000); // 120 seconds
//     return () => clearTimeout(timer); // Clean up the timer
//   }
// }, [otpSend]);
