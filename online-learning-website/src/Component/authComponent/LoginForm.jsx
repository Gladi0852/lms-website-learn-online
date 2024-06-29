import React, { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginContext } from "../../Store/ContextFiles/login-context";
import { loginStatusAction } from "../../Store/Slices/loginStatusSlice";
import SuccessPage from "./SuccessPage";

export const LoginForm = () => {
  const form = useRef();
  const { loginUser } = useContext(LoginContext);
  const dispatch = useDispatch();
  const { error, success } = useSelector((store) => store.loginStatus);
  const { name } = useSelector((store) => store.userInfo);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    loginUser(formData.get("email"), formData.get("password"));
  };

  return (
    <>
      {success ? (
        <SuccessPage msg1={`Welcome ${name}`} link="" />
      ) : (
        <div className="w-full px-10 sm:px-20 xl:px-[10rem] py-10 flex justify-center">
          <form
            ref={form}
            onSubmit={handleSubmit}
            className="relative max-w-[30rem] w-full border p-8 rounded-2xl border-[#00ffff]"
          >
            <h3 className="text-lg font-medium md:text-xl lg:text-2xl mb-10">
              Login to your Learn Online Account
            </h3>
            <div className="input-box relative w-full h-[50px] border-b-2 border-[#00ffff] mb-10">
              <input
                type="email"
                required
                name="email"
                onChange={
                  error
                    ? () =>
                        dispatch(
                          loginStatusAction.status({
                            error: "",
                          })
                        )
                    : () => {}
                }
                className="w-full h-full bg-transparent border-none outline-none"
              />
              <label className="absolute top-[50%] left-0 translate-y-[-50%] pointer-events-none transition-all text-lg font-medium">
                Email
              </label>
            </div>
            <div className="input-box relative w-full h-[50px] border-b-2 border-[#00ffff] mb-5">
              <input
                type="password"
                required
                name="password"
                onChange={
                  error
                    ? () =>
                        dispatch(
                          loginStatusAction.status({
                            error: "",
                          })
                        )
                    : () => {}
                }
                className="w-full h-full bg-transparent border-none outline-none"
              />
              <label className="absolute top-[50%] left-0 translate-y-[-50%] pointer-events-none transition-all text-lg font-medium">
                Password
              </label>
            </div>
            {error && (
              <div className="">
                <h1 className="text-red-500 mt-5">{error}</h1>
              </div>
            )}
            <motion.input
              type="submit"
              value="Login"
              className="w-full border-2 mt-10 py-3 rounded-full cursor-pointer text-base md:text-lg xl:text-xl inline-block bg-[#00ffff] text-black font-medium text-center"
              whileHover={{ scale: 0.9 }}
            />
            <div className="w-full h-[1px] bg-[#00ffff] mt-10"></div>
            <div className="text-center p-3">
              <h4 className="text-lg md:text-xl">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[#319d9d] border-b-[1px] border-[#319d9d]"
                >
                  Sign up
                </Link>
              </h4>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
