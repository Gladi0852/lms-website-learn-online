import CategoriesTemplate from "./CategoriesTemplate";
import { useContext } from "react";
import LoadingSpinner from "./LoadingSpinner";
import HeadingDesign from "./HeadingDesign";
import { HomePageContext } from "../Store/ContextFiles/homepage-store";

const Category = () => {
  const { categories } = useContext(HomePageContext);

  return (
    <div className="px-10 sm:px-20 xl:px-[10rem] py-10 bg-[#4bd7d723]">
      <HeadingDesign
        headingType={"Categories"}
        heading={"POPULAR CATEGORIES"}
      />
      <div
        id="categories"
        className={`w-full ${
          categories.data &&
          "xl:h-[60vh] grid md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 xl:grid-cols-4 xl:grid-rows-2 gap-5"
        }`}
      >
        {!categories.loading ? (
          categories.data.map((data, index) => (
            <CategoriesTemplate data={data} index={index} key={data.id} />
          ))
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default Category;
