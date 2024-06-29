import logo from "../assets/online-learning-logo.png";
import { Link } from "react-router-dom";
import { GrLogin } from "react-icons/gr";
import { LuMenu } from "react-icons/lu";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import Headroom from "react-headroom";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import userImg from "../assets/user-icon.webp";

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { profile_photo } = useSelector((store) => store.userInfo);
  const handleMenuClick = () => {
    setIsClicked(!isClicked);
  };
  const { isAuthorised } = useSelector((store) => store.loginStatus);
  const { role } = useSelector((store) => store.userInfo);
  return (
    <Headroom>
      <div
        id="navbar"
        className="flex w-full py-2 px-2 lg:px-5 items-center backdrop-blur-lg z-50"
      >
        <div id="logo" className="w-1/2">
          <NavLink to="/">
            <img
              src={logo}
              alt="site-logo"
              className="w-[30vw] sm:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
            />
          </NavLink>
        </div>
        <div
          id="menu"
          className="w-1/2 flex justify-end items-center gap-2 lg:justify-between relative"
        >
          <div
            id="menuItem"
            className="hidden lg:flex gap-5 lg:text-base lg:font-medium xl:text-lg 2xl:text-2xl tracking-widest"
          >
            <NavLink to="/courses">
              {/* NavLink automatically keeps track of in which tab is currently selected and added active class on selected link */}
              COURSES
            </NavLink>
            <NavLink to="/about">ABOUT</NavLink>
            {isAuthorised && role === "Teacher" ? null : (
              <NavLink to="/teacher">TEACHERS</NavLink>
            )}

            <NavLink to="/contact-us">CONTACT</NavLink>
            {isAuthorised && role === "Teacher" && (
              //change link later
              <NavLink to="/add-course" className="ml-20">
                CREATE COURSE
              </NavLink>
            )}
          </div>

          {isAuthorised ? (
            <Link to="/dashboard">
              <motion.img
                src={
                  profile_photo
                    ? `http://localhost:8080/UploadedImages/${profile_photo}`
                    : userImg
                }
                className="object-cover object-center rounded-full h-[10vw] w-[10vw] sm:h-[8vw] sm:w-[8vw] md:h-[6vw] md:w-[6vw] lg:h-[5vw] lg:w-[5vw] xl:h-[4vw] xl:w-[4vw] 2xl:h-[3vw] 2xl:w-[3vw] text-white"
                alt="User-Profile-Photo"
                whileHover={{ scale: 0.95 }}
              />
            </Link>
          ) : (
            <motion.div
              id="user-login"
              className="flex items-center gap-2 p-3 text-2xl rounded-full bg-black text-[#00FFFF] cursor-pointer sm:text-xl sm:p-2 md:p-3 2xl:text-3xl z-10"
              whileHover={{ scale: 0.9 }}
            >
              <Link to="/login">
                <p className="text-sm md:text-lg">Login</p>
              </Link>
              <GrLogin />
            </motion.div>
          )}

          <div
            id="mobile-menu"
            className="text-4xl cursor-pointer lg:hidden sm:text-3xl z-10"
            onClick={handleMenuClick}
          >
            {!isClicked ? <LuMenu /> : <MdClose />}
          </div>
          {isClicked && (
            <div
              id="mobileMenuItem"
              className="absolute right-[-10%] top-[-40%] flex flex-col text-base font-medium md:text-lg gap-y-2 bg-slate-100 z-0 w-full h-[20rem] items-center justify-center md:w-[60%] md:h-[30rem]"
            >
              <NavLink to="/courses" onClick={handleMenuClick}>
                COURSES
              </NavLink>
              <NavLink to="/about" onClick={handleMenuClick}>
                ABOUT
              </NavLink>

              {isAuthorised && role === "Teacher" ? null : (
                <NavLink to="/teacher" onClick={handleMenuClick}>
                  TEACHERS
                </NavLink>
              )}
              <NavLink to="/contact-us" onClick={handleMenuClick}>
                CONTACT
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </Headroom>
  );
};

export default Navbar;
