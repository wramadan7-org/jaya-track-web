interface PaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  visiblePages: number[];
  onPageChange: (page: number) => void;
}

export function ProductPagination({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  visiblePages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white rounded-xl">
      <span className="text-sm text-gray-500">
        Menampilkan {totalItems === 0 ? 0 : startIndex + 1}-
        {Math.min(endIndex, totalItems)} dari {totalItems} produk
      </span>
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          disabled={currentPage === 1 || totalItems === 0}
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          className="px-3 py-1 text-sm border rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Sebelumnya
        </button>
        {/* Ellipsis Start */}
        {visiblePages.at(0)! > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={`px-3 py-1 text-sm border rounded-md ${
                currentPage === 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 border-gray-200 cursor-pointer"
              }`}
            >
              1
            </button>
            <span className="px-2 text-sm text-gray-600">...</span>
          </>
        )}
        {/* Page Numbers */}
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 text-sm border rounded-md ${
              page === currentPage
                ? "bg-blue-600 text-white border-blue-600"
                : "text-gray-600 hover:bg-gray-50 border-gray-200 cursor-pointer"
            }`}
          >
            {page}
          </button>
        ))}
        {/* Ellipsis End */}
        {visiblePages.length >= 5 && visiblePages.at(-1)! < totalPages && (
          <>
            <span className="px-2 text-sm text-gray-600">...</span>
            <button
              onClick={() => onPageChange(totalPages)}
              className={`px-3 py-1 text-sm border rounded-md ${
                currentPage === totalPages
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 border-gray-200 cursor-pointer"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}
        {/* Next */}
        <button
          disabled={currentPage === totalPages || totalItems === 0}
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          className="px-3 py-1 text-sm border rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
}
