import { BoxIcon } from "lucide-react";
interface StatCardProps {
  title: string;
  value: string;
  icon: typeof BoxIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  description?: string;
}
export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  description,
}: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        {trend && (
          <span
            className={`text-sm font-medium px-2 py-1 rounded-full ${
              trend.isPositive
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {description && (
          <p className="text-sm text-gray-400 mt-2">{description}</p>
        )}
      </div>
    </div>
  );
}
