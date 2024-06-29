import React, { useState } from "react";

const InstructionPage = () => {
  const [instructionId, setInstructionId] = useState(1);
  const changeContent = (id) => {
    setInstructionId(id);
  };
  const instructions = [
    {
      id: 0,
      heading: "Plan your curriculum",
      desc1:
        "You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool.",
      desc2: "The way that you teach — what you bring to it — is up to you.",
      subHeading: "How we help you",
      desc3:
        "We offer plenty of resources on how to create your first course. And, our instructor dashboard and curriculum pages help keep you organized.",
      img: "https://s.udemycdn.com/teaching/plan-your-curriculum-v3.jpg",
    },
    {
      id: 1,
      heading: "Record your video",
      desc1:
        "Use basic tools like a smartphone or a DSLR camera. Add a good microphone and you're ready to start.",
      desc2:
        "If you don't like being on camera, just capture your screen. Either way, we recommend two hours or more of video for a paid course.",
      subHeading: "How we help you",
      desc3:
        "Our support team is available to help you throughout the process and provide feedback on test videos.",
      img: "https://s.udemycdn.com/teaching/record-your-video-v3.jpg",
    },
    {
      id: 2,
      heading: "Launch your course",
      desc1:
        "Gather your first ratings and reviews by promoting your course through social media and your professional networks.",
      desc2:
        "Your course will be discoverable in our marketplace where you earn revenue from each paid enrollment.",
      subHeading: "How we help you",
      desc3:
        "Our custom coupon tool lets you offer enrollment incentives while our global promotions drive traffic to courses. There’s even more opportunity for courses chosen for Udemy Business.",
      img: "https://s.udemycdn.com/teaching/launch-your-course-v3.jpg",
    },
  ];
  return (
    <div
      id="instruction"
      className="w-full px-10 sm:px-20 xl:px-[10rem] flex items-center justify-center mb-10"
    >
      <div className="max-w-[60rem] w-full">
        <h1 className="text-center font-semibold text-3xl xl:text-4xl 2xl:text-5xl">
          How to begin
        </h1>
        <div className="flex flex-col gap-10 md:flex-row lg:flex-col lg:gap-0 relative">
          <div className="w-full md:w-1/3 lg:w-full">
            <div className="w-full md:sticky md:top-24 lg:static lg:flex lg:justify-between my-10">
              {instructions.map((data) => (
                <div
                  key={data.id}
                  className={`w-full lg:w-1/3  py-2 border-b-[1px] ${
                    data.id === instructionId
                      ? "cursor-default border-b-[3px] border-black"
                      : "cursor-pointer"
                  }`}
                  onClick={() => changeContent(data.id)}
                >
                  <h1
                    className={`text-center font-medium text-lg lg:text-2xl xl:text-3xl  ${
                      data.id === instructionId
                        ? "text-black"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {data.heading}
                  </h1>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col-reverse lg:flex-row lg:justify-between items-center">
            <div className="left w-full lg:w-[45%]">
              <p className="text-lg xl:text-xl mb-3">
                {instructions[instructionId].desc1}
              </p>
              <p className="text-lg xl:text-xl mb-5">
                {instructions[instructionId].desc2}
              </p>
              <h4 className="font-bold text-xl xl:text-2xl mb-3">
                {instructions[instructionId].subHeading}
              </h4>
              <p className="text-lg xl:text-xl">
                {instructions[instructionId].desc3}
              </p>
            </div>
            <div className="right w-[70%] lg:w-1/2">
              <img src={instructions[instructionId].img} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionPage;
