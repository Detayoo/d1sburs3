import ReactPaginate from "react-paginate";

export const Pagination = ({
  itemOffset,
  currentItems,
  pageCount,
  totalRecords,
  handlePageClick,
}: {
  itemOffset: number;
  currentItems: any[];
  pageCount: number;
  totalRecords: number;
  handlePageClick: ({ selected }: { selected: any }) => void;
}) => {
  if (totalRecords === 0) {
    return null;
  }

  return (
    <div className="w-full border-t border-t-[#C7C7C7] py-5 bg-transparent flex items-center justify-between gap-x-2 text-[15px]">
      <div>
        Showing {1 + itemOffset} to {itemOffset + currentItems?.length} of{" "}
        {totalRecords} results
      </div>
      {pageCount >= 1 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel={<>Next &gt;</>}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel={<>&lt; Prev</>}
          renderOnZeroPageCount={null}
          className="flex items-center gap-x-1 text-primary-black"
          pageLinkClassName="inline-flex justify-center px-[10px] rounded-[3px] py-[3px]"
          activeLinkClassName="bg-primary-wine text-white font-InterTight-SemiBold"
          previousLinkClassName="rounded-[3px] px-1 py-[3px]"
          nextLinkClassName="rounded-[3px] px-1 py-[3px]"
          disabledLinkClassName="opacity-30"
        />
      )}
    </div>
  );
};
