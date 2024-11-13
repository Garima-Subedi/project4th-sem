import React, { useEffect, useState } from 'react';
import API from '../api';
import { TextField, Button, Typography, Box, Grid, CircularProgress } from '@mui/material';
import DraggableProductCard from '../components/DraggableProductCard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log("Fetching products from backend");
      const response = await API.get('/products');
      console.log("Products fetched:", response.data);
      setProducts(response.data.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      if (editId) {
        console.log("Updating product with ID:", editId);
        await API.put(`/products/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          },
        });
      } else {
        console.log("Adding new product:", title, description);
        await API.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          },
        });
      }

      setTitle('');
      setDescription('');
      setImage(null);
      setPreviewUrl(null);
      setUploadProgress(0);
      setEditId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting product with ID:", id);
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const saveProductChanges = async (product) => {
    try {
      console.log("Saving product changes for:", product);
      await API.put(`/products/${product._id}`, {
        title: product.title,
        description: product.description,
        imageUrl: product.imageUrl,
        order: product.order,
      });
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const moveCard = (dragIndex, hoverIndex) => {
    const draggedProduct = products[dragIndex];
    const updatedProducts = [...products];
    updatedProducts.splice(dragIndex, 1);
    updatedProducts.splice(hoverIndex, 0, draggedProduct);

    const reorderedProducts = updatedProducts.map((prod, index) => ({
      ...prod,
      order: index,
    }));

    setProducts(reorderedProducts);
    reorderedProducts.forEach(saveProductChanges);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 4 }}
        >
          <TextField
            label="Product Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Product Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            required
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>

          {previewUrl && (
            <Box sx={{ position: 'relative', display: 'inline-flex', marginTop: 2 }}>
              <img src={previewUrl} alt="Preview" style={{ width: 100, height: 100, borderRadius: '50%' }} />
              {uploadProgress > 0 && uploadProgress < 100 && (
                <CircularProgress
                  variant="determinate"
                  value={uploadProgress}
                  size={100}
                  sx={{
                    color: 'primary.main',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />
              )}
            </Box>
          )}
          
          <Button type="submit" variant="contained" color="primary" sx={{ height: '56px' }}>
            {editId ? 'Update Product' : 'Add Product'}
          </Button>
        </Box>

        <Grid container spacing={3}>
          {products.map((product, index) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <DraggableProductCard
                product={product}
                index={index}
                moveCard={moveCard}
                saveProductChanges={saveProductChanges}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </DndProvider>
  );
}

export default AdminDashboard;
