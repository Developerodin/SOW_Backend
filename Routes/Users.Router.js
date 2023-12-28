import express from 'express';
import {
    createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../Controllers/Users.Controller.js';
import multer from 'multer';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'media/'); // Set the destination folder for image storage
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename for the stored image
  },
});
const upload = multer({ storage: storage });
const userRouter = express.Router();

// Create a new user
userRouter.post('/users',upload.array('images', 1), createUser);

// Get all users
userRouter.get('/users', getUsers);

// Get a specific user by ID
userRouter.get('/users/:id', getUserById);

// Update a user
userRouter.put('/users/:id', updateUser);

// Delete a user
userRouter.delete('/users/:id', deleteUser);

export default userRouter;
