import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  {
    name: "Serok Jumbo",
    stock: 45,
  },
  {
    name: "Serok Besar",
    stock: 8,
  },
  {
    name: "Serok Tanggung",
    stock: 0,
  },
  {
    name: "Serok Kecil",
    stock: 120,
  },
  {
    name: "Sapu Lidi",
    stock: 12,
  },
  {
    name: "Cikrak Blek",
    stock: 5,
  },
  {
    name: "Tutup Gelas",
    stock: 8,
  },
  {
    name: "Japit Daun",
    stock: 10,
  },
  {
    name: "Japit Buaya",
    stock: 50,
  },
  {
    name: "Irus Sayur Plastik",
    stock: 60,
  },
  {
    name: "Irus Sayur Stainless",
    stock: 6,
  },
  {
    name: "Irus Bakso Besar",
    stock: 0,
  },
  {
    name: "Spatula Silicon",
    stock: 85,
  },
  {
    name: "Spatula Kayu",
    stock: 14,
  },
  {
    name: "Sendok Sayur Besar",
    stock: 70,
  },
  {
    name: "Sendok Sayur Kecil",
    stock: 3,
  },
  {
    name: "Penjepit Makanan Stainless",
    stock: 40,
  },
  {
    name: "Penjepit BBQ",
    stock: 0,
  },
  {
    name: "Tutup Gelas Plastik",
    stock: 90,
  },
  {
    name: "Tutup Gelas Silicone",
    stock: 7,
  },
  {
    name: "Sapu Ijuk",
    stock: 25,
  },
  {
    name: "Pel Lantai",
    stock: 9,
  },
  {
    name: "Serokan Sampah Plastik",
    stock: 0,
  },
  {
    name: "Sapu Plastik",
    stock: 50,
  },
  {
    name: "Pengki Plastik",
    stock: 6,
  },
  {
    name: "Ember Plastik Besar",
    stock: 30,
  },
  {
    name: "Ember Plastik Kecil",
    stock: 2,
  },
  {
    name: "Lap Pel Microfiber",
    stock: 0,
  },
  {
    name: "Tempat Sampah Kecil",
    stock: 18,
  },
  {
    name: "Tempat Sampah Besar",
    stock: 4,
  },
  {
    name: "Sikat Lantai",
    stock: 22,
  },
  {
    name: "Sikat Kamar Mandi",
    stock: 0,
  },
  {
    name: "Pisau Dapur Stainless",
    stock: 35,
  },
  {
    name: "Pisau Dapur Kecil",
    stock: 9,
  },
  {
    name: "Talenan Plastik",
    stock: 55,
  },
  {
    name: "Talenan Kayu",
    stock: 5,
  },
  {
    name: "Wadah Bumbu Plastik",
    stock: 80,
  },
  {
    name: "Wadah Bumbu Kaca",
    stock: 0,
  },
  {
    name: "Rak Piring Plastik",
    stock: 16,
  },
  {
    name: "Rak Sendok",
    stock: 7,
  },
];

export function StockLevelChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Tingkat Stok Saat Ini
      </h3>
      <div className="h-72 w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={0}
          minHeight={0}
        >
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#6B7280",
                fontSize: 12,
              }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#6B7280",
                fontSize: 12,
              }}
            />
            <Tooltip
              formatter={(value) => [`${value}`, "Jumlah Stok"]}
              cursor={{
                fill: "#F3F4F6",
              }}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                color: "#000",
              }}
            />
            <Bar dataKey="stock" radius={[4, 4, 0, 0]} barSize={40}>
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill="#3B82F6" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
