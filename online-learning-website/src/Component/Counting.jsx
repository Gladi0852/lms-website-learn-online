import React from "react";
import CountUp from "react-countup";

const Counting = ({ info }) => {
  return (
    <>
      {info.icon && (
        <info.icon className="text-5xl 2xl:text-7xl text-[#00ffff]" />
      )}
      <span className="count-up">
        <CountUp
          prefix={info.prefix}
          start={0}
          end={info.end}
          suffix={info.suffix}
          duration={info.duration}
          // enableScrollSpy={true}
          className="text-[#00ffff] text-3xl font-bold lg:text-4xl xl:text-5xl 2xl:text-6xl"
        />
      </span>
      <p className="text-white text-xl font-medium lg:text-2xl xl:text-3xl">
        {info.text}
      </p>
    </>
  );
};

export default Counting;
