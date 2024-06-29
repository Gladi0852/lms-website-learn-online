import React from "react";

const AboutTemplate = ({ aboutInfo }) => {
  const firstSpaceIndex = aboutInfo.heading.indexOf(" ");
  const firstWord = aboutInfo.heading.slice(0, firstSpaceIndex);
  const restOfText = aboutInfo.heading.slice(firstSpaceIndex + 1);
  return (
    <div className="w-full px-10 sm:px-20 xl:px-[10rem] flex flex-col items-center py-10">
      <div className="max-w-[60rem] flex flex-col items-center gap-6">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl">
          <span className="font-medium">{firstWord}</span> {restOfText}
        </h1>
        <p className="text-lg leading-6 lg:text-xl xl:text-2xl font-light lg:leading-7 text-center">
          {aboutInfo.desc1}
        </p>
        {aboutInfo.img && <img src={aboutInfo.img} />}
        {aboutInfo.desc2 && (
          <p className="text-lg leading-6 lg:text-xl xl:text-2xl font-light lg:leading-7 text-center">
            {aboutInfo.desc2}
          </p>
        )}
      </div>
    </div>
  );
};

export default AboutTemplate;
