import express from 'express';
import {
    createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} from '../Controllers/Admin.Controller.js';

const adminRouter = express.Router();

// Create a new admin
adminRouter.post('/admins', createAdmin);

// Get all admins
adminRouter.get('/admins', getAdmins);

// Get a specific admin by ID
adminRouter.get('/admins/:id', getAdminById);

// Update an admin
adminRouter.put('/admins/:id', updateAdmin);

// Delete an admin
adminRouter.delete('/admins/:id', deleteAdmin);

export default adminRouter;
