import React, { useContext, useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { SignupContext } from "../../Store/ContextFiles/signup-store";
import LoadingSpinner from "../LoadingSpinner";

const SuccessPage = ({ msg1, msg2, link }) => {
  const { signupData } = useContext(SignupContext);
  const [timer, setTimer] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/${link}`, { replace: true });
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="flex justify-center pt-[15vw] pb-20 px-10 sm:px-20 xl:px-[10rem] bg-[#00ffff] translate-y-[-18vw] sm:translate-y-[-11vw] md:translate-y-[-10vw] lg:translate-y-[-8vw] xl:translate-y-[-6vw] 2xl:translate-y-[-5vw]  w-[100vw] h-[100vh] fixed z-50">
      {signupData.loading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-[30rem] w-full h-fit border-2 rounded-xl border-green-500 bg-white p-5 flex flex-col items-center gap-5">
          <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-medium text-green-500">
            SUCCESS!
          </h1>
          <p className="text-lg 2xl:text-2xl">{msg1}</p>
          <FiCheckCircle className="text-7xl lg:text-8xl 2xl:text-9xl text-green-500" />
          <p className="xl:text-xl">
            Redirecting {msg2} in {timer} seconds
          </p>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
