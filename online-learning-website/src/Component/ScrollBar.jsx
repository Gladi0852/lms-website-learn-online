import React from "react";
import { motion, useScroll } from "framer-motion";

const ScrollBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 10,
          background: "#00ffff",
          transformOrigin: "0%",
        }}
      ></motion.div>
    </>
  );
};

export default ScrollBar;
