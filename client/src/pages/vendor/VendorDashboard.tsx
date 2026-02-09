import {
  ShoppingBag,
  DollarSign,
  Clock,
  TrendingUp,
} from 'lucide-react';

const StatCard = ({ title, value, trend, icon: Icon, note }: any) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-50 flex justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      <p className="text-sm text-green-600 mt-1">{trend}</p>
      {note && <p className="text-xs text-red-500 mt-1">{note}</p>}
    </div>
    <div className="h-12 w-12 rounded-xl bg-orange-50 text-[#FF9F3F] flex items-center justify-center">
      <Icon size={22} />
    </div>
  </div>
);

export const VendorDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-500">
          Welcome back, here's what's happening at your store today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Today's Orders" value="48" trend="+12%" icon={ShoppingBag} />
        <StatCard title="Today's Earnings" value="₹12,450" trend="+8%" icon={DollarSign} />
        <StatCard title="Pending Orders" value="5" trend="-2" icon={Clock} note="Needs attention" />
        <StatCard title="Avg Delivery Time" value="24m" trend="-2m" icon={TrendingUp} />
      </div>

      {/* Bottom section (keep minimal for now) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-orange-50">
          <h3 className="font-bold text-gray-800 mb-4">Recent Orders</h3>
          <div className="flex justify-between text-sm text-gray-600">
            <span>#123</span>
            <span>₹450</span>
            <span>Pending</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>#124</span>
            <span>₹320</span>
            <span>Delivered</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-orange-50">
          <h3 className="font-bold text-gray-800 mb-4">Top Products</h3>
          <p className="text-sm">Turmeric Powder – ₹120</p>
          <p className="text-xs text-green-600 mt-1">45 left</p>
        </div>
      </div>
    </div>
  );
};
