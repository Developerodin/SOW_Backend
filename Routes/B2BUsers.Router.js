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
B2BUserRouter.post('/b2busers', createB2BUser);

// Get all B2B users
B2BUserRouter.get('/b2busers', getB2BUsers);

// Get a specific B2B user by ID
B2BUserRouter.get('/b2busers/:id', getB2BUserById);

// Update a B2B user
B2BUserRouter.put('/b2busers/:id', updateB2BUser);

// Delete a B2B user
B2BUserRouter.delete('/b2busers/:id', deleteB2BUser);

export default B2BUserRouter;
