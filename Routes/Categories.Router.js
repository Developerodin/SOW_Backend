import express from 'express';
import {
    createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategoriesById
} from '../Controllers/Categories.Controller.js';


const categoryRouter = express.Router();

// Create a new category
categoryRouter.post('/', createCategory);

// Get all categories
categoryRouter.get('/', getCategories);
categoryRouter.get('/:id', getCategoriesById);
// Update a category
categoryRouter.put('/:id', updateCategory);

// Delete a category
categoryRouter.delete('/:id', deleteCategory);

export default categoryRouter;
