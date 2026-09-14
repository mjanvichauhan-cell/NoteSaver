import ReactPaginateModule from "react-paginate";
const ReactPaginate = ReactPaginateModule.default;

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="border-t border-gray-200 px-3 py-3 dark:border-gray-800">
      <ReactPaginate pageCount={totalPages} forcePage={currentPage - 1} 
          onPageChange={({ selected }) =>
          onPageChange(selected + 1)
        }
        previousLabel="←" nextLabel="→" breakLabel="..." pageRangeDisplayed={3} marginPagesDisplayed={1} containerClassName="flex items-center justify-center gap-1"
        pageLinkClassName="flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        activeLinkClassName="bg-black text-white dark:bg-white dark:text-black"
      />
    </div>
  );
}

export default Pagination;