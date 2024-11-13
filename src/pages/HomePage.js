import React, { useEffect, useState } from 'react';
import API from '../api';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await API.get('/products');
      setProducts(response.data);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <HeroSection />
      <Container sx={{ paddingY: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default HomePage;
