import express from 'express';
import {
    createB2BUser,
    getB2BUsers,
    getB2BUserById,
    updateB2BUser,
    deleteB2BUser,
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

export default B2BUserRouter;
