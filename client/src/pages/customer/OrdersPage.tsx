import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { NoOrdersIllustration } from '../../components/EmptyStateIllustrations';

/* ---------------- TYPES ---------------- */

type OrderStatus = 'delivered' | 'in-progress' | 'cancelled';

interface User {
  name: string;
  phone: string;
}

interface Order {
  id: string;
  shop: string;
  items: number;
  total: number;
  status: OrderStatus;
  date: string;
  time: string;
}

interface OrdersPageProps {
  user: User | null;
  cartCount: number;
  cartItems: any[];
  onLogout?: () => void;
  onRemoveFromCart?: (index: number) => void;
  onUpdateQuantity?: (index: number, quantity: number) => void;
}

/* ---------------- COMPONENT ---------------- */

export const OrdersPage: React.FC<OrdersPageProps> = ({
  user,
  cartCount,
  cartItems,
  onLogout,
  onRemoveFromCart,
  onUpdateQuantity,
}) => {
  const navigate = useNavigate();

  const orders: Order[] = user
    ? [
        {
          id: 'ORD-001',
          shop: 'Sharma General Store',
          items: 3,
          total: 520,
          status: 'delivered',
          date: '2026-01-15',
          time: '10:30 AM',
        },
        {
          id: 'ORD-002',
          shop: 'Patel Brothers',
          items: 5,
          total: 890,
          status: 'in-progress',
          date: '2026-01-16',
          time: '2:15 PM',
        },
      ]
    : [];

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-[#138808]" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-[#FF9933]" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return 'text-[#138808] bg-[#138808]/10';
      case 'in-progress':
        return 'text-[#FF9933] bg-[#FFF5E6]';
      case 'cancelled':
        return 'text-red-500 bg-red-50';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar
        cartCount={cartCount}
        cartItems={cartItems}
        user={user}
        onLogout={onLogout}
        onRemoveFromCart={onRemoveFromCart}
        onUpdateQuantity={onUpdateQuantity}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          My Orders
        </h1>

        {!user ? (
          /* Not logged in */
          <div className="bg-white rounded-2xl p-12 border-2 border-[#FF9933]/20 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-[#FFF5E6] rounded-full flex items-center justify-center">
              <Package className="w-12 h-12 text-[#FF9933]" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Login to View Orders
            </h2>
            <p className="text-gray-600 mb-6">
              Please login to see your order history
            </p>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-[#FF9933] hover:bg-[#e8892d] text-white font-medium rounded-lg transition-colors"
            >
              Login Now
            </button>
          </div>
        ) : orders.length === 0 ? (
          /* Empty state */
          <div className="bg-white rounded-2xl p-12 border-2 border-[#FF9933]/20 text-center">
            <div className="w-64 h-48 mx-auto mb-6">
              <NoOrdersIllustration />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              No Orders Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start shopping from local stores near you
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-[#FF9933] hover:bg-[#e8892d] text-white font-medium rounded-lg transition-colors"
            >
              Browse Shops
            </button>
          </div>
        ) : (
          /* Orders list */
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-6 border-2 border-[#FF9933]/20 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {order.shop}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Order ID: {order.id}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-lg text-[#FF9933]">
                      ₹{order.total}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.items} items
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-600">
                    {order.date} at {order.time}
                  </div>
                  <button className="px-4 py-2 border-2 border-[#FF9933]/40 text-[#FF9933] rounded-lg hover:bg-[#FFF5E6] transition-colors text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
