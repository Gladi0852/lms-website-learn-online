import React from "react";
import logo from "../assets/online-learning-logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="px-10 sm:px-20 xl:px-[10rem] py-10 bg-black text-white">
      <div className="up md:flex">
        <div className="left text-4xl font-semibold md:w-2/5 2xl:text-6xl">
          <h1 className="leading-11">LEARNING</h1>
          <h1 className="leading-11">IS EASY</h1>
        </div>
        <div className="right flex flex-col gap-10 md:w-3/5">
          <h1 className="leading-9 text-4xl font-semibold 2xl:text-6xl">
            WHEN WE ARE <span className="text-[#00ffff]">HERE</span>
          </h1>
          <div className="rightINfo flex flex-row-reverse md:flex-col md:gap-5">
            <div className="w-1/2 flex flex-col gap-1 animated-underline">
              <p className="text-[#00ffff] mb-2 text-xl font-medium">Social:</p>
              <a
                href="https://www.instagram.com/biswas.pritam1?igsh=MXcxNjZubW00bGtocA=="
                target="_blank"
                className="text-lg"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/share/GzHVxDiBoHKDt8TM/?mibextid=qi2Omg"
                target="_blank"
                className="text-lg"
              >
                Facebook
              </a>
              <a
                href="https://www.linkedin.com/in/pritam-biswas-a7327a236?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                className="text-lg"
              >
                Linkedin
              </a>
            </div>
            <div className="flex flex-col-reverse gap-5 md:flex-row md:justify-between md:gap-0">
              <div className=" flex flex-col gap-5 md:w-3/5">
                <div className="text-lg adressFooter-underline">
                  <p className="text-[#00ffff] mb-2 text-xl font-medium">
                    Address:
                  </p>
                  <a href="#">
                    <span>Purbachal Pally</span>
                    <br />
                    <span>Ashoknagar, 24 PGS(N)</span>
                    <br />
                    <br />
                    <span>WB - 743222</span>
                    <br />
                    <span>India</span>
                  </a>
                </div>
                <div className="animated-underline text-lg">
                  <p className="text-[#00ffff] mb-2 text-xl font-medium">
                    Email:
                  </p>
                  <a href="mailto:pritambiswas72381@gmail.com" target="_blank">
                    pritambiswas72381@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-1 animated-underline text-lg">
                <p className="text-[#00ffff] mb-2 text-xl font-medium">Menu:</p>
                <Link to="/">Home</Link>
                <Link to="/courses">Courses</Link>
                <Link to="/about">About us</Link>
                <Link to="/teacher">Teachers</Link>
                <Link to="/contact-us">Contact us</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="down flex flex-col gap-5 md:flex-row mt-20 md:gap-0 items-center">
        <div className="left md:w-2/5">
          <div className="logo w-1/3 2xl:w-1/5">
            <img src={logo} />
          </div>
        </div>
        <div className="right flex flex-col gap-2 text-sm font-light md:w-3/5 md:flex-row md:justify-between xl:text-base">
          <p className="md:w-3/5">Copyright &#169; 2024 by Pritam Biswas</p>
          <p className="">All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
