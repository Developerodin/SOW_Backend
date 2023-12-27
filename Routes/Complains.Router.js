import express from 'express';
import {
    createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
}  from '../Controllers/Complains.Controller.js'


const complaintRouter = express.Router();

// Create a new complaint
complaintRouter.post('/complaints', createComplaint);

// Get all complaints
complaintRouter.get('/complaints', getComplaints);

// Get a specific complaint by ID
complaintRouter.get('/complaints/:id', getComplaintById);

// Update a complaint
complaintRouter.put('/complaints/:id', updateComplaint);

// Delete a complaint
complaintRouter.delete('/complaints/:id', deleteComplaint);

export default complaintRouter;
