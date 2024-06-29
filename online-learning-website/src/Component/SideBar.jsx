import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CoursesList } from "../Store/ContextFiles/course-list-store";
import { useLocation } from "react-router-dom";

const SideBar = () => {
  const { category, setCategory, price, setPrice } = useContext(CoursesList);
  const location = useLocation();
  const [filterOn, setFilterOn] = useState(false);
  const categories = [
    "All",
    "Mobile Development",
    "Database Design",
    "Programming Languages",
    "Data Science",
    "Graphic Design",
    "Web Development",
  ];
  const prices = ["All", "Free", "Paid"];

  const { fetchCourses } = useContext(CoursesList);
  useEffect(() => {
    if (location.state) {
      setCategory(location.state);
      setPrice("All");
      fetchCourses(category, price);
    }
  });
  return (
    <>
      <h1
        className="text-base md:text-lg font-medium cursor-pointer bg-[#00ffff] w-fit p-2 rounded-lg lg:hidden mb-5"
        onClick={() => setFilterOn(!filterOn)}
      >
        FILTER
      </h1>
      <div
        className={`w-full xl:w-1/4 ${
          filterOn ? "h-max" : "h-0"
        } transition-height duration-300 lg:h-max bg-[#E6FAFA] xl:sticky xl:top-10 px-5 overflow-hidden`}
      >
        <div className="flex flex-col md:flex-row gap-5 xl:flex-col">
          <div className="cate w-full md:w-3/4 xl:w-full">
            <h1 className="text-base md:text-lg 2xl:text-xl font-medium pt-5 xl:pt-0 xl:mt-5">
              Categories
            </h1>
            <div className="w-full h-[1px] bg-black mt-2"></div>
            <div
              id="categories"
              className="w-full flex flex-wrap gap-2 md:gap-5 py-3"
            >
              {categories.map((data, index) => (
                <motion.p
                  key={index}
                  onClick={() => setCategory(data)}
                  whileTap={{ scale: 0.8 }}
                  className={`w-fit border px-2 py-1 rounded-lg text-sm md:text-base 2xl:text-lg cursor-pointer ${
                    category === data
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {data}
                </motion.p>
              ))}
            </div>
          </div>
          <div className="pri w-full md:w-1/4 xl:w-full">
            <h1 className="text-base md:text-lg 2xl:text-xl font-medium mt-5">
              Price
            </h1>
            <div className="w-full h-[1px] bg-black mt-2"></div>
            <div
              id="price"
              className="w-full flex flex-wrap gap-2 md:gap-5 py-3"
            >
              {prices.map((data, index) => (
                <motion.p
                  key={index}
                  onClick={() => setPrice(data)}
                  whileTap={{ scale: 0.8 }}
                  className={`w-fit border px-2 py-1 rounded-lg text-sm md:text-base 2xl:text-lg cursor-pointer ${
                    price === data
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {data}
                </motion.p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-1 md:mt-5 xl:mb-5 pb-5 xl:pb-0">
          <motion.button
            className="text-sm md:text-base rounded-lg px-5 py-2 inline-block bg-[#00ffff] font-medium text-center w-fit"
            whileHover={{ scale: 0.9 }}
            onClick={() => fetchCourses(category, price)}
          >
            APPLY
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
