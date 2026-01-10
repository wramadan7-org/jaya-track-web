import { useState } from "react";
import StockMovementFilter from "./components/StockMovementFilter";
import StockMovementHeader from "./components/StockMovementHeader";
import type { StockMovementType } from "./type";
import { useStockMovementStore } from "./store";
import StockMovementTable from "./components/StockMovementTable";
import { useModalCreateUpdateStockMovementStore } from "./store/stock-movement.moda.store";
import { StockMovementPagination } from "./components/StockMovementPagination";
import ModalCreateStockMovement from "./components/ModalCreateUpdateStockMovement";

const ITEMS_PER_PAGE = 15;

export default function StockMovementPage() {
  const stockMovements = useStockMovementStore((s) => s.stockMovements);
  const { isOpen, onClose } = useModalCreateUpdateStockMovementStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<"" | StockMovementType>("");

  const filteredStockMovements = stockMovements.filter((movement) => {
    const keywordSearch = searchTerm.toLowerCase();
    const keywordFilter = selectedType.toLowerCase();
    return (
      movement.product.toLowerCase().includes(keywordSearch) &&
      movement.type.toLowerCase().includes(keywordFilter)
    );
  });

  const totalItems = filteredStockMovements.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedStockMovements = filteredStockMovements.slice(
    startIndex,
    endIndex
  );

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

  const handleChangeFilterType = (type: "" | StockMovementType) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <div className="space-y-8 relative">
      {/* Header */}
      <StockMovementHeader />
      {/* Filter */}
      <StockMovementFilter
        search={searchTerm}
        filterType={selectedType}
        onSearch={handleSearch}
        onFilterTypeChange={handleChangeFilterType}
      />
      {/** Table */}
      <StockMovementTable stockMovements={paginatedStockMovements} />
      {/* Pagination */}
      <StockMovementPagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={totalItems}
        visiblePages={visiblePages}
        onPageChange={setCurrentPage}
      />
      {/** Modal */}
      <ModalCreateStockMovement open={isOpen} onClose={handleCloseModal} />
    </div>
  );
}
