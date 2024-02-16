import React from "react";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

interface PaginationProps {
  prevPage: () => void;
  nextPage: () => void;
}
const Pagination: React.FC<PaginationProps> = ({ prevPage, nextPage }) => {
  return (
    <div>
      <button onClick={prevPage}>
        <GrFormPrevious />
      </button>
      <button onClick={nextPage}>
        <GrFormNext />{" "}
      </button>
    </div>
  );
};

export default Pagination;
