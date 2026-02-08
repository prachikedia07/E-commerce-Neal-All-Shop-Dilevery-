import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Plus,
} from 'lucide-react';

/* ---------------- TYPES ---------------- */

interface ShopDetailPageProps {
  user: any;
  cartCount: number;
  cartItems: any[];
  onAddToCart: (item: any) => void;
  onLogout?: () => void;
  onRemoveFromCart?: (index: number) => void;
  onUpdateQuantity?: (index: number, quantity: number) => void;
}

/* ---------------- PRODUCT CARD ---------------- */

const ProductCard = ({ product, onAddToCart }: any) => (
  <div className="flex-shrink-0 w-48 bg-white rounded-xl border-2 border-[#FF9933]/20 p-3 hover:shadow-lg transition-all">
    <div className="w-full h-32 bg-gradient-to-br from-[#FFF5E6] to-[#F0F9F0] rounded-lg mb-3 flex items-center justify-center">
      <svg viewBox="0 0 64 64" className="w-12 h-12 opacity-60">
        <rect x="16" y="24" width="32" height="24" fill="#FF9933" rx="2" />
        <circle cx="32" cy="32" r="6" fill="#FFD700" />
        <path d="M26 20 L32 16 L38 20" stroke="#138808" strokeWidth="2" fill="none" />
      </svg>
    </div>

    <h4 className="font-medium text-sm text-gray-800 mb-1 truncate">
      {product.name}
    </h4>
    <p className="text-xs text-gray-500 mb-2">
      {product.quantity}
    </p>

    <div className="flex items-center justify-between">
      <span className="font-semibold text-[#FF9933]">
        ₹{product.price}
      </span>
      <button
        onClick={() => onAddToCart(product)}
        className="p-1.5 bg-[#138808] hover:bg-[#0f6906] text-white rounded-lg transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  </div>
);

/* ---------------- HORIZONTAL SECTION ---------------- */

const HorizontalScrollSection = ({ title, products, onAddToCart }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: dir === 'left' ? -250 : 250,
      behavior: 'smooth',
    });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="p-2 bg-white border-2 border-[#FF9933]/30 rounded-lg">
            <ChevronLeft className="w-4 h-4 text-[#FF9933]" />
          </button>
          <button onClick={() => scroll('right')} className="p-2 bg-white border-2 border-[#FF9933]/30 rounded-lg">
            <ChevronRight className="w-4 h-4 text-[#FF9933]" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth">
        {products.map((p: any) => (
          <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

/* ---------------- PAGE ---------------- */

export const ShopDetailPage: React.FC<ShopDetailPageProps> = ({
  user,
  cartCount,
  cartItems,
  onAddToCart,
  onLogout,
  onRemoveFromCart,
  onUpdateQuantity,
}) => {
  const navigate = useNavigate();
  const { shopId } = useParams(); // future-proof

  /* Mock data (unchanged UI) */
  const shop = {
    name: 'Sharma General Store',
    rating: 4.5,
    distance: '0.3 km',
    deliveryTime: '15-20 min',
    isOpen: true,
  };

  const popularItems = [
    { id: 'p1', name: 'Toor Dal', quantity: '1 kg', price: 120 },
    { id: 'p2', name: 'Rice (Basmati)', quantity: '5 kg', price: 450 },
    { id: 'p3', name: 'Wheat Flour', quantity: '10 kg', price: 380 },
  ];

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

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#FF9933] mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Shops
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-[#FF9933]/20">
          <h1 className="text-2xl font-semibold">{shop.name}</h1>
        </div>

        <HorizontalScrollSection
          title="Popular Items"
          products={popularItems}
          onAddToCart={onAddToCart}
        />

        {/* FORCE LOGIN CTA */}
        {!user && (
          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">
              Login to place orders
            </p>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-[#FF9933] text-white rounded-lg"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
