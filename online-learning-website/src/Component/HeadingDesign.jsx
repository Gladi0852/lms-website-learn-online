import React from "react";

const HeadingDesign = ({ headingType, heading }) => {
  return (
    <>
      <div className="heading w-fit flex justify-between items-center gap-5">
        <div className="line flex flex-col gap-[5px] items-end">
          <div className="h-[2px] w-10 bg-[#40c5c5]"></div>
          <div className="h-[2px] w-16 bg-[#40c5c5]"></div>
        </div>
        <h5 className="text-[#40c5c5] text-lg font-medium">{headingType}</h5>
        <div className="line flex flex-col gap-[5px]">
          <div className="h-[2px] w-10 bg-[#40c5c5]"></div>
          <div className="h-[2px] w-16 bg-[#40c5c5]"></div>
        </div>
      </div>
      <h1 className="text-3xl font-medium mt-3 mb-10">{heading}</h1>
    </>
  );
};

export default HeadingDesign;
