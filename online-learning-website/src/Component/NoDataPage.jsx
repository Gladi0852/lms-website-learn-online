import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NoDataPage = ({ message, link, buttonText }) => {
  return (
    <div className="border border-t-0 border-[#00ffff] py-10">
      <p className="text-center">{message}</p>
      <div className="flex justify-center items-center mt-5">
        <motion.button
          className="rounded-lg px-5 py-2 inline-block bg-[#00ffff] font-medium text-center w-fit"
          whileHover={{ scale: 0.9 }}
        >
          <Link to={`/${link}`}>{buttonText}</Link>
        </motion.button>
      </div>
    </div>
  );
};

export default NoDataPage;
