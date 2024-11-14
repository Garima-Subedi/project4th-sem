// import React, { useEffect, useState } from 'react';
// import API from '../api';
// import { TextField, Button, Typography, Box, Grid, CircularProgress } from '@mui/material';

// function AdminDashboard() {
//   const [products, setProducts] = useState([]);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await API.get('/products');
//       setProducts(response.data.sort((a, b) => a.order - b.order));
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     setPreviewUrl(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     if (image) formData.append('image', image);

//     try {
//       if (editId) {
//         await API.put(`/products/${editId}`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//           onUploadProgress: (progressEvent) => {
//             const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//             setUploadProgress(progress);
//           },
//         });
//       } else {
//         await API.post('/products', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//           onUploadProgress: (progressEvent) => {
//             const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//             setUploadProgress(progress);
//           },
//         });
//       }

//       setTitle('');
//       setDescription('');
//       setImage(null);
//       setPreviewUrl(null);
//       setUploadProgress(0);
//       setEditId(null);
//       fetchProducts();
//     } catch (error) {
//       console.error("Error saving product:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await API.delete(`/products/${id}`);
//       fetchProducts();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   const handleOrderChange = (index, newOrder) => {
//     const updatedProducts = [...products];
//     updatedProducts[index].order = newOrder;
//     setProducts(updatedProducts);
//   };

//   const handleSaveOrder = async () => {
//     try {
//       const updatedOrders = products.map(({ _id, order }) => ({ _id, order }));
//       await API.put('/products/reorder', { products: updatedOrders });
//       fetchProducts(); // Refresh the products list with new order
//     } catch (error) {
//       console.error("Error saving product order:", error);
//     }
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Admin Dashboard
//       </Typography>
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 4 }}
//       >
//         <TextField
//           label="Product Title"
//           variant="outlined"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           fullWidth
//           required
//         />
//         <TextField
//           label="Product Description"
//           variant="outlined"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           fullWidth
//           required
//         />
//         <Button
//           variant="contained"
//           component="label"
//           fullWidth
//           sx={{ marginTop: 2 }}
//         >
//           Upload Image
//           <input
//             type="file"
//             accept="image/*"
//             hidden
//             onChange={handleImageChange}
//           />
//         </Button>

//         {previewUrl && (
//           <Box sx={{ position: 'relative', display: 'inline-flex', marginTop: 2 }}>
//             <img src={previewUrl} alt="Preview" style={{ width: 100, height: 100, borderRadius: '50%' }} />
//             {uploadProgress > 0 && uploadProgress < 100 && (
//               <CircularProgress
//                 variant="determinate"
//                 value={uploadProgress}
//                 size={100}
//                 sx={{
//                   color: 'primary.main',
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                 }}
//               />
//             )}
//           </Box>
//         )}

//         <Button type="submit" variant="contained" color="primary" sx={{ height: '56px' }}>
//           {editId ? 'Update Product' : 'Add Product'}
//         </Button>
//       </Box>

//         <Grid container spacing={3}>
//     {products.map((product, index) => (
//       <Grid item key={product._id} xs={12} sm={6} md={4}>
//         <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2 }}>
//           {product.imageUrl && (
//             <img
//               src={product.imageUrl}
//               alt={product.title}
//               style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' }}
//             />
//           )}
//           <Typography variant="h6" sx={{ color: 'black' }}>{product.title}</Typography>
//           <Typography variant="body2">{product.description}</Typography>
//           <TextField
//             label="Order"
//             type="number"
//             value={product.order}
//             onChange={(e) => handleOrderChange(index, parseInt(e.target.value, 10))}
//             fullWidth
//             sx={{ marginTop: 2 }}
//           />
//           <Button
//             onClick={() => handleDelete(product._id)}
//             variant="contained"
//             color="secondary"
//             sx={{ marginTop: 2 }}
//           >
//             Delete
//           </Button>
//         </Box>
//       </Grid>
//     ))}
//   </Grid>

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSaveOrder}
//         sx={{ marginTop: 4 }}
//       >
//         Save Order
//       </Button>
//     </Box>
//   );
// }

// export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import API from '../api';
import { TextField, Button, Typography, Box, Grid, CircularProgress } from '@mui/material';

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
      const response = await API.get('/products');
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
        await API.put(`/products/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          },
        });
      } else {
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
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleOrderChange = (index, newOrder) => {
    const updatedProducts = [...products];
    updatedProducts[index].order = newOrder;
    setProducts(updatedProducts); // Update local state only
  };

  const handleSaveOrder = async () => {
    try {
      const updatedOrders = products.map(({ _id, order }) => ({ _id, order }));
      await API.put('/products/reorder', { products: updatedOrders });
      fetchProducts(); // Refresh the products list with new order
    } catch (error) {
      console.error("Error saving product order:", error);
    }
  };

  return (
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
              <TextField
                label="Order"
                type="number"
                value={product.order}
                onChange={(e) => handleOrderChange(index, parseInt(e.target.value, 10))}
                fullWidth
                sx={{ marginTop: 2 }}
              />
              <Button
                onClick={() => handleDelete(product._id)}
                variant="contained"
                color="secondary"
                sx={{ marginTop: 2 }}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveOrder}
        sx={{ marginTop: 4 }}
      >
        Save Order
      </Button>
    </Box>
  );
}

export default AdminDashboard;
