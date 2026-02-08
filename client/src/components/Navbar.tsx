import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  ShoppingBag,
  LogIn,
  ChevronDown,
  Package,
  User,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
  Store,
  Trash2,
  Plus,
  Minus,
  Search,
  Tag,
  X,
} from 'lucide-react';

import { EmptyCartIllustration } from './EmptyStateIllustrations';

/* ---------------- TYPES ---------------- */

interface CartItem {
  id?: string;
  name: string;
  price: number;
  qty?: number;
  quantity?: string;
}

interface UserType {
  name: string;
  phone: string;
}

interface NavbarProps {
  cartCount: number;
  cartItems: CartItem[];
  user: UserType | null;
  onLogout?: () => void;
  onRemoveFromCart?: (index: number) => void;
  onUpdateQuantity?: (index: number, quantity: number) => void;
}

/* ---------------- ROUTE MAP ---------------- */

const ROUTES = {
  home: '/',
  login: '/login',
  signup: '/signup',
  shops: '/shops',
  orders: '/orders',
  profile: '/profile',
};

/* ---------------- COMPONENT ---------------- */

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartItems = [],
  user,
  onLogout,
  onRemoveFromCart,
  onUpdateQuantity,
}) => {
  const navigate = useNavigate();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const cartDropdownRef = useRef<HTMLDivElement>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);

  /* ---------------- CLICK OUTSIDE ---------------- */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target as Node)) {
        setIsCartDropdownOpen(false);
      }
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        setIsLocationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ---------------- NAVIGATION ---------------- */

  const goTo = useCallback((path: string) => {
    setIsProfileDropdownOpen(false);
    navigate(path);
  }, [navigate]);

  const handleLogoutClick = useCallback(() => {
    setIsProfileDropdownOpen(false);
    onLogout?.();
    navigate(ROUTES.home);
  }, [navigate, onLogout]);

  /* ---------------- COUPONS ---------------- */

  const handleApplyCoupon = () => {
    const coupons: Record<string, number> = {
      FIRST50: 50,
      SAVE20: 20,
      WELCOME10: 10,
    };

    const discount = coupons[couponCode.toUpperCase()];
    if (!discount) {
      alert('Invalid coupon code');
      return;
    }

    setAppliedCoupon({ code: couponCode.toUpperCase(), discount });
    setCouponCode('');
  };

  const handleRemoveCoupon = () => setAppliedCoupon(null);

  /* ---------------- BILLING ---------------- */

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  const deliveryFee = subtotal > 0 ? (subtotal >= 200 ? 0 : 30) : 0;
  const discount = appliedCoupon?.discount || 0;
  const gstAmount = subtotal > 0 ? Math.round((subtotal - discount) * 0.05) : 0;
  const total = subtotal - discount + deliveryFee + gstAmount;

  function handleMenuItemClick(arg0: string): void {
    throw new Error('Function not implemented.');
  }

  /* ---------------- JSX (UNCHANGED UI) ---------------- */

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* 🔥 UI BELOW IS IDENTICAL — no visual changes */}
      {/* Only navigation logic changed */}
      {/* … your JSX continues EXACTLY the same … */}

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex items-center justify-between gap-3 lg:gap-6">

          {/* LEFT: Logo */}
          <button 
            onClick={() => navigate('home')}
            className="flex-shrink-0 text-left"
          >
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
              <span className="text-[#FF9933]">स्वदेशी</span> Mart
            </h1>
            <p className="text-[9px] lg:text-[10px] text-gray-600 -mt-1 hidden sm:block">
              Your Local Market
            </p>
          </button>

          {/* CENTER-LEFT: Location Dropdown */}
          <div ref={locationDropdownRef} className="relative hidden lg:block">
            <button
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              className="flex items-center gap-2 text-left group"
            >
              <MapPin className="w-5 h-5 text-[#138808] flex-shrink-0" />
              <div className="leading-tight">
                <p className="text-xs text-gray-500">
                  Delivering to
                </p>
                <p className="text-sm font-semibold text-[#138808] flex items-center gap-1">
                  Mumbai, Maharashtra
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-600 transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
                </p>
              </div>
            </button>

            {/* Location Dropdown */}
            {isLocationDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Select Delivery Location</h3>
                  
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 rounded-lg hover:bg-[#FFF5E6] transition-colors border-2 border-[#FF9933]">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#FF9933] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800 text-sm">Home</p>
                          <p className="text-xs text-gray-600">Mumbai, Maharashtra - 400001</p>
                        </div>
                      </div>
                    </button>

                    <button className="w-full text-left p-3 rounded-lg hover:bg-[#FFF5E6] transition-colors border-2 border-transparent">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800 text-sm">Office</p>
                          <p className="text-xs text-gray-600">Andheri East, Mumbai - 400069</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  <button className="w-full mt-3 py-2 text-sm text-[#FF9933] hover:bg-[#FFF5E6] rounded-lg font-medium transition-colors">
                    + Add New Address
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* CENTER: Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for vegetables, spices, grains..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent bg-[#F9FAFB] text-gray-800 placeholder-gray-500 text-sm"
              />
            </div>
          </div>

          {/* RIGHT: Login/User + Cart */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Login or User Dropdown */}
            {!user ? (
              <button
                onClick={() => navigate('login')}
                className="flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-2.5 text-[#FF9933] hover:bg-[#FFF5E6] rounded-lg transition-colors font-medium text-sm"
              >
                <LogIn className="w-4 lg:w-5 h-4 lg:h-5" />
                <span className="hidden sm:inline">Login</span>
              </button>
            ) : (
              <div ref={profileDropdownRef} className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-4 py-2 lg:py-2.5 hover:bg-[#FFF5E6] rounded-lg transition-colors cursor-pointer"
                >
                  <div className="w-7 lg:w-8 h-7 lg:h-8 rounded-full bg-gradient-to-br from-[#FF9933] to-[#138808] flex items-center justify-center text-white text-xs lg:text-sm font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-800 hidden xl:inline max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform hidden lg:block ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden max-h-[80vh] overflow-y-auto">
                    {/* User Info Header */}
                    <div className="bg-gradient-to-r from-[#FFF5E6] to-[#F0F9F0] p-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9933] to-[#138808] flex items-center justify-center text-white text-xl font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-600">{user.phone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={() => handleMenuItemClick('profile')}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FFF5E6] transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#FFF5E6] group-hover:bg-white flex items-center justify-center transition-colors flex-shrink-0">
                          <User className="w-5 h-5 text-[#FF9933]" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">My Account</p>
                          <p className="text-xs text-gray-500">View and edit profile</p>
                        </div>
                      </button>

                      <button
                        onClick={() => handleMenuItemClick('orders')}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FFF5E6] transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#FFF5E6] group-hover:bg-white flex items-center justify-center transition-colors flex-shrink-0">
                          <Package className="w-5 h-5 text-[#FF9933]" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">My Orders</p>
                          <p className="text-xs text-gray-500">Track and view orders</p>
                        </div>
                      </button>

                      <button
                        onClick={() => handleMenuItemClick('home')}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FFF5E6] transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#FFF5E6] group-hover:bg-white flex items-center justify-center transition-colors flex-shrink-0">
                          <Store className="w-5 h-5 text-[#FF9933]" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">Nearby Vendors</p>
                          <p className="text-xs text-gray-500">Browse local shops</p>
                        </div>
                      </button>

                      <button
                        onClick={() => handleMenuItemClick('profile')}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FFF5E6] transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#FFF5E6] group-hover:bg-white flex items-center justify-center transition-colors flex-shrink-0">
                          <MapPin className="w-5 h-5 text-[#FF9933]" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">Saved Addresses</p>
                          <p className="text-xs text-gray-500">Manage delivery locations</p>
                        </div>
                      </button>

                      <button
                        onClick={() => handleMenuItemClick('profile')}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FFF5E6] transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#FFF5E6] group-hover:bg-white flex items-center justify-center transition-colors flex-shrink-0">
                          <Heart className="w-5 h-5 text-[#FF9933]" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">Favorites</p>
                          <p className="text-xs text-gray-500">Saved shops & items</p>
                        </div>
                      </button>

                      <div className="my-2 border-t border-gray-100"></div>

                      <button
                        onClick={() => handleMenuItemClick('profile')}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FFF5E6] transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#FFF5E6] group-hover:bg-white flex items-center justify-center transition-colors flex-shrink-0">
                          <Settings className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">Settings</p>
                          <p className="text-xs text-gray-500">Account preferences</p>
                        </div>
                      </button>

                      <button
                        onClick={() => handleMenuItemClick('profile')}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FFF5E6] transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#FFF5E6] group-hover:bg-white flex items-center justify-center transition-colors flex-shrink-0">
                          <HelpCircle className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">Help & Support</p>
                          <p className="text-xs text-gray-500">Get assistance</p>
                        </div>
                      </button>

                      <div className="my-2 border-t border-gray-100"></div>

                      <button
                        onClick={() => handleMenuItemClick('logout')}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors flex-shrink-0">
                          <LogOut className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-red-600 text-sm">Log Out</p>
                          <p className="text-xs text-red-400">Sign out of your account</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cart Dropdown */}
            <div ref={cartDropdownRef} className="relative">
              <button
                onClick={() => setIsCartDropdownOpen(!isCartDropdownOpen)}
                className="relative p-2 hover:bg-[#FFF5E6] rounded-lg transition-colors"
              >
                <ShoppingBag className="w-5 lg:w-6 h-5 lg:h-6 text-[#FF9933]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1.5 flex items-center justify-center bg-[#FF9933] text-white text-xs font-bold rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Cart Dropdown */}
              {isCartDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-[90vw] sm:w-[420px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden max-h-[85vh] flex flex-col">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#FFF5E6] to-[#F0F9F0] px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800 text-base">Shopping Cart</h3>
                      <span className="text-sm text-gray-600">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
                    </div>
                  </div>

                  {/* Cart Items */}
                  <div className="flex-1 overflow-y-auto">
                    {cartItems.length === 0 ? (
                      <div className="p-6 text-center">
                        <div className="w-40 h-32 mx-auto mb-4">
                          <EmptyCartIllustration />
                        </div>
                        <p className="text-gray-700 font-medium text-sm mb-1">Your cart is empty</p>
                        <p className="text-gray-500 text-xs">Add items from nearby shops to get started</p>
                      </div>
                    ) : (
                      <div className="p-4 space-y-2.5">
                        {cartItems.map((item, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-[#FFF8F0] rounded-lg border border-[#FF9933]/10">
                            {/* Item Image */}
                            <div className="w-16 h-16 flex-shrink-0 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-yellow-50 rounded-md"></div>
                            </div>

                            {/* Item Details */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm text-gray-800 truncate mb-0.5">
                                {item.name}
                              </h4>
                              <p className="text-xs text-gray-500 mb-2">
                                {item.quantity || '1 kg'}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-base text-[#FF9933]">
                                  ₹{item.price * (item.qty || 1)}
                                </span>
                                
                                {/* Quantity Controls */}
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => onUpdateQuantity && onUpdateQuantity(index, Math.max(1, (item.qty || 1) - 1))}
                                    className="w-7 h-7 rounded-md bg-white border border-[#FF9933]/40 flex items-center justify-center hover:bg-[#FFF5E6] hover:border-[#FF9933] transition-colors"
                                  >
                                    <Minus className="w-3.5 h-3.5 text-[#FF9933]" />
                                  </button>
                                  <span className="text-sm font-semibold w-7 text-center text-gray-800">
                                    {item.qty || 1}
                                  </span>
                                  <button
                                    onClick={() => onUpdateQuantity && onUpdateQuantity(index, (item.qty || 1) + 1)}
                                    className="w-7 h-7 rounded-md bg-white border border-[#FF9933]/40 flex items-center justify-center hover:bg-[#FFF5E6] hover:border-[#FF9933] transition-colors"
                                  >
                                    <Plus className="w-3.5 h-3.5 text-[#FF9933]" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => onRemoveFromCart && onRemoveFromCart(index)}
                              className="p-1.5 hover:bg-red-50 rounded-md transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer with Bill */}
                  {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 bg-white">
                      {/* Coupon Section */}
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Enter coupon code"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent text-sm"
                            />
                          </div>
                          <button
                            onClick={handleApplyCoupon}
                            className="px-4 py-2.5 bg-[#FF9933] hover:bg-[#e8892d] text-white font-medium rounded-lg transition-colors text-sm whitespace-nowrap"
                          >
                            Apply
                          </button>
                        </div>
                        {appliedCoupon && (
                          <div className="mt-2 flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                            <div className="flex items-center gap-2">
                              <Tag className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-green-700">{appliedCoupon.code} applied</span>
                            </div>
                            <button
                              onClick={handleRemoveCoupon}
                              className="p-1 hover:bg-green-100 rounded transition-colors"
                            >
                              <X className="w-4 h-4 text-green-600" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Bill Details */}
                      <div className="p-4 space-y-2">
                        <h4 className="font-semibold text-gray-800 text-sm mb-3">Bill Details</h4>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Item Total</span>
                          <span className="font-medium text-gray-800">₹{subtotal}</span>
                        </div>

                        {appliedCoupon && (
                          <div className="flex justify-between text-sm">
                            <span className="text-green-600">Coupon Discount</span>
                            <span className="font-medium text-green-600">-₹{discount}</span>
                          </div>
                        )}

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Delivery Fee</span>
                          {deliveryFee === 0 ? (
                            <span className="font-medium text-[#138808]">FREE</span>
                          ) : (
                            <span className="font-medium text-gray-800">₹{deliveryFee}</span>
                          )}
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">GST (5%)</span>
                          <span className="font-medium text-gray-800">₹{gstAmount}</span>
                        </div>

                        {subtotal < 200 && subtotal > 0 && (
                          <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2 mt-2">
                            Add items worth ₹{200 - subtotal} more for FREE delivery
                          </div>
                        )}

                        <div className="flex justify-between text-base font-bold pt-3 border-t-2 border-gray-200">
                          <span className="text-gray-800">To Pay</span>
                          <span className="text-[#FF9933]">₹{total}</span>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <div className="p-4 pt-0">
                        <button className="w-full py-3.5 bg-[#FF9933] hover:bg-[#e8892d] text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg">
                          Proceed to Checkout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for vegetables, spices, grains..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent bg-[#F9FAFB] text-gray-800 placeholder-gray-500 text-sm"
            />
          </div>
        </div>

        {/* Mobile Location */}
        <div ref={locationDropdownRef} className="mt-2 lg:hidden">
          <button
            onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
            className="flex items-center gap-2 text-left"
          >
            <MapPin className="w-4 h-4 text-[#138808] flex-shrink-0" />
            <div className="leading-tight">
              <p className="text-xs text-gray-500">
                Delivering to
              </p>
              <p className="text-sm font-semibold text-[#138808] flex items-center gap-1">
                Mumbai, Maharashtra
                <ChevronDown className={`w-3.5 h-3.5 text-gray-600 transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
