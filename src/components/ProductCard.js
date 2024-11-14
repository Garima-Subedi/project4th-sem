import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(value > 0 ? value : 1); // Ensure quantity is at least 1
  };

  return (
    <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2 }}>
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.title}
          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' }}
        />
      )}
      <Typography variant="h6" sx={{ color: 'black' }}>{product.title}</Typography>
      <Typography variant="body2">{product.description}</Typography>
      <Typography variant="body2">Cost: ${product.cost}</Typography>

      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        fullWidth
        sx={{ marginTop: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => onAddToCart({ ...product, quantity })}
        sx={{ marginTop: 2 }}
      >
        Add to Cart
      </Button>
    </Box>
  );
}

export default ProductCard;
