import React, { useContext, useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorPage from "../ErrorPage";
import NoDataPage from "../NoDataPage";
import { IoIosAddCircleOutline } from "react-icons/io";

import CreatedContentTemplate from "./CreatedContentTemplate";
import { DashboardContext } from "../../Store/ContextFiles/dashboard-store";

const MyContent = () => {
  const { dashboardData } = useContext(DashboardContext);
  useEffect(() => {
    document.title = "LFO - Dashboard-MyContent";
  }, []);
  return (
    // <>
    //   {error ? (
    //     <ErrorPage error={error} />
    //   ) : (
    //     <div>
    //       <DashboardHeader
    //         heading="All Created Contents"
    //         subHead="Add your own contens from here, also control your contents"
    //       />
    //       {courses.length > 0 ? (
    //         <div className="border border-t-0 border-[#00ffff] py-10">
    //           <div className="flex justify-center lg:justify-end mr-10">
    //             <motion.button
    //               whileHover={{ scale: 0.9 }}
    //               className="bg-[#00ffff] px-5 py-2 rounded-xl"
    //             >
    //               <Link
    //                 to="/add-course"
    //                 className="flex items-center gap-2 text-lg xl:text-xl font-semibold"
    //               >
    //                 <IoIosAddCircleOutline /> Create Course
    //               </Link>
    //             </motion.button>
    //           </div>
    //           <CreatedContentTemplate courses={courses} />
    //         </div>
    //       ) : (
    //         <NoDataPage
    //           link="add-course"
    //           message="You havn't created any contents"
    //           buttonText="Create Course"
    //         />
    //       )}
    //     </div>
    //   )}
    // </>
    <div>
      <DashboardHeader
        heading="All Created Contents"
        subHead="Add your own contens from here, also control your contents"
      />
      {dashboardData.createdContent.length > 0 ? (
        <div className="border border-t-0 border-[#00ffff] py-10">
          <div className="flex justify-center lg:justify-end mr-10">
            <motion.button
              whileHover={{ scale: 0.9 }}
              className="bg-[#00ffff] px-5 py-2 rounded-xl"
            >
              <Link
                to="/add-course"
                className="flex items-center gap-2 text-lg xl:text-xl font-semibold"
              >
                <IoIosAddCircleOutline /> Create Course
              </Link>
            </motion.button>
          </div>
          <CreatedContentTemplate courses={dashboardData.createdContent} />
        </div>
      ) : (
        <NoDataPage
          link="add-course"
          message="You havn't created any contents"
          buttonText="Create Course"
        />
      )}
    </div>
  );
};

export default MyContent;
