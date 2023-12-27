import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  // Include fields from the existing User model
  name: {
    type: String,
    required: [true, 'An admin must have a name'],
    maxlength: [20, 'Username must be less than or equal to 20 characters.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  // Additional fields specific to the Admin model
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin',
  },
  // Add other fields as needed for the Admin model
}, {
  timestamps: true,
});

// Add middleware, methods, etc., as needed for the Admin model

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
