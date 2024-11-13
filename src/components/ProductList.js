import React, { useEffect, useState } from 'react';
import API from '../api';
import ProductCard from './ProductCard';
import Grid from '@mui/material/Grid';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await API.get('/products');
      setProducts(response.data);
    }
    fetchProducts();
  }, []);

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ padding: 2 }}>
      {products.map((product) => (
        <Grid item key={product._id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
