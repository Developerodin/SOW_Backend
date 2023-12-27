
import bcrypt from 'bcryptjs';
import Admin from '../Models/Admin.Model.js';

// Create a new admin
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(500).json({ error: 'Error creating admin' });
  }
};

// Get all admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching admins' });
  }
};

// Get a specific admin by ID
export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching admin by ID' });
  }
};

// Update an admin
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { name, email, password: hashedPassword },
      { new: true }
    );

    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: 'Error updating admin' });
  }
};

// Delete an admin
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await Admin.findByIdAndDelete(id);
    res.status(200).json(deletedAdmin);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting admin' });
  }
};
