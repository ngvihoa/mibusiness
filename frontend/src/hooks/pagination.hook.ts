import React, { useState } from "react";

const usePagination = (numberItems: number) => {
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = numberItems;

  const handlePageClick = (event: any) => {
    const newOffset = event.selected + 1;
    setCurrentPage(newOffset);
  };

  return {
    itemsPerPage,
    pageCount,
    currentPage,
    setPageCount,
    setCurrentPage,
    handlePageClick,
  };
};

export default usePagination;
