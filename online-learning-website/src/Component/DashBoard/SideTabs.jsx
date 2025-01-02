import React from "react";
import demoUserImg from "../../assets/user-icon.webp";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const base_url = "https://lms-backend-1-je3i.onrender.com";
// const base_url = "http://localhost:8080";

const SideTabs = ({ handleLogOut }) => {
  const { name, profile_photo, role } = useSelector((store) => store.userInfo);
  return (
    <div className="w-full h-full lg:w-1/4 2xl:w-1/5 lg:sticky lg:top-10">
      <div className="w-full bg-[#00ffff] py-5">
        <h1 className="text-center lg:text-3xl text-5xl xl:text-4xl italic font-medium">
          Learn Online
        </h1>
      </div>
      <div className="py-10 bg-[#202020] px-5 md:flex md:gap-10 lg:flex-col lg:gap-0">
        <div className="profile flex flex-col items-center md:w-1/2 lg:w-full">
          <div className="">
            <img
              src={
                profile_photo
                  ? `${base_url}/UploadedImages/${profile_photo}`
                  : demoUserImg
              }
              className="object-cover object-center rounded-full w-[50vw] h-[50vw] md:w-[30vw] md:h-[30vw] lg:w-[15vw] lg:h-[15vw] xl:w-[12vw] xl:h-[12vw] text-white"
              alt="User-Profile-Photo"
            />
          </div>
          <h1 className="text-4xl lg:text-2xl xl:text-3xl font-semibold text-[#00ffff]">
            {name}
          </h1>
        </div>
        <div className="w-full h-[1px] bg-white my-10 md:w-[1px] md:h-full lg:w-full lg:h-[1px]"></div>
        <div
          id="dashboard-tabs"
          className="tabs flex flex-col text-white gap-5"
        >
          <NavLink
            to="."
            end
            className="w-full text-left rounded-xl p-2 text-lg font-medium"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="wishlist"
            className="w-full text-left rounded-xl p-2 text-lg font-medium"
          >
            Wishlist
          </NavLink>
          <NavLink
            to="my-courses"
            className="w-full text-left rounded-xl p-2 text-lg font-medium"
          >
            My Courses
          </NavLink>
          {role === "Teacher" && (
            <NavLink
              to="my-contents"
              className="w-full text-left rounded-xl p-2 text-lg font-medium"
            >
              My Contents
            </NavLink>
          )}
          <NavLink
            to="my-profile"
            className="w-full text-left rounded-xl p-2 text-lg font-medium"
          >
            My Profile
          </NavLink>
          <NavLink
            to="change-password"
            className="w-full text-left rounded-xl p-2 text-lg font-medium"
          >
            Change Password
          </NavLink>
          <button
            className="w-full text-left rounded-xl p-2 text-lg font-medium"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideTabs;
