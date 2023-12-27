import express from 'express';
import {
    createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../Controllers/Users.Controller.js';


const userRouter = express.Router();

// Create a new user
userRouter.post('/users', createUser);

// Get all users
userRouter.get('/users', getUsers);

// Get a specific user by ID
userRouter.get('/users/:id', getUserById);

// Update a user
userRouter.put('/users/:id', updateUser);

// Delete a user
userRouter.delete('/users/:id', deleteUser);

export default userRouter;
