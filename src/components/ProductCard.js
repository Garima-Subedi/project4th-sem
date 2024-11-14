import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

function ProductCard({ product, onAddToCart }) {
  return (
    <Card sx={{ maxWidth: 300, margin: 'auto' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body1" sx={{ marginY: 1 }}>
          ${product.cost}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
