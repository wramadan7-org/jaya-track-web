import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Download,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Serok Jumbo",
    sku: "KCW-001",
    category: "Peralatan Dapur",
    stock: 45,
    minStock: 10,
    price: 95000,
    status: "In Stock",
  },
  {
    id: "2",
    name: "Serok Besar",
    sku: "KCW-002",
    category: "Peralatan Dapur",
    stock: 8,
    minStock: 15,
    price: 55000,
    status: "Low Stock",
  },
  {
    id: "3",
    name: "Serok Tanggung",
    sku: "KCW-003",
    category: "Peralatan Dapur",
    stock: 0,
    minStock: 5,
    price: 35000,
    status: "Out of Stock",
  },
  {
    id: "4",
    name: "Serok Kecil",
    sku: "KCW-004",
    category: "Peralatan Dapur",
    stock: 120,
    minStock: 20,
    price: 25000,
    status: "In Stock",
  },
  {
    id: "5",
    name: "Sapu Lidi",
    sku: "CLN-001",
    category: "Peralatan Kebersihan",
    stock: 12,
    minStock: 10,
    price: 10000,
    status: "In Stock",
  },
  {
    id: "6",
    name: "Cikrak Blek",
    sku: "CLN-002",
    category: "Peralatan Kebersihan",
    stock: 5,
    minStock: 8,
    price: 15000,
    status: "Low Stock",
  },
  {
    id: "7",
    name: "Tutup Gelas",
    sku: "KCW-005",
    category: "Peralatan Dapur",
    stock: 100,
    minStock: 8,
    price: 13000,
    status: "In Stock",
  },
  {
    id: "8",
    name: "Japit Daun",
    sku: "KCW-006",
    category: "Peralatan Dapur",
    stock: 10,
    minStock: 8,
    price: 15000,
    status: "Low Stock",
  },
  {
    id: "9",
    name: "Japit Buaya",
    sku: "KCW-007",
    category: "Peralatan Dapur",
    stock: 50,
    minStock: 8,
    price: 15000,
    status: "In Stock",
  },
  {
    id: "10",
    name: "Irus Sayur Plastik",
    sku: "KCW-008",
    category: "Peralatan Dapur",
    stock: 60,
    minStock: 15,
    price: 18000,
    status: "In Stock",
  },
  {
    id: "11",
    name: "Irus Sayur Stainless",
    sku: "KCW-009",
    category: "Peralatan Dapur",
    stock: 6,
    minStock: 10,
    price: 35000,
    status: "Low Stock",
  },
  {
    id: "12",
    name: "Irus Bakso Besar",
    sku: "KCW-010",
    category: "Peralatan Dapur",
    stock: 0,
    minStock: 5,
    price: 40000,
    status: "Out of Stock",
  },
  {
    id: "13",
    name: "Spatula Silicon",
    sku: "KCW-011",
    category: "Peralatan Dapur",
    stock: 85,
    minStock: 20,
    price: 22000,
    status: "In Stock",
  },
  {
    id: "14",
    name: "Spatula Kayu",
    sku: "KCW-012",
    category: "Peralatan Dapur",
    stock: 14,
    minStock: 15,
    price: 12000,
    status: "Low Stock",
  },
  {
    id: "15",
    name: "Sendok Sayur Besar",
    sku: "KCW-013",
    category: "Peralatan Dapur",
    stock: 70,
    minStock: 15,
    price: 20000,
    status: "In Stock",
  },
  {
    id: "16",
    name: "Sendok Sayur Kecil",
    sku: "KCW-014",
    category: "Peralatan Dapur",
    stock: 3,
    minStock: 10,
    price: 15000,
    status: "Low Stock",
  },
  {
    id: "17",
    name: "Penjepit Makanan Stainless",
    sku: "KCW-015",
    category: "Peralatan Dapur",
    stock: 40,
    minStock: 10,
    price: 28000,
    status: "In Stock",
  },
  {
    id: "18",
    name: "Penjepit BBQ",
    sku: "KCW-016",
    category: "Peralatan Dapur",
    stock: 0,
    minStock: 5,
    price: 45000,
    status: "Out of Stock",
  },
  {
    id: "19",
    name: "Tutup Gelas Plastik",
    sku: "KCW-017",
    category: "Peralatan Dapur",
    stock: 90,
    minStock: 10,
    price: 8000,
    status: "In Stock",
  },
  {
    id: "20",
    name: "Tutup Gelas Silicone",
    sku: "KCW-018",
    category: "Peralatan Dapur",
    stock: 7,
    minStock: 12,
    price: 15000,
    status: "Low Stock",
  },
  {
    id: "21",
    name: "Sapu Ijuk",
    sku: "CLN-003",
    category: "Peralatan Kebersihan",
    stock: 25,
    minStock: 10,
    price: 18000,
    status: "In Stock",
  },
  {
    id: "22",
    name: "Pel Lantai",
    sku: "CLN-004",
    category: "Peralatan Kebersihan",
    stock: 9,
    minStock: 10,
    price: 35000,
    status: "Low Stock",
  },
  {
    id: "23",
    name: "Serokan Sampah Plastik",
    sku: "CLN-005",
    category: "Peralatan Kebersihan",
    stock: 0,
    minStock: 5,
    price: 12000,
    status: "Out of Stock",
  },
  {
    id: "24",
    name: "Sapu Plastik",
    sku: "CLN-006",
    category: "Peralatan Kebersihan",
    stock: 50,
    minStock: 15,
    price: 15000,
    status: "In Stock",
  },
  {
    id: "25",
    name: "Pengki Plastik",
    sku: "CLN-007",
    category: "Peralatan Kebersihan",
    stock: 6,
    minStock: 10,
    price: 17000,
    status: "Low Stock",
  },
  {
    id: "26",
    name: "Ember Plastik Besar",
    sku: "CLN-008",
    category: "Peralatan Kebersihan",
    stock: 30,
    minStock: 10,
    price: 40000,
    status: "In Stock",
  },
  {
    id: "27",
    name: "Ember Plastik Kecil",
    sku: "CLN-009",
    category: "Peralatan Kebersihan",
    stock: 2,
    minStock: 8,
    price: 25000,
    status: "Low Stock",
  },
  {
    id: "28",
    name: "Lap Pel Microfiber",
    sku: "CLN-010",
    category: "Peralatan Kebersihan",
    stock: 0,
    minStock: 5,
    price: 20000,
    status: "Out of Stock",
  },
  {
    id: "29",
    name: "Tempat Sampah Kecil",
    sku: "CLN-011",
    category: "Peralatan Kebersihan",
    stock: 18,
    minStock: 8,
    price: 45000,
    status: "In Stock",
  },
  {
    id: "30",
    name: "Tempat Sampah Besar",
    sku: "CLN-012",
    category: "Peralatan Kebersihan",
    stock: 4,
    minStock: 10,
    price: 75000,
    status: "Low Stock",
  },
  {
    id: "31",
    name: "Sikat Lantai",
    sku: "CLN-013",
    category: "Peralatan Kebersihan",
    stock: 22,
    minStock: 10,
    price: 18000,
    status: "In Stock",
  },
  {
    id: "32",
    name: "Sikat Kamar Mandi",
    sku: "CLN-014",
    category: "Peralatan Kebersihan",
    stock: 0,
    minStock: 5,
    price: 16000,
    status: "Out of Stock",
  },
  {
    id: "33",
    name: "Pisau Dapur Stainless",
    sku: "KCW-019",
    category: "Peralatan Dapur",
    stock: 35,
    minStock: 10,
    price: 60000,
    status: "In Stock",
  },
  {
    id: "34",
    name: "Pisau Dapur Kecil",
    sku: "KCW-020",
    category: "Peralatan Dapur",
    stock: 9,
    minStock: 12,
    price: 35000,
    status: "Low Stock",
  },
  {
    id: "35",
    name: "Talenan Plastik",
    sku: "KCW-021",
    category: "Peralatan Dapur",
    stock: 55,
    minStock: 15,
    price: 25000,
    status: "In Stock",
  },
  {
    id: "36",
    name: "Talenan Kayu",
    sku: "KCW-022",
    category: "Peralatan Dapur",
    stock: 5,
    minStock: 10,
    price: 40000,
    status: "Low Stock",
  },
  {
    id: "37",
    name: "Wadah Bumbu Plastik",
    sku: "KCW-023",
    category: "Peralatan Dapur",
    stock: 80,
    minStock: 20,
    price: 12000,
    status: "In Stock",
  },
  {
    id: "38",
    name: "Wadah Bumbu Kaca",
    sku: "KCW-024",
    category: "Peralatan Dapur",
    stock: 0,
    minStock: 5,
    price: 30000,
    status: "Out of Stock",
  },
  {
    id: "39",
    name: "Rak Piring Plastik",
    sku: "KCW-025",
    category: "Peralatan Dapur",
    stock: 16,
    minStock: 10,
    price: 85000,
    status: "In Stock",
  },
  {
    id: "40",
    name: "Rak Sendok",
    sku: "KCW-026",
    category: "Peralatan Dapur",
    stock: 7,
    minStock: 10,
    price: 30000,
    status: "Low Stock",
  },
];

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produk</h1>
          <p className="text-gray-500 mt-1">
            Kelola katalog inventaris dan tingkat stok Anda.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700 hover:border-green-300 transition-all shadow-sm cursor-pointer">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm shadow-blue-600/20 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Tambah Product</span>
          </button>
        </div>
      </div>
      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari produk berdasarkan nama, SKU..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 text-gray-600"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
            onChange={(e) => handleCategoryChange(e.target.value)}
            value={selectedCategory}
          >
            <option value="">Semua Kategori</option>
            <option value="Peralatan Dapur">Peralatan Dapur</option>
            <option value="Peralatan Kebersihan">Peralatan Kebersihan</option>
          </select>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Product Info
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => {
                  let stockStatus = "-";
                  if (product.status === "In Stock") {
                    stockStatus = "Tersedia";
                  } else if (product.status === "Low Stock") {
                    stockStatus = "Stok Menipis";
                  } else {
                    stockStatus = "Habis";
                  }

                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {product.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            SKU: {product.sku}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                product.stock <= product.minStock
                                  ? "bg-red-500"
                                  : product.stock <= product.minStock * 2
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{
                                width: `${Math.min(
                                  (product.stock / 100) * 100,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 font-medium">
                            {product.stock}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          Rp {product.price.toLocaleString("id-ID")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {product.status === "In Stock" && (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          )}
                          {product.status === "Low Stock" && (
                            <AlertCircle className="w-4 h-4 text-yellow-500" />
                          )}
                          {product.status === "Out of Stock" && (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                          <span
                            className={`text-sm font-medium ${
                              product.status === "In Stock"
                                ? "text-green-700"
                                : product.status === "Low Stock"
                                ? "text-yellow-700"
                                : "text-red-700"
                            }`}
                          >
                            {stockStatus}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="p-6 text-center h-32 text-gray-500 italic"
                  >
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Menampilkan {filteredProducts.length === 0 ? 0 : startIndex + 1}
            &ndash;{Math.min(endIndex, totalItems)} dari {totalItems} produk
          </span>
          <div className="flex items-center gap-1">
            {/* Previous */}
            <button
              disabled={currentPage === 1 || filteredProducts.length === 0}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 text-sm border rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>
            {/* Page Numbers */}
            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-sm border rounded-md ${
                  page === currentPage
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 border-gray-200 cursor-pointer"
                }`}
              >
                {page}
              </button>
            ))}
            {visiblePages.length >= maxVisiblePage && endPage < totalPages && (
              <span className="px-3 py-1 text-sm text-gray-600">...</span>
            )}
            {visiblePages.length >= maxVisiblePage && endPage < totalPages && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`px-3 py-1 text-sm border rounded-md ${
                  totalPages === currentPage
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 border-gray-200 cursor-pointer"
                }`}
              >
                {totalPages}
              </button>
            )}
            {/* Next */}
            <button
              disabled={
                currentPage === totalPages || filteredProducts.length === 0
              }
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1 text-sm border rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
