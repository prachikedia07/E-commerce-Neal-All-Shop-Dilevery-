import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import { HomePage } from '../pages/customer/HomePage';
import { NearbyShopsPage } from '../pages/customer/NearbyShopsPage';
import { ShopDetailPage } from '../pages/customer/ShopDetailPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { SignupPage } from '../pages/auth/SignupPage';
import { OrdersPage } from '../pages/customer/OrdersPage';
import { ProfilePage } from '../pages/customer/ProfilePage';

export interface User {
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'vendor' | 'rider';
  address?: string;
}

export default function AppRouter() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [user, setUser] = useState<User | null>(null);

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

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            user={user}
            cartCount={cartItems.length}
            cartItems={cartItems}
            onCategoryClick={setSelectedCategory}
            onNavigate={() => {}}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        }
      />

      <Route
        path="/shops"
        element={
          <NearbyShopsPage
            category={selectedCategory}
            user={user}
            cartCount={cartItems.length}
            cartItems={cartItems}
            onShopClick={() => {}}
            onNavigate={() => {}}
            onBack={() => {}}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        }
      />

      <Route
        path="/shops/:shopId"
        element={
          <ShopDetailPage
            shopId=""
            user={user}
            cartCount={cartItems.length}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onNavigate={() => {}}
            onBack={() => {}}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        }
      />

      <Route path="/login" element={<LoginPage onLogin={setUser} onNavigate={() => {}} />} />
      <Route path="/signup" element={<SignupPage onSignup={setUser} onNavigate={() => {}} />} />

      <Route
        path="/orders"
        element={
          user ? (
            <OrdersPage
              user={user}
              cartCount={cartItems.length}
              cartItems={cartItems}
              onNavigate={() => {}}
              onRemoveFromCart={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/profile"
        element={
          user ? (
            <ProfilePage
                    user={user}
                    cartCount={cartItems.length}
                    cartItems={cartItems}
                    onNavigate={() => { } }
                    onRemoveFromCart={handleRemoveFromCart}
                    onUpdateQuantity={handleUpdateQuantity} onLogout={function (): void {
                        throw new Error('Function not implemented.');
                    } }            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}
