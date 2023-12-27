import express from 'express';
import {
    createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from '../Controllers/Categories.Controller.js';


const categoryRouter = express.Router();

// Create a new category
categoryRouter.post('/categories', createCategory);

// Get all categories
categoryRouter.get('/categories', getCategories);

// Update a category
categoryRouter.put('/categories/:id', updateCategory);

// Delete a category
categoryRouter.delete('/categories/:id', deleteCategory);

export default categoryRouter;
