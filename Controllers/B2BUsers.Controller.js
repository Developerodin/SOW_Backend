import { B2BUser } from "../Models/B2BUsers.Model.js";


// Create a new user
export const createB2BUser = async (req, res) => {
  try {
    console.log("Creating  b2b user...",req.files);
    const images = req.files || [];
    const newUser = req.body;
    const AdharData = req.body.adharData;
    const Adhar = JSON.parse(AdharData)
    newUser.adharData = Adhar
    newUser.images = images.map(file => ({
      filename: file.filename,
      path: file.path
  }));
  console.log("new User in b2b", newUser);
    const savedUser = await B2BUser.create(newUser);
    res.status(201).json(savedUser);
  } catch (error) {
    console.log("Error in b2b", error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Get all users
export const getB2BUsers = async (req, res) => {
  try {
    const users = await B2BUser.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Get a specific user by ID
export const getB2BUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await B2BUser.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user by ID' });
  }
};

// Update a user
export const updateB2BUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await B2BUser.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

// Delete a user
export const deleteB2BUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await B2BUser.findByIdAndDelete(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};
