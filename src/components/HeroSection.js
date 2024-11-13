import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function HeroSection() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        color: '#fff',
        padding: '60px 0',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to Our Product Showcase
        </Typography>
        <Typography variant="h6">
          Discover our exclusive collection of products handpicked just for you!
        </Typography>
      </Container>
    </Box>
  );
}

export default HeroSection;
