import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { BrandLogo } from '../../../components/BrandLogo';
import { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Store,
  BarChart3,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

export const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const items = [
    { label: 'Dashboard', to: '/vendor', icon: LayoutDashboard },
    { label: 'Orders', to: '/vendor/orders', icon: ShoppingBag },
    { label: 'Products', to: '/vendor/products', icon: Package },
    { label: 'Inventory', to: '/vendor/inventory', icon: Store },
    { label: 'Earnings', to: '/vendor/earnings', icon: BarChart3 },
    { label: 'Profile', to: '/vendor/profile', icon: User },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo + Close button (mobile) */}
      <div className="p-6 flex items-center justify-between">
        <BrandLogo subtitle="Vendor Portal" />
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-orange-50 transition-colors"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1">
        {items.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            end={to === '/vendor'}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive
                  ? 'bg-[#FF9F3F] text-white shadow-md shadow-orange-200'
                  : 'text-gray-700 hover:bg-orange-50'
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-orange-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl w-full transition-colors"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Hamburger — mobile only */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-3.5 left-4 z-40 p-2 rounded-xl bg-white border border-orange-100 shadow-sm text-gray-600 hover:text-[#FF9F3F] hover:border-orange-300 transition-all"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-72 z-50 bg-white border-r border-orange-100 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Desktop sidebar — always visible */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-orange-100">
        <SidebarContent />
      </aside>
    </>
  );
};