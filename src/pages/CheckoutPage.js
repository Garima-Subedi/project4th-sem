import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, TextField, Grid, Button, Divider } from '@mui/material';

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], total = 0 } = location.state || {};

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    navigate('/'); // Redirect back to the homepage after placing the order
    // Optionally, you can clear the cart here if you're managing it globally
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Box my={4}>
        <Typography variant="h6">Your Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Mobile Number" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Delivery Address" fullWidth required multiline rows={3} />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h6">Order Summary</Typography>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Box key={item._id} display="flex" justifyContent="space-between" my={2}>
              <Typography>
                {item.title} x {item.quantity}
              </Typography>
              <Typography>${(item.cost * item.quantity).toFixed(2)}</Typography>
            </Box>
          ))
        ) : (
          <Typography>Your cart is empty</Typography>
        )}
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="space-between" my={2}>
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h6">${total}</Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 4 }}
        onClick={handlePlaceOrder}
      >
        Place Order
      </Button>
    </Container>
  );
}

export default CheckoutPage;
