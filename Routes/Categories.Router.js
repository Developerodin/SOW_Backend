import express from 'express';
import {
    createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategoriesById,
  updateSubcategory,
  deleteSubcategory,
  addSubcategory
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

categoryRouter.post('/:id/subcategories', addSubcategory);
categoryRouter.put('/:categoryId/subcategories/:subcategoryId', updateSubcategory);
categoryRouter.delete('/:categoryId/subcategories/:subcategoryId', deleteSubcategory);

export default categoryRouter;
