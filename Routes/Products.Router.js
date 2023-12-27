import express from 'express';
import {
    createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from '../Controllers/Products.Controller.js';

const productRouter = express.Router();

// Create a new product
productRouter.post('/products', createProduct);

// Get all products
productRouter.get('/products', getProducts);

// Update a product
productRouter.put('/products/:id', updateProduct);

// Delete a product
productRouter.delete('/products/:id', deleteProduct);

export default productRouter;
