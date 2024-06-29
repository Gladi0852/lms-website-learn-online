import { useEffect } from "react";
import About from "../Component/About";
import Category from "../Component/Category";
import CountNumbers from "../Component/CountNumbers";
import Courses from "../Component/Courses";
import Features from "../Component/Features";
import LandingPage from "../Component/LandingPage";
import Teacher from "../Component/Teacher";
import HomePageContextProvider from "../Store/ContextFiles/homepage-store";

const HomePage = () => {
  useEffect(() => {
    document.title = "Learn From Online";
  }, []);
  return (
    <HomePageContextProvider>
      <LandingPage />
      <Features />
      <About />
      <CountNumbers />
      <Category />
      <Courses />
      <Teacher />
    </HomePageContextProvider>
  );
};

export default HomePage;
