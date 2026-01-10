import { useState } from "react";
import { ProductHeader } from "./components/ProductHeader";
import { ProductFilters } from "./components/ProductFilter";
import { ProductTable } from "./components/ProductTable";
import { ProductPagination } from "./components/ProductPagination";
import { useProductStore } from "./store";
import type { ProductStatus } from "./types";
import { ModalCreateUpdateProduct } from "./components/ModalCreateUpdateProduct";
import { useModalCreateUpdateProductStore } from "./store/product.modal.store";

const ITEMS_PER_PAGE = 15;

export default function ProductPage() {
  const { products, selectedId, selectId } = useProductStore();
  const { isOpen, onClose } = useModalCreateUpdateProductStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<ProductStatus | "">("");

  const filteredProducts = products.filter((product) => {
    const keywordSearch = searchTerm.toLowerCase();
    const keywordFilter = selectedStatus.toLowerCase();
    return (
      product.name.toLowerCase().includes(keywordSearch) &&
      product.status.toLowerCase().includes(keywordFilter)
    );
  });

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const maxVisiblePage = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePage / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePage - 1);
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: ProductStatus | "") => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const handleCloseModal = () => {
    onClose();
    selectId();
  };

  return (
    <div className="space-y-8 relative">
      {/* Header */}
      <ProductHeader />
      {/* Filters & Search */}
      <ProductFilters
        search={searchTerm}
        status={selectedStatus}
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
      />
      {/* Products Table */}
      <ProductTable products={paginatedProducts} />
      {/* Pagination */}
      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={totalItems}
        visiblePages={visiblePages}
        onPageChange={setCurrentPage}
      />
      <ModalCreateUpdateProduct
        open={isOpen}
        onClose={handleCloseModal}
        id={selectedId}
      />
    </div>
  );
}
