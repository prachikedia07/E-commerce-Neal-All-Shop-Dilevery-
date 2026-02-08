import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Navbar } from '../../components/Navbar';
import { CategoryCard } from '../../components/CategoryCard';
import { AnimatedIndianNeighborhood } from '../../components/AnimatedIndianNeighborhood';

/* ---------------- TYPES ---------------- */

interface User {
  name: string;
  phone: string;
}

interface Category {
  name: string;
  subtext: string;
  icon: string;
}

interface HomePageProps {
  user: User | null;
  cartCount: number;
  cartItems: any[];
  onCategoryClick?: (category: string) => void; // kept optional for now
  onLogout?: () => void;
  onRemoveFromCart?: (index: number) => void;
  onUpdateQuantity?: (index: number, quantity: number) => void;
}

/* ---------------- CONSTANTS ---------------- */

const CATEGORIES: Category[] = [
  { name: 'Kirana Store', subtext: '120+ shops nearby', icon: 'kirana' },
  { name: 'Medical Store', subtext: '45+ shops nearby', icon: 'medical' },
  { name: 'Bakery', subtext: '80+ shops nearby', icon: 'bakery' },
  { name: 'Sweet Shop', subtext: '95+ shops nearby', icon: 'sweet' },
  { name: 'Meat & Fish', subtext: '35+ shops nearby', icon: 'meat' },
  { name: 'Fruits & Vegetables', subtext: '150+ shops nearby', icon: 'fruits' },
  { name: 'Dairy Booth', subtext: '70+ shops nearby', icon: 'dairy' },
  { name: 'Stationery', subtext: '55+ shops nearby', icon: 'stationery' },
  { name: 'Mobile Repair', subtext: '40+ shops nearby', icon: 'mobile' },
  { name: 'Electrician', subtext: '60+ shops nearby', icon: 'electrician' },
  { name: 'Plumber', subtext: '50+ shops nearby', icon: 'plumber' },
  { name: 'Salon', subtext: '85+ shops nearby', icon: 'salon' },
  { name: 'Laundry', subtext: '45+ shops nearby', icon: 'laundry' },
  { name: 'Hardware Store', subtext: '30+ shops nearby', icon: 'hardware' },
  { name: 'Pooja Store', subtext: '65+ shops nearby', icon: 'pooja' },
];

/* ---------------- UI HELPERS ---------------- */

const TraditionalBorder: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`h-1 ${className}`}>
    <svg viewBox="0 0 200 4" className="w-full h-full" preserveAspectRatio="none">
      <pattern id="dots" x="0" y="0" width="8" height="4" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#FF9933" />
      </pattern>
      <rect width="200" height="4" fill="url(#dots)" />
    </svg>
  </div>
);

/* ---------------- COMPONENT ---------------- */

export const HomePage: React.FC<HomePageProps> = ({
  user,
  cartCount,
  cartItems,
  onLogout,
  onRemoveFromCart,
  onUpdateQuantity,
}) => {
  const navigate = useNavigate();

  const handleCategorySelect = (category: string) => {
    navigate(`/shops?category=${encodeURIComponent(category)}`);
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

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-[#FFF5E6] to-[#F0F9F0] min-h-[320px] flex items-center justify-center overflow-hidden">
        <AnimatedIndianNeighborhood />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">🌟</span>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
              Welcome to <span className="text-[#FF9933]">स्वदेशी</span> Mart
            </h1>
            <span className="text-2xl">🌿</span>
          </div>

          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Local shops, daily needs & services — delivered fast from stores near you.
          </p>

          <TraditionalBorder className="max-w-md mx-auto" />

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
              className="px-8 py-3 bg-[#FF9933] hover:bg-[#e8892d] text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
            >
              Shop Nearby
            </button>
            <button
              onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-[#FF9933] text-[#FF9933] hover:bg-[#FFF5E6] rounded-lg font-medium transition-colors"
            >
              Explore Categories
            </button>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
            Shop by Category
          </h2>
          <p className="text-gray-600">
            Choose from local shops and services in your neighborhood
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              subtext={category.subtext}
              icon={category.icon}
              onClick={() => handleCategorySelect(category.name)}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-[#FF9933]/20 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            © 2026 स्वदेशी Mart. Supporting local businesses across India.
          </p>
          <TraditionalBorder className="max-w-xs mx-auto mt-4" />
        </div>
      </footer>
    </div>
  );
};
