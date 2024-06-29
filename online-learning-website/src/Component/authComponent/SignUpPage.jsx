import React, { useContext } from "react";
import { SignupContext } from "../../Store/ContextFiles/signup-store";
import SignupForm from "./SignupForm";
import OTPPage from "./OTPPage";
import SuccessPage from "./SuccessPage";

const SignUpPage = () => {
  const { signupData } = useContext(SignupContext);
  return (
    <>
      {signupData.initial && <SignupForm />}
      {signupData.otpCom && <OTPPage />}
      {signupData.success && (
        <SuccessPage
          msg1="Your account has been created"
          msg2="to login page"
          link="login"
        />
      )}
    </>
  );
};

export default SignUpPage;
