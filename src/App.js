import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCartItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + product.quantity } : item
        );
      } else {
        return [...prevCartItems, product];
      }
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage cartItems={cartItems} onAddToCart={handleAddToCart} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
