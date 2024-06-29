import bgImage from "../assets/CountNumbersBG.jpg";
import Counting from "./Counting";

const CountNumbers = () => {
  const countingInfo = [
    { id: 1, end: 500, text: "LEARNERS", duration: 3 },
    { id: 2, end: 50, text: "COURSE PUBLISHED", duration: 3 },
    { id: 3, end: 100, text: "TEACHERS", duration: 3 },
  ];
  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="px-10 sm:px-20 xl:px-[10rem] w-full bg-cover bg-center brightness-70 bg-fixed py-10 lg:py-20"
    >
      <div className="flex flex-col gap-5 items-center lg:flex-row lg:justify-between">
        {countingInfo.map((info) => (
          <div
            className="text-center border-b-[2px] border-[#40c5c5] w-60 pb-10 lg:border-b-0 lg:pb-0 lg:border-r-[2px] lg:w-1/3 lg:h-[10rem] lg:flex lg:flex-col lg:justify-center"
            key={info.id}
          >
            <Counting info={info} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountNumbers;
