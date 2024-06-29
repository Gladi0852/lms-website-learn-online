import React, { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SignupContext } from "../../Store/ContextFiles/signup-store";

const SignupForm = () => {
  const role = ["Student", "Teacher"];
  const { activeRole, setActiveRole, error, setError, handleSubmit, form } =
    useContext(SignupContext);
  return (
    <div className="w-full px-10 sm:px-20 xl:px-[10rem] py-10 flex justify-center">
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="relative max-w-[30rem] w-full border p-8 rounded-2xl border-[#00ffff]"
      >
        <h3 className="text-lg font-medium md:text-xl lg:text-2xl mb-10">
          Register and star your journey
        </h3>
        <h6 className="text-base lg:text-lg mb-2">Register Yourself as a</h6>
        <div className="w-full flex justify-between mb-10">
          {role.map((data, index) => (
            <motion.p
              key={index}
              onClick={() => setActiveRole(data)}
              whileTap={{ scale: 0.8 }}
              className={`w-[45%] border px-2 py-1 rounded-lg text-base md:text-lg lg:text-xl cursor-pointer text-center ${
                activeRole === data
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {data}
            </motion.p>
          ))}
        </div>
        <div className="input-box relative w-full h-[50px] border-b-2 border-[#00ffff] mb-10">
          <input
            type="text"
            required
            name="name"
            className="w-full h-full bg-transparent border-none outline-none"
          />
          <label className="absolute top-[50%] left-0 translate-y-[-50%] pointer-events-none transition-all text-lg font-medium">
            Full Name
          </label>
        </div>
        <div className="input-box relative w-full h-[50px] border-b-2 border-[#00ffff] mb-10">
          <input
            type="email"
            required
            name="email"
            onChange={() => setError("")}
            className="w-full h-full bg-transparent border-none outline-none"
          />
          <label className="absolute top-[50%] left-0 translate-y-[-50%] pointer-events-none transition-all text-lg font-medium">
            Email
          </label>
        </div>

        <div className="input-box relative w-full h-[50px] border-b-2 border-[#00ffff] mb-10">
          <input
            type="password"
            required
            name="password"
            onChange={() => setError("")}
            className="w-full h-full bg-transparent border-none outline-none"
          />
          <label className="absolute top-[50%] left-0 translate-y-[-50%] pointer-events-none transition-all text-lg font-medium">
            Password
          </label>
        </div>
        <div className="input-box relative w-full h-[50px] border-b-2 border-[#00ffff] mb-5">
          <input
            type="text"
            required
            name="confirm_password"
            onChange={() => setError("")}
            className="w-full h-full bg-transparent border-none outline-none"
          />
          <label className="absolute top-[50%] left-0 translate-y-[-50%] pointer-events-none transition-all text-lg font-medium">
            Confirm Password
          </label>
        </div>

        {error && (
          <div className="">
            <h1 className="text-red-500 mt-10">{error}</h1>
          </div>
        )}
        <motion.input
          type="submit"
          value="Sign Up"
          className="w-full border-2 mt-10 py-3 rounded-full cursor-pointer text-base md:text-lg xl:text-xl inline-block bg-[#00ffff] text-black font-medium text-center"
          whileHover={{ scale: 0.9 }}
        />
        {/* <div className="w-full h-[1px] bg-[#00ffff] mt-10"></div> */}
        <div className="text-center p-3">
          <h4 className="text-lg md:text-xl">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#319d9d] border-b-[1px] border-[#319d9d]"
            >
              Login
            </Link>
          </h4>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
