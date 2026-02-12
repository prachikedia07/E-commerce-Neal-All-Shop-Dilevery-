import { Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

import { HomePage } from "../pages/customer/HomePage";
import { NearbyShopsPage } from "../pages/customer/NearbyShopsPage";
import { ShopDetailPage } from "../pages/customer/ShopDetailPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { SignupPage } from "../pages/auth/SignupPage";
import { OrdersPage } from "../pages/customer/OrdersPage";
import { ProfilePage } from "../pages/customer/ProfilePage";

import { VendorLayout } from "../pages/vendor/VendorLayout";
import { VendorDashboard } from "../pages/vendor/VendorDashboard";
import { VendorProfile } from "../pages/vendor/VendorProfile";

import { useAuth } from "../context/AuthContext";
import { ProtectedRoute } from "../components/ProtectedRoute";

/* ---------- Wrapper ---------- */
function ShopDetailRoute(props: any) {
  const { shopId } = useParams();
  return <ShopDetailPage {...props} shopId={shopId || ""} />;
}

export default function AppRouter() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState<any[]>([]);

  const handleAddToCart = (item: any) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    const index = cartItems.findIndex((i) => i.id === item.id);
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

  const onNavigate = (path: string) => {
    navigate(`/${path}`);
  };

  return (
    <Routes>
      {/* PUBLIC ROUTES */}

      <Route
        path="/"
        element={
          <HomePage
            user={user}
            cartCount={cartItems.length}
            cartItems={cartItems}
            onCategoryClick={(cat) => {
              setSelectedCategory(cat);
              navigate("/shops");
            }}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        }
      />

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

      <Route
        path="/shops/:shopId"
        element={
          <ShopDetailRoute
            user={user}
            cartCount={cartItems.length}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onNavigate={onNavigate}
            onBack={() => navigate("/shops")}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        }
      />

      <Route
  path="/login"
  element={user ? <Navigate to={user.role === "vendor" ? "/vendor" : "/"} replace /> : <LoginPage />}
/>

<Route
  path="/signup"
  element={user ? <Navigate to={user.role === "vendor" ? "/vendor" : "/"} replace /> : <SignupPage />}
/>

      {/* <Route
  path="/login"
  element={user ? <Navigate to="/" replace /> : <LoginPage />}
/>

<Route
  path="/signup"
  element={user ? <Navigate to="/" replace /> : <SignupPage />}
/> */}


      {/* CUSTOMER PROTECTED */}

      <Route
        path="/orders"
        element={
          <ProtectedRoute role="customer">
            <OrdersPage
              user={user!}
              cartCount={cartItems.length}
              cartItems={cartItems}
              onRemoveFromCart={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage
              user={user!}
              cartCount={cartItems.length}
              cartItems={cartItems}
              onRemoveFromCart={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
              onLogout={() => {
                logout();
                navigate("/");
              }}
            />
          </ProtectedRoute>
        }
      />

      {/* VENDOR PROTECTED */}

      <Route
        path="/vendor"
        element={
          <ProtectedRoute role="vendor">
            <VendorLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<VendorDashboard />} />
        <Route path="profile" element={<VendorProfile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
