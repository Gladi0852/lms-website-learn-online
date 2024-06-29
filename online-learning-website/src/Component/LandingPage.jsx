import landingPageData from "../Local Data/LandingPage.json";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ButtonWithBG from "./ButtonWithBG";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const [isAuthorised, setIsAuthorised] = useState(null);
  useEffect(() => {
    setIsAuthorised(sessionStorage.getItem("auth"));
  }, []);
  return (
    <div
      id="landingPage"
      className="w-full z-0 relative translate-y-[-18vw] sm:translate-y-[-11vw] md:translate-y-[-10vw] lg:translate-y-[-8vw] xl:translate-y-[-6vw] 2xl:translate-y-[-5vw] h-fit"
    >
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 8000 }}
        className="mySwiper"
      >
        {landingPageData.map((data) => (
          <SwiperSlide
            key={data.id}
            className="w-full h-[95vh] bg-cover bg-center relative"
            style={{ backgroundImage: `url(${data.img})` }}
          >
            <div className="overlay absolute w-full h-full top-0 left-0 bg-[#00000031] px-10 sm:px-20 xl:px-[10rem]">
              <div className="absolute top-[50%]  translate-y-[-50%] w-full lg:w-[70%]">
                <h1 className="w-[80%] lg:w-full text-4xl sm:text-6xl md:text-7xl lg:text-8xl lg:leading-[5rem] 2xl:text-9xl font-momo font-bold 2xl:leading-[7rem]">
                  {data.heading}
                </h1>
                <p className="text-white mt-10 text-lg w-[80%] sm:text-xl xl:text-2xl xl:w-1/2">
                  {/* text-2xl w-1/2 */}
                  {data.desc}
                </p>
                <div
                  id="buttons"
                  className="flex flex-col gap-5 lg:flex-row lg:gap-10 mt-10 text-2xl items-center w-[80%] lg:items-start"
                >
                  {!isAuthorised && (
                    <ButtonWithBG text="Get Started" link="login" />
                  )}
                  <motion.button
                    className="border-2 border-[#00ffff] rounded-lg px-5 py-2 inline-block text-[#00ffff] text-center w-fit"
                    whileHover={{ scale: 0.9 }}
                  >
                    <Link to="/courses">Explore Courses</Link>
                  </motion.button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LandingPage;
