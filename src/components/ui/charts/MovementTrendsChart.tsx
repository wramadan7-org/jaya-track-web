import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { day: "Sen", in: 45, out: 32 },
  { day: "Sel", in: 52, out: 28 },
  { day: "Rab", in: 38, out: 45 },
  { day: "Kam", in: 65, out: 30 },
  { day: "Jum", in: 48, out: 55 },
  { day: "Sab", in: 25, out: 15 },
  { day: "Min", in: 15, out: 10 },
];

export function MovementTrendsChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Tren Pergerakan Barang (7 Hari)
      </h3>
      <div className="h-72 w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={0}
          minHeight={0}
        >
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="day"
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
              formatter={(value, name) => [value, name]}
              labelFormatter={(label) => `Hari: ${label}`}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                color: "#000",
              }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Area
              type="monotone"
              dataKey="in"
              name="Barang Masuk"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#colorIn)"
            />
            <Area
              type="monotone"
              dataKey="out"
              name="Barang Keluar"
              stroke="#EF4444"
              strokeWidth={2}
              fill="url(#colorOut)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
