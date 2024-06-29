import React, { useEffect } from "react";
import bannerImg from "../assets/about-banner.png";
import aboutCountingSectionBG from "../assets/CountNumbersBG.jpg";
import { HiGlobeEuropeAfrica } from "react-icons/hi2";
import { MdCurrencyExchange } from "react-icons/md";
import { GiLaurelsTrophy } from "react-icons/gi";
import { AiOutlineSchedule } from "react-icons/ai";
import { motion } from "framer-motion";
import AboutTemplate from "../Component/AboutTemplate";
import Counting from "../Component/Counting";
import { Link } from "react-router-dom";

const AboutPage = () => {
  useEffect(() => {
    document.title = "LFO - About us";
  }, []);
  const aboutInfo = [
    {
      id: 1,
      img: "",
      heading: "Skills are the key to unlocking potential",
      desc1:
        "Whether you want to learn a new skill, train your teams, or share what you know with the world, you're in the right place. As a leader in online learning, we're here to help you achieve your goals and transform your life.",
      desc2: "",
    },
    {
      id: 2,
      img: "AboutPagePhotos/about1.webp",
      heading: "Where we started",
      desc1:
        "With over xx years experience in the training industry and actual software company, We made this Online Learning Management System with the help of some expert instructors. It all started when we thought that now it's time to give educatation to all with ease.",
      desc2:
        "Founder Pritam Biswas had a vision for an easier way to manage training businesses. A tool that could assemble expert teacher from anywhere and provide the best education to learners, this way learners don't have to search on many place for the the best content while they will get all in one place with our site.",
    },
    {
      id: 3,
      img: "AboutPagePhotos/about2.png",
      heading: "Who we are",
      desc1: `Our team of experts are here to ensure you get the most out of our site "Learn Online". We've got some pretty sharp people across the country, helping to build what we think is a pretty sharp software.`,
      desc2: "",
    },
    {
      id: 4,
      img: "",
      heading: "Experts in the business of training",
      desc1:
        "Our software is constantly proving itself as the competitive advantage for training providers to better commercialize their business.",
      desc2: "",
    },
  ];
  const countingInfo = [
    {
      id: 1,
      end: 50,
      text: "Course Scheduled",
      duration: 2,
      icon: AiOutlineSchedule,
    },
    {
      id: 2,
      end: 22,
      text: "States all over India",
      duration: 2,
      icon: HiGlobeEuropeAfrica,
    },
    {
      id: 3,
      end: 10,
      text: "Transaction Processed",
      prefix: "&#x20b9;",
      suffix: "k+",
      duration: 2,
      icon: MdCurrencyExchange,
    },
    {
      id: 4,
      end: 6,
      text: "Years Experience",
      suffix: "+",
      duration: 2,
      icon: GiLaurelsTrophy,
    },
  ];
  return (
    <div id="about">
      <div
        id="landing-page"
        className="bg-[#E6FAFA] w-full px-10 sm:px-20 xl:px-[10rem] translate-y-[-18vw] sm:translate-y-[-11vw] md:translate-y-[-10vw] lg:translate-y-[-8vw] xl:translate-y-[-6vw] 2xl:translate-y-[-5vw] pt-20 pb-10 flex flex-col-reverse gap-6 items-center md:flex-row md:gap-0 md:justify-evenly"
      >
        <div className="left w-10/12 sm:w-full md:w-1/2">
          <h1 className="text-3xl text-center font-bold md:text-left lg:text-4xl 2xl:text-6xl">
            Welcome to where possibilities begin
          </h1>
        </div>
        <div className="right md:w-1/2 flex justify-end">
          <img
            src={bannerImg}
            className="w-[20rem] md:w-full lg:w-4/5 2xl:w-3/5"
          />
        </div>
      </div>
      {aboutInfo.map((data) => (
        <AboutTemplate aboutInfo={data} key={data.id} />
      ))}
      <div
        style={{ backgroundImage: `url(${aboutCountingSectionBG})` }}
        className="px-10 sm:px-20 xl:px-[10rem] w-full bg-cover bg-center brightness-70 bg-fixed py-10 lg:py-20"
      >
        <div className="flex gap-y-10 flex-wrap items-center justify-between">
          {countingInfo.map((info) => (
            <div
              className="text-center border-b-[2px] border-[#40c5c5] pb-10 lg:border-b-0 lg:pb-10 lg:border-r-[2px] flex flex-col items-center w-5/12 lg:w-1/4 gap-2 lg:pt-10"
              key={info.id}
            >
              <Counting info={info} />{" "}
            </div>
          ))}
        </div>
      </div>
      <div
        id="5th"
        className="px-10 sm:px-20 xl:px-[10rem] w-full bg-[#00ffff] flex flex-col items-center py-14 gap-5"
      >
        <h1 className="text-3xl font-bold">Ready to talk</h1>
        <div className="flex justify-center items-center">
          <motion.button
            className="text-base md:text-lg xl:text-xl rounded-lg px-5 py-2 inline-block bg-black text-[#00ffff] font-medium text-center w-fit"
            whileHover={{ scale: 0.9 }}
          >
            <Link to="/contact-us">Contact Us</Link>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
