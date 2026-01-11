import { LowStockAlerts } from "@/components/common/LowStockAlerts";
import { QuickActions } from "@/components/common/QuickActions";
import { StatCard } from "@/components/ui/cards/StatCard";
import { MovementTrendsChart } from "@/components/ui/charts/MovementTrendsChart";
import { StockLevelChart } from "@/components/ui/charts/StockLevelChart";
import { AlertCircle, DollarSign, Package, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap space-y-3 items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Monitoring Stok</h1>
          <p className="text-gray-500 mt-1">
            Pantau kondisi stok dan aktivitas gudang secara real-time
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            Terakhir diperbarui: Sekarang
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Produk"
          value="1.248"
          icon={Package}
          trend={{
            value: "12%",
            isPositive: true,
          }}
          description="Jumlah produk tersedia"
        />
        <StatCard
          title="Total Nilai Stok"
          value="Rp 84.320.000"
          icon={DollarSign}
          trend={{
            value: "8,2%",
            isPositive: true,
          }}
          description="Nilai stok saat ini"
        />
        <StatCard
          title="Stok Menipis"
          value="23"
          icon={AlertCircle}
          trend={{
            value: "5",
            isPositive: false,
          }}
          description="Di bawah batas minimum"
        />
        <StatCard
          title="Pergerakan Bulanan"
          value="856"
          icon={TrendingUp}
          trend={{
            value: "18%",
            isPositive: true,
          }}
          description="Total transaksi bulan ini"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MovementTrendsChart />
        </div>
        <div className="lg:col-span-1">
          <LowStockAlerts />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StockLevelChart />
        </div>
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
