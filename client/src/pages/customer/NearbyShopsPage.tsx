import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { ArrowLeft, Star, MapPin, Clock } from 'lucide-react';

/* ---------------- TYPES ---------------- */

interface User {
  name: string;
  phone: string;
}

interface Shop {
  id: string;
  name: string;
  rating: number;
  distance: string;
  isOpen: boolean;
  deliveryTime: string;
}

interface NearbyShopsPageProps {
  user: User | null;
  cartCount: number;
  cartItems: any[];
  onLogout?: () => void;
  onRemoveFromCart?: (index: number) => void;
  onUpdateQuantity?: (index: number, quantity: number) => void;
}

/* ---------------- MOCK DATA ---------------- */

const SHOPS: Shop[] = [
  { id: '1', name: 'Sharma General Store', rating: 4.5, distance: '0.3 km', isOpen: true, deliveryTime: '15-20 min' },
  { id: '2', name: 'Gupta Enterprises', rating: 4.2, distance: '0.5 km', isOpen: true, deliveryTime: '20-25 min' },
  { id: '3', name: 'Patel Brothers', rating: 4.7, distance: '0.8 km', isOpen: true, deliveryTime: '25-30 min' },
  { id: '4', name: 'Singh General Store', rating: 4.3, distance: '1.0 km', isOpen: false, deliveryTime: '30-35 min' },
  { id: '5', name: 'Kumar Store', rating: 4.6, distance: '1.2 km', isOpen: true, deliveryTime: '35-40 min' },
  { id: '6', name: 'Verma Traders', rating: 4.4, distance: '1.5 km', isOpen: true, deliveryTime: '40-45 min' },
];

/* ---------------- COMPONENT ---------------- */

export const NearbyShopsPage: React.FC<NearbyShopsPageProps> = ({
  user,
  cartCount,
  cartItems,
  onLogout,
  onRemoveFromCart,
  onUpdateQuantity,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category') || 'Nearby Shops';

  const openShopsCount = SHOPS.filter(shop => shop.isOpen).length;

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

      <div className="max-w-2xl mx-auto px-1 py-6">
        {/* Back Button & Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#FF9933] hover:text-[#e8892d] mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Categories</span>
          </button>

          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
            {category}
          </h1>
          <p className="text-gray-600">
            {openShopsCount} shops open near you
          </p>
        </div>

        {/* Shop Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SHOPS.map((shop) => (
            <button
              key={shop.id}
              onClick={() => navigate(`/shops/${shop.id}`)}
              className="bg-white rounded-2xl p-5 border-2 border-transparent hover:border-[#FF9933] hover:shadow-lg transition-all duration-300 text-left"
            >
              {/* Vendor Profile Image Placeholder */}
              <div className="w-full h-20 bg-gradient-to-br from-[#FFF5E6] to-[#F0F9F0] rounded-xl mb-4 flex items-center justify-center border-2 border-[#FF9933]/20">
                <svg viewBox="0 0 100 100" className="w-20 h-20 opacity-50">
                  <circle cx="50" cy="35" r="15" fill="#FF9933" />
                  <path d="M30 70 Q30 50 50 50 Q70 50 70 70 Z" fill="#FF9933" />
                  <rect x="20" y="75" width="60" height="20" fill="#138808" rx="3" />
                </svg>
              </div>

              {/* Shop Info */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-gray-800">
                  {shop.name}
                </h3>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                    <span className="font-medium text-gray-700">{shop.rating}</span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{shop.distance}</span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{shop.deliveryTime}</span>
                  </div>
                </div>

                {/* Open/Closed Status */}
                <div className="pt-2">
                  {shop.isOpen ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#138808]/10 text-[#138808] rounded-full text-xs font-medium">
                      <span className="w-2 h-2 bg-[#138808] rounded-full animate-pulse" />
                      Open Now
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-medium">
                      <span className="w-2 h-2 bg-gray-600 rounded-full" />
                      Closed
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
