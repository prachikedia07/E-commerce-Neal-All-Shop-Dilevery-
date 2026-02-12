// import React, { useState } from 'react';
// import { HomePage } from './components/HomePage';
// import { NearbyShopsPage } from './components/NearbyShopsPage';
// import { ShopDetailPage } from './components/ShopDetailPage';
// import { LoginPage } from './components/LoginPage';
// import { SignupPage } from './components/SignupPage';
// import { OrdersPage } from './components/OrdersPage';
// import { ProfilePage } from './components/ProfilePage';

// type Page = 'home' | 'nearby-shops' | 'shop-detail' | 'login' | 'signup' | 'orders' | 'profile';

// export interface User {
//   name: string;
//   email: string;
//   phone: string;
//   role: 'customer' | 'vendor' | 'rider';
//   address?: string;
// }

// function App() {
//   const [currentPage, setCurrentPage] = useState<Page>('home');
//   const [selectedCategory, setSelectedCategory] = useState<string>('');
//   const [selectedShopId, setSelectedShopId] = useState<string>('');
//   const [cartItems, setCartItems] = useState<any[]>([]);
//   const [user, setUser] = useState<User | null>(null);

//   const handleCategoryClick = (category: string) => {
//     setSelectedCategory(category);
//     setCurrentPage('nearby-shops');
//   };

//   const handleShopClick = (shopId: string) => {
//     setSelectedShopId(shopId);
//     setCurrentPage('shop-detail');
//   };

//   const handleAddToCart = (item: any) => {
//     // Check if item already exists in cart
//     const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    
//     if (existingItemIndex !== -1) {
//       // Item exists, increase quantity
//       const updatedCart = [...cartItems];
//       updatedCart[existingItemIndex] = {
//         ...updatedCart[existingItemIndex],
//         qty: (updatedCart[existingItemIndex].qty || 1) + 1
//       };
//       setCartItems(updatedCart);
//     } else {
//       // New item, add to cart with qty 1
//       setCartItems([...cartItems, { ...item, qty: 1 }]);
//     }
//   };

//   const handleRemoveFromCart = (index: number) => {
//     const updatedCart = cartItems.filter((_, i) => i !== index);
//     setCartItems(updatedCart);
//   };

//   const handleUpdateQuantity = (index: number, quantity: number) => {
//     if (quantity === 0) {
//       handleRemoveFromCart(index);
//     } else {
//       const updatedCart = [...cartItems];
//       updatedCart[index] = { ...updatedCart[index], qty: quantity };
//       setCartItems(updatedCart);
//     }
//   };

//   const handleLogin = (userData: User) => {
//     setUser(userData);
//     setCurrentPage('home');
//   };

//   const handleLogout = () => {
//     setUser(null);
//     setCurrentPage('home');
//   };

//   const navigateTo = (page: Page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="min-h-screen bg-[#FFF8EE]">
//       {currentPage === 'home' && (
//         <HomePage
//           user={user}
//           cartCount={cartItems.length}
//           cartItems={cartItems}
//           onCategoryClick={handleCategoryClick}
//           onNavigate={navigateTo}
//           onLogout={handleLogout}
//           onRemoveFromCart={handleRemoveFromCart}
//           onUpdateQuantity={handleUpdateQuantity}
//         />
//       )}
//       {currentPage === 'nearby-shops' && (
//         <NearbyShopsPage
//           category={selectedCategory}
//           user={user}
//           cartCount={cartItems.length}
//           cartItems={cartItems}
//           onShopClick={handleShopClick}
//           onNavigate={navigateTo}
//           onBack={() => setCurrentPage('home')}
//           onLogout={handleLogout}
//           onRemoveFromCart={handleRemoveFromCart}
//           onUpdateQuantity={handleUpdateQuantity}
//         />
//       )}
//       {currentPage === 'shop-detail' && (
//         <ShopDetailPage
//           shopId={selectedShopId}
//           user={user}
//           cartCount={cartItems.length}
//           cartItems={cartItems}
//           onAddToCart={handleAddToCart}
//           onNavigate={navigateTo}
//           onBack={() => setCurrentPage('nearby-shops')}
//           onLogout={handleLogout}
//           onRemoveFromCart={handleRemoveFromCart}
//           onUpdateQuantity={handleUpdateQuantity}
//         />
//       )}
//       {currentPage === 'login' && (
//         <LoginPage
//           onLogin={handleLogin}
//           onNavigate={navigateTo}
//         />
//       )}
//       {currentPage === 'signup' && (
//         <SignupPage
//           onSignup={handleLogin}
//           onNavigate={navigateTo}
//         />
//       )}
//       {currentPage === 'orders' && (
//         <OrdersPage
//           user={user}
//           cartCount={cartItems.length}
//           cartItems={cartItems}
//           onNavigate={navigateTo}
//           onLogout={handleLogout}
//           onRemoveFromCart={handleRemoveFromCart}
//           onUpdateQuantity={handleUpdateQuantity}
//         />
//       )}
//       {currentPage === 'profile' && (
//         <ProfilePage
//           user={user}
//           cartCount={cartItems.length}
//           cartItems={cartItems}
//           onNavigate={navigateTo}
//           onLogout={handleLogout}
//           onRemoveFromCart={handleRemoveFromCart}
//           onUpdateQuantity={handleUpdateQuantity}
//         />
//       )}
//     </div>
//   );
// }
// export default App;


import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./app/AppRouter";
import { Toaster } from "sonner";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
       <Toaster
  richColors
  position="top-right"
  closeButton
/>
      </BrowserRouter>
    </AuthProvider>
  );
}



