import React, { useEffect, useState } from 'react';
import API from '../api';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import { Drawer, IconButton, Box, Typography, Button, Grid, Container, TextField, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const response = await API.get('/products');
      setProducts(response.data);
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCartItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item._id === id ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.cost * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems);
    alert('Checkout complete!');
    setCartItems([]); // Clear cart after checkout
    setIsCartOpen(false);
  };

  return (
    <div>
      <HeroSection />
      <Container sx={{ paddingY: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Products</Typography>
          <IconButton onClick={toggleCart}>
            <ShoppingCartIcon fontSize="large" />
          </IconButton>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} onAddToCart={() => handleAddToCart(product)} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Cart Sidebar */}
      <Drawer anchor="right" open={isCartOpen} onClose={toggleCart}>
        <Box sx={{ width: 300, padding: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Your Cart</Typography>
            <IconButton onClick={toggleCart}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 2 }} />

          {cartItems.length === 0 ? (
            <Typography>Your cart is empty</Typography>
          ) : (
            <Box sx={{ flex: 1, overflowY: 'auto' }}>
              {cartItems.map((item) => (
                <Box key={item._id} sx={{ borderBottom: '1px solid #ccc', paddingBottom: 2, marginBottom: 2 }}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <Box>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body2">{item.description}</Typography>
                    </Box>
                  </Box>
                  <Typography>Cost: ${item.cost}</Typography>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value, 10))}
                    fullWidth
                    sx={{ marginTop: 1 }}
                  />
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemoveItem(item._id)}
                    fullWidth
                    sx={{ marginTop: 1 }}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
            </Box>
          )}

          {cartItems.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">${calculateTotal()}</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </div>
  );
}

export default HomePage;
