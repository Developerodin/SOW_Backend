import express from 'express';
import {
    createB2BUser,
    getB2BUsers,
    getB2BUserById,
    updateB2BUser,
    deleteB2BUser,
    addSubcategory,
    updateSubcategoryByIndex,
    deleteSubcategoryByIndex,
    updateCategory,
} from '../Controllers/B2BUsers.Controller.js';


const B2BUserRouter = express.Router();

// Create a new B2B user
B2BUserRouter.post('/', createB2BUser);

// Get all B2B users
B2BUserRouter.get('/', getB2BUsers);

// Get a specific B2B user by ID
B2BUserRouter.get('/:id', getB2BUserById);

// Update a B2B user
B2BUserRouter.put('/:id', updateB2BUser);

// Delete a B2B user
B2BUserRouter.delete('/:id', deleteB2BUser);

B2BUserRouter.post('/:userId/subcategories', addSubcategory);

// Update Subcategory by Index
B2BUserRouter.patch('/:userId/subcategories/:subcategoryIndex', updateSubcategoryByIndex);

// Delete Subcategory by Index
B2BUserRouter.delete('/:userId/subcategories/:subcategoryIndex', deleteSubcategoryByIndex);

// Update Category
B2BUserRouter.patch('/:userId/category', updateCategory);

export default B2BUserRouter;
