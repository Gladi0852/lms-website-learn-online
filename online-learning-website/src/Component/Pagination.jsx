import React, { useContext } from "react";
import ReactPaginate from "react-paginate";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { TeacherContext } from "../Store/ContextFiles/teacher-store";

const Pagination = () => {
  const { fetchTeachers, teachersData } = useContext(TeacherContext);
  const handlePageClick = (event) => {
    fetchTeachers(event.selected + 1);
  };
  return (
    <div className="w-full mt-8">
      <ReactPaginate
        breakLabel="..."
        nextLabel={<GrNext className="pointer-events-none" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={teachersData.totalPage}
        previousLabel={<GrPrevious />}
        renderOnZeroPageCount={null}
        containerClassName="flex text-black gap-2 items-center justify-center text-lg lg:text-2xl"
        pageClassName="bg-[#00ffff] px-2 py-0 rounded lg:rounded-lg lg:px-3 lg:py-1"
        activeClassName="bg-black text-white"
        nextClassName="bg-[#00ffff] rounded-lg w-7 h-7 flex items-center justify-center lg:w-10 lg:h-10"
        previousClassName="bg-[#00ffff] rounded-lg w-7 h-7 flex items-center justify-center lg:w-10 lg:h-10"
        disabledClassName="bg-gray-300 cursor-not-allowed opacity-50"
      />
    </div>
  );
};

export default Pagination;
