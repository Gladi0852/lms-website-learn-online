import React from "react";

const BannerPage = ({ heading, desc, bg_image }) => {
  return (
    <div
      className="px-10 sm:px-20 xl:px-[10rem] w-full h-[50vh] bg-cover bg-left xl:bg-center translate-y-[-18vw] sm:translate-y-[-11vw] md:translate-y-[-10vw] lg:translate-y-[-8vw] xl:translate-y-[-6vw] 2xl:translate-y-[-5vw] flex items-center"
      style={{ backgroundImage: `url(${bg_image})` }}
    >
      <div className="w-full flex flex-col gap-5 md:w-2/3 lg:w-1/2">
        <h3 className=" text-4xl font-bold leading-8">{heading}</h3>
        <p className="text-xl font-medium leading-4">{desc}</p>
      </div>
    </div>
  );
};

export default BannerPage;
