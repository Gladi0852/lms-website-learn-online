import React from "react";
const base_url = "https://lms-backend-1-je3i.onrender.com";
// const base_url = "http://localhost:8080";

const TeacherTemplate = ({ data }) => {
  return (
    <div className="border border-white w-[80%] flex flex-col cursor-pointer items-center mt-[20vw] bg-white sm:w-[44%] xl:w-[21%] xl:mt-[10vw]">
      <div className="photo w-[16rem] h-[16rem] bg-white flex justify-center items-center rounded-full translate-y-[-50%] mb-[-7rem] sm:mb-[-12vw] sm:w-[28vw] sm:h-[28vw] xl:w-[14vw] xl:h-[14vw] xl:mb-[-6vw]">
        <div
          className="image w-[95%] h-[95%] bg-center bg-cover rounded-full"
          style={{
            backgroundImage: `url(${base_url}/UploadedImages/${data.profile_photo})`,
          }}
        ></div>
      </div>
      <div className="content">
        <h1 className="text-2xl font-medium text-center sm:text-xl lg:text-3xl xl:text-2xl">
          {data.name}
        </h1>
        <h6 className="text-center my-3 sm:my-2 sm:text-sm lg:text-lg xl:text-base">
          {data.designation}
        </h6>
      </div>
    </div>
  );
};

export default TeacherTemplate;
