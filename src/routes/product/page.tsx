import { useState } from "react";
import { ProductHeader } from "./components/ProductHeader";
import { ProductFilters } from "./components/ProductFilter";
import { ProductTable } from "./components/ProductTable";
import { mockProducts } from "./data/mockProducts";
import { ProductPagination } from "./components/ProductPagination";

const ITEMS_PER_PAGE = 15;

export default function ProductPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = mockProducts.filter((product) => {
    const keywordSearch = searchTerm.toLowerCase();
    const keywordFilter = selectedCategory.toLowerCase();
    return (
      (product.name.toLowerCase().includes(keywordSearch) ||
        product.sku.toLowerCase().includes(keywordSearch)) &&
      product.category.toLowerCase().includes(keywordFilter)
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

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <ProductHeader />
      {/* Filters & Search */}
      <ProductFilters
        search={searchTerm}
        category={selectedCategory}
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
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
    </div>
  );
}
