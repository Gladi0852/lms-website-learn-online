import React from "react";

const Card = ({ Icon, heading, desc }) => {
  return (
    <div className="w-60 flex flex-col items-center gap-3 bg-[#4bd7d723] p-5 rounded-xl sm:w-80 md:w-full lg:w-5/12 2xl:w-1/5 ">
      <Icon className="text-7xl text-[#00ffff]" />
      <h5 className="font-bold text-lg">{heading}</h5>
      <p className="text-center text-sm text-gray-600 md:text-lg">{desc}</p>
    </div>
  );
};

export default Card;
