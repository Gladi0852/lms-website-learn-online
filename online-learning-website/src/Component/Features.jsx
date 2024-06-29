import React from "react";
import { GiTeacher } from "react-icons/gi";
import { FaGlobe } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { BsPersonVideo } from "react-icons/bs";
import Card from "./Card";

const Features = () => {
  const featuresData = [
    {
      id: 1,
      iconName: GiTeacher,
      heading: "Skilled Instructors",
      desc: "All Instructors are very skillfull and they each brought their unique expertise and teaching style to the virtual classroom. Just follow their instruction and become pro.",
    },
    {
      id: 2,
      iconName: FaGlobe,
      heading: "Online Classes",
      desc: "Doing a part time job or studying in college, want to learn just join and learn at your own pace from anywhere. Learn from anywhere as long as you are online.",
    },
    {
      id: 3,
      iconName: GoProjectSymlink,
      heading: "Make Projects",
      desc: "With each topic's completion make a project based on that knowledge and master that topic. Also learn from the instructor's project that will be also included.",
    },
    {
      id: 4,
      iconName: BsPersonVideo,
      heading: "Doubt Session",
      desc: "After your enroll, you will get a chance to clear your doubt twice a week. Also you can request a 1:1 through our video chat. You can chat with other enrolled students.",
    },
  ];
  return (
    <div className="w-full mb-[4.5rem] px-10 sm:px-20 xl:px-[10rem] flex flex-col items-center gap-10 lg:flex-row lg:flex-wrap lg:justify-evenly 2xl:justify-between">
      {featuresData.map((data) => (
        <Card
          key={data.id}
          Icon={data.iconName}
          heading={data.heading}
          desc={data.desc}
        />
      ))}
    </div>
  );
};

export default Features;
