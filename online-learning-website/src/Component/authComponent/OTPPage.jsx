import React, { useContext, useRef } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "../LoadingSpinner";
import { SignupContext } from "../../Store/ContextFiles/signup-store";

const OTPPage = () => {
  const { finalSubmission, signupData, setError, error } =
    useContext(SignupContext);
  const form = useRef();
  const submitForm = () => {
    const formData = new FormData(form.current);
    finalSubmission(Number(formData.get("otp")));
  };
  return (
    <div className="flex justify-center mt-20 mb-20 px-10 sm:px-20 xl:px-[10rem]">
      {signupData.loading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-[30rem] w-full">
          <form
            className="w-full flex flex-col gap-5 justify-between items-center"
            ref={form}
          >
            <h3 className="text-center text-lg">
              OTP sent to your entered mail id
            </h3>
            <input
              type="Number"
              placeholder="Enter OTP"
              name="otp"
              maxLength={4}
              onChange={() => setError("")}
              className=" h-full bg-transparent border border-[#00ffff] outline-none p-2 text-xl"
            />
            {error && (
              <div className="">
                <h1 className="text-red-500">{error}</h1>
              </div>
            )}
            <motion.p
              className="w-fit border-2 py-3 px-5 rounded-xl cursor-pointer text-base md:text-lg xl:text-xl inline-block font-medium text-center bg-[#00ffff] text-black"
              onClick={submitForm}
              whileHover={{ scale: 0.9 }}
            >
              Verify OTP
            </motion.p>
            <p>OTP will expire in 10 miniutes</p>
          </form>
        </div>
      )}
    </div>
  );
};

export default OTPPage;
