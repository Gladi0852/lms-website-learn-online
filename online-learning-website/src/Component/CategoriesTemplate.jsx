import React from "react";
import { Link } from "react-router-dom";

const CategoriesTemplate = ({ data, index }) => {
  const customizeHeightWidth = (index) => {
    if (index == 0)
      return "md:col-span-2 lg:col-span-2 xl:col-span-2 xl:row-span-2";
    if (index == 1) return "md:col-span-2 lg:col-span-1 xl:col-span-2";
    if (index == 3) return "lg:col-span-2 xl:col-span-1";
  };
  return (
    <Link
      to="/courses"
      state={data.category}
      className={`h-[30vh] md:h-[40vh] xl:h-auto ${customizeHeightWidth(
        index
      )} rounded-xl bg-center bg-no-repeat bg-cover w-full relative p-2 cursor-pointer`}
      style={{ backgroundImage: `url(${data.image})` }}
    >
      <div className="absolute w-fit h-fit bg-white px-5 py-2 rounded-xl bottom-2 border-2 border-[#00ffff]">
        <h1 className="text-center xl:text-xl">{data.category}</h1>
        <h1 className="text-center text-[#2d9090] xl:text-lg">
          {data.totalContents} Contents
        </h1>
      </div>
    </Link>
  );
};

export default CategoriesTemplate;
