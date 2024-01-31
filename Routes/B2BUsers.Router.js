import express from 'express';
import {
    createB2BUser,
    getB2BUsers,
    getB2BUserById,
    updateB2BUser,
    deleteB2BUser,
    addB2BSubcategory,
    updateB2BSubcategoryByIndex,
    deleteB2BSubcategoryByIndex,
    updateB2BCategory,
    generateOTPController,
    loginWithOTPController,
    getUserCategoryAndSubcategory,
} from '../Controllers/B2BUsers.Controller.js';


const B2BUserRouter = express.Router();


B2BUserRouter.post('/generate-otp', generateOTPController);

// Endpoint to validate OTP and login the user
B2BUserRouter.post('/login-with-otp', loginWithOTPController);
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

B2BUserRouter.post('/:categoryId/subcategories', addB2BSubcategory);

// Update Subcategory by Index
B2BUserRouter.patch('/:categoryId/subcategories/:subcategoryId', updateB2BSubcategoryByIndex);

// Delete Subcategory by Index
B2BUserRouter.delete('/:categoryId/subcategories/:subcategoryId', deleteB2BSubcategoryByIndex);

// Update Category
B2BUserRouter.patch('/:userId/category', updateB2BCategory);

B2BUserRouter.get('/:userId/category-subcategory', getUserCategoryAndSubcategory);

export default B2BUserRouter;
