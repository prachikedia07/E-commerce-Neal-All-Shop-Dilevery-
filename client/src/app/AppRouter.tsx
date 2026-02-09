import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import { HomePage } from '../pages/customer/HomePage';
import { NearbyShopsPage } from '../pages/customer/NearbyShopsPage';
import { ShopDetailPage } from '../pages/customer/ShopDetailPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { SignupPage } from '../pages/auth/SignupPage';
import { OrdersPage } from '../pages/customer/OrdersPage';
import { ProfilePage } from '../pages/customer/ProfilePage';
import { VendorLayout } from '../pages/vendor/VendorLayout';
import { VendorDashboard } from '../pages/vendor/VendorDashboard';
import { VendorProfile } from '../pages/vendor/VendorProfile';

const DEV_VENDOR_MODE = true; // 👈 turn OFF later

export interface User {
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'vendor' | 'rider';
  address?: string;
}

/* ---------- Wrapper for shop detail (URL param fix) ---------- */
function ShopDetailRoute(props: any) {
  const { shopId } = useParams();
  return <ShopDetailPage {...props} shopId={shopId || ''} />;
}

export default function AppRouter() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [user, setUser] = useState<User | null>(null);


  
  /* ---------- Cart helpers ---------- */
  const handleAddToCart = (item: any) => {
    const index = cartItems.findIndex(i => i.id === item.id);
    if (index !== -1) {
      const updated = [...cartItems];
      updated[index].qty += 1;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity === 0) handleRemoveFromCart(index);
    else {
      const updated = [...cartItems];
      updated[index].qty = quantity;
      setCartItems(updated);
    }
  };

  /* ---------- Navigation bridge ---------- */
  const onNavigate = (path: string) => {
    navigate(`/${path}`);
  };

  return (
    <Routes>
      {/* Home */}
      <Route
        path="/"
        element={
          <HomePage
            user={user}
            cartCount={cartItems.length}
            cartItems={cartItems}
            onCategoryClick={(cat) => {
              setSelectedCategory(cat);
              navigate('/shops');
            }}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        }
      />

      {/* Shops */}
      <Route
  path="/shops"
  element={
    <NearbyShopsPage
      user={user}
      cartCount={cartItems.length}
      cartItems={cartItems}
      onRemoveFromCart={handleRemoveFromCart}
      onUpdateQuantity={handleUpdateQuantity}
    />
  }
/>


      {/* Shop detail */}
      <Route
        path="/shops/:shopId"
        element={
          <ShopDetailRoute
            user={user}
            cartCount={cartItems.length}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onNavigate={onNavigate}
            onBack={() => navigate('/shops')}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        }
      />

      {/* Auth */}
      <Route
        path="/login"
        element={<LoginPage onLogin={setUser} />}
      />

      <Route
        path="/signup"
        element={<SignupPage onSignup={setUser} />}
      />

      {/* Orders (protected) */}
      <Route
        path="/orders"
        element={
          user ? (
            <OrdersPage
              user={user}
              cartCount={cartItems.length}
              cartItems={cartItems}
              onRemoveFromCart={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Profile (protected) */}
      <Route
        path="/profile"
        element={
          user ? (
            <ProfilePage
              user={user}
              cartCount={cartItems.length}
              cartItems={cartItems}
              onRemoveFromCart={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
              onLogout={() => {
                setUser(null);
                navigate('/');
              }}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
      {/* ================= VENDOR ROUTES ================= */}
<Route
  path="/vendor"
  element={
    DEV_VENDOR_MODE || user?.role === 'vendor'
      ? <VendorLayout />
      : <Navigate to="/login" replace />
  }
>

  <Route index element={<VendorDashboard />} />
  <Route path="profile" element={<VendorProfile />} />
</Route>

    </Routes>
    
  );
}


