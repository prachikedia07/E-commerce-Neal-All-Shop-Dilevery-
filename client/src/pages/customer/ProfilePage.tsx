import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  LogOut,
  Settings,
  ShoppingBag,
  Heart,
} from 'lucide-react';

/* ---------------- TYPES ---------------- */

interface User {
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'vendor' | 'rider';
  address?: string;
}

interface ProfilePageProps {
  user: User | null;
  cartCount: number;
  cartItems: any[];
  onLogout: () => void;
  onRemoveFromCart?: (index: number) => void;
  onUpdateQuantity?: (index: number, quantity: number) => void;
}

/* ---------------- COMPONENT ---------------- */

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  cartCount,
  cartItems,
  onLogout,
  onRemoveFromCart,
  onUpdateQuantity,
}) => {
  const navigate = useNavigate();

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
        {!user ? (
          /* Not logged in */
          <div className="bg-white rounded-2xl p-12 border-2 border-[#FF9933]/20 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-[#FFF5E6] rounded-full flex items-center justify-center">
              <UserIcon className="w-12 h-12 text-[#FF9933]" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Login to View Profile
            </h2>
            <p className="text-gray-600 mb-6">
              Please login to access your profile and settings
            </p>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-[#FF9933] hover:bg-[#e8892d] text-white font-medium rounded-lg transition-colors"
            >
              Login Now
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl p-8 border-2 border-[#FF9933]/20">
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF9933] to-[#138808] flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                    {user.name}
                  </h1>

                  <div className="inline-flex items-center px-3 py-1 bg-[#FFF5E6] text-[#FF9933] rounded-full text-sm font-medium mb-4 capitalize">
                    {user.role}
                  </div>

                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{user.phone}</span>
                    </div>
                    {user.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{user.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Edit Button */}
                <button className="px-4 py-2 border-2 border-[#FF9933]/40 text-[#FF9933] rounded-lg hover:bg-[#FFF5E6] transition-colors flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/orders')}
                className="bg-white rounded-2xl p-6 border-2 border-[#FF9933]/20 hover:border-[#FF9933] hover:shadow-lg transition-all text-left"
              >
                <div className="w-12 h-12 bg-[#FFF5E6] rounded-lg flex items-center justify-center mb-3">
                  <ShoppingBag className="w-6 h-6 text-[#FF9933]" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  My Orders
                </h3>
                <p className="text-sm text-gray-600">
                  View order history
                </p>
              </button>

              <button className="bg-white rounded-2xl p-6 border-2 border-[#FF9933]/20 hover:border-[#FF9933] hover:shadow-lg transition-all text-left">
                <div className="w-12 h-12 bg-[#FFF5E6] rounded-lg flex items-center justify-center mb-3">
                  <Heart className="w-6 h-6 text-[#FF9933]" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Favorites
                </h3>
                <p className="text-sm text-gray-600">
                  Saved shops & items
                </p>
              </button>

              <button className="bg-white rounded-2xl p-6 border-2 border-[#FF9933]/20 hover:border-[#FF9933] hover:shadow-lg transition-all text-left">
                <div className="w-12 h-12 bg-[#FFF5E6] rounded-lg flex items-center justify-center mb-3">
                  <MapPin className="w-6 h-6 text-[#FF9933]" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Addresses
                </h3>
                <p className="text-sm text-gray-600">
                  Manage delivery locations
                </p>
              </button>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="w-full bg-white rounded-2xl p-4 border-2 border-red-200 hover:border-red-400 hover:bg-red-50 transition-all flex items-center justify-center gap-2 text-red-600 font-medium"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
