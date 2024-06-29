import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ButtonWithBG = ({ text, link }) => {
  return (
    <motion.button
      className="rounded-lg px-5 py-2 inline-block bg-[#00ffff] font-medium text-center w-fit"
      whileHover={{ scale: 0.9 }}
    >
      <Link to={`/${link}`}>{text}</Link>
    </motion.button>
  );
};

export default ButtonWithBG;
