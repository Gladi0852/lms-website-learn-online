import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import { motion } from "framer-motion";
import { current } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = "https://lms-backend-1-je3i.onrender.com";
// const base_url = "http://localhost:8080";

const ChangePassword = () => {
  useEffect(() => {
    document.title = "LFO - Dashboard-ChangePassword";
  }, []);
  const [error, setError] = useState("");
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (e.target.newPass.value !== e.target.confirmPass.value)
      setError("Both Password Should Match!");
    else {
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        try {
          const response = await axios.post(
            `${base_url}/auth/change-password`,
            {
              currentPassword: e.target.currPass.value,
              newPassword: e.target.newPass.value,
            },
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          console.log(response);
          if (response.status === 200) {
            alert(response.data.message);
            e.target.reset();
          }
        } catch (error) {
          setError(error.response.data.message);
        }
      }
    }
  };
  return (
    <div>
      <DashboardHeader
        heading="Account Security"
        subHead="Edit your account settings and change your password here."
      />
      <div className="flex flex-col items-center border border-t-0 border-[#00ffff] py-10 gap-10">
        <form
          className="max-w-[40rem] w-full px-5"
          onSubmit={handlePasswordChange}
        >
          <h3 className="text-lg font-medium md:text-xl lg:text-2xl mb-10 border-b-2 w-fit">
            Change Password
          </h3>

          <div className="mb-16">
            <label className="pointer-events-none text-lg font-medium">
              Current Password
            </label>
            <input
              type="password"
              required
              className="w-full border-2 rounded-lg p-2 text-xl mt-2"
              name="currPass"
              onChange={() => setError("")}
            />
          </div>
          <div className="mb-8">
            <label className="pointer-events-none text-lg font-medium">
              New Password
            </label>
            <input
              type="password"
              required
              className="w-full border-2 rounded-lg p-2 text-xl mt-2"
              name="newPass"
              onChange={() => setError("")}
            />
          </div>
          <div className="mb-8">
            <label className="pointer-events-none text-lg font-medium">
              Confirm Current Password
            </label>
            <input
              type="text"
              required
              className="w-full border-2 rounded-lg p-2 text-xl mt-2"
              name="confirmPass"
              onChange={() => setError("")}
            />
          </div>
          {error && (
            <div className="">
              <h1 className="text-red-500 mt-10">{error}</h1>
            </div>
          )}
          <div className="flex justify-center">
            <motion.input
              type="submit"
              value="Change"
              className="w-fit border-2 mt-10 py-3 px-5 rounded-xl cursor-pointer text-base md:text-lg xl:text-xl inline-block bg-[#00ffff] text-black font-medium text-center"
              whileHover={{ scale: 0.9 }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
