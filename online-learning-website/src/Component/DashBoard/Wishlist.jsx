import React, { useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import ButtonWithBG from "../ButtonWithBG";
import NoDataPage from "../NoDataPage";

const Wishlist = () => {
  useEffect(() => {
    document.title = "LFO - Dashboard-Wishlist";
  }, []);
  return (
    <div>
      <DashboardHeader
        heading="Your Wishlist"
        subHead="All your saved courses that you wished to visit"
      />
      <NoDataPage
        message="No courses are saved to wishlist"
        link="courses"
        buttonText="Explore Courses"
      />
    </div>
  );
};

export default Wishlist;
