import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Card, CardContent, TextField, CardMedia, Button, Box } from '@mui/material';

const DraggableProductCard = ({ product, index, moveCard, saveProductChanges, onDelete }) => {
  const [editableProduct, setEditableProduct] = useState(product);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'CARD',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  }));

  const handleSave = () => {
    saveProductChanges(editableProduct); // Save changes to the database
  };

  const handleChange = (field, value) => {
    setEditableProduct((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box ref={(node) => drag(drop(node))} sx={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card sx={{ padding: 2, marginBottom: 2 }}>
        <CardMedia
          component="img"
          height="140"
          image={editableProduct.imageUrl || 'https://via.placeholder.com/150'}
          alt={editableProduct.title}
        />
        <CardContent>
          <TextField
            label="Title"
            value={editableProduct.title}
            onChange={(e) => handleChange('title', e.target.value)}
            fullWidth
            variant="outlined"
            margin="dense"
          />
          <TextField
            label="Description"
            value={editableProduct.description}
            onChange={(e) => handleChange('description', e.target.value)}
            fullWidth
            multiline
            variant="outlined"
            margin="dense"
          />
          <Button onClick={handleSave} variant="contained" sx={{ marginTop: 2 }}>
            Save Changes
          </Button>
          <Button onClick={() => onDelete(product._id)} variant="contained" color="secondary" sx={{ marginTop: 2, marginLeft: 2 }}>
            Delete
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DraggableProductCard;
