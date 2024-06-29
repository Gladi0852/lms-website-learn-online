import React from "react";
import aboutPhoto from "../assets/homepage-about.jpg";
import ButtonWithBG from "./ButtonWithBG";

const About = () => {
  return (
    <div
      id="about"
      className="px-10 sm:px-20 xl:px-[10rem] w-full flex flex-col items-center bg-[#4bd7d723] py-10 gap-10 lg:flex-row lg:justify-evenly"
    >
      <div id="photo" className="w-80 lg:w-[45%]">
        <img
          src={aboutPhoto}
          alt="about us photo"
          className="w-full object-cover object-center rounded-xl"
        />
      </div>
      <div id="content" className="flex flex-col gap-3 lg:w-[45%]">
        <h5 className="text-[#40c5c5] text-lg font-medium relative w-fit">
          ABOUT US
          <div
            id="line"
            className="top-[50%] left-[115%] absolute flex flex-col gap-[5px] translate-y-[-50%]"
          >
            <div className="w-10 bg-[#40c5c5] h-[2px]"></div>
            <div className="w-16 bg-[#40c5c5] h-[2px]"></div>
          </div>
        </h5>

        <h1 className="text-3xl w-4/5 font-medium leading-8 2xl:w-1/2">
          We provide the best{" "}
          <span className="text-[#00ffff]">online courses</span>
        </h1>
        <p className="text-md text-gray-600 md:text-lg">
          Our mission is to skill India's untapped & underutilized talent, and
          to train them for some of the most in-demand jobs in the world. We are
          introducing a new model of higher education in which we, Masai, invest
          in our students' future and success. As India's fastest growing career
          institute, we have one goal: unlocking the human potential of India by
          making our education system outcome driven.
        </p>
        <ButtonWithBG text="Know More" link="about" />
      </div>
    </div>
  );
};

export default About;
