import InstructionPage from "../Component/InstructionPage";
import image1 from "../assets/support-1.png";
import image2 from "../assets/support-2.png";
import HeadingDesign from "../Component/HeadingDesign";
import AllTeachers from "../Component/AllTeachers";
import BannerPage from "../Component/BannerPage";
import bg_image from "../assets/teacher-banner.jpg";
import TeachersContextProvider from "../Store/ContextFiles/teacher-store";

const TeacherPage = () => {
  return (
    <TeachersContextProvider>
      <div id="teacher" className="w-full">
        <BannerPage
          heading="Come teach with us"
          desc="Become an instructor and change lives — including your own"
          bg_image={bg_image}
        />
        <InstructionPage />
        <div className="w-full px-10 sm:px-20 xl:px-[10rem] bg-[#E6FAFA] flex flex-col items-center lg:flex-row lg:justify-between lg:items-center py-10">
          <div className="left lg:w-[25%]">
            <img src={image1} />
          </div>
          <div className="mid max-w-[40rem] lg:w-[40%]">
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-xl xl:text-2xl 2xl:text-4xl font-medium mb-5">
              You won't have to do it alone
            </h1>
            <p className="text-center text-base sm:text-lg md:text-xl lg:text-base 2xl:text-xl font-thin leading-6">
              Our Instructor Support Team is here to answer your questions and
              review your test video, while our Teaching Center gives you plenty
              of resources to help you through the process. Plus, get the
              support of experienced instructors in our online community.
            </p>
          </div>
          <div className="right w-[25%] hidden lg:block">
            <img src={image2} />
          </div>
        </div>
        <div className="w-full py-10 flex flex-col items-center">
          <HeadingDesign
            headingType={"Instructors"}
            heading={"EXPERT INSTRUCTORS"}
          />
        </div>
        <AllTeachers />
      </div>
    </TeachersContextProvider>
  );
};

export default TeacherPage;
