import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { BrandLogo } from '../../../components/BrandLogo';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Store,
  BarChart3,
  User,
  LogOut,
} from 'lucide-react';

export const Sidebar = () => {
  const navigate = useNavigate();
const { logout } = useAuth();

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

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-orange-100">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
          <div className="flex items-center gap-3">
  <BrandLogo subtitle="Vendor Portal" />
</div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-1">
        {items.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            end={to === '/vendor'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive
                  ? 'bg-[#FF9F3F] text-white shadow-md'
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
  className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl w-full"
>
  <LogOut size={20} />
  Logout
</button>

      </div>
    </aside>
  );
};
