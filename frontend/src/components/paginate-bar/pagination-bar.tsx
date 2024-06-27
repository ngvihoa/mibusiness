import ReactPaginate from "react-paginate";

export interface PaginationBarProps {
  handlePageClick: (e: any) => void;
  pageCount: number;
}

const PaginationBar = ({ handlePageClick, pageCount }: PaginationBarProps) => {
  return (
    <ReactPaginate
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      previousLabel="<"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
    />
  );
};

export default PaginationBar;
