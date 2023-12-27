import Complaint from "../Models/Complains.Model.js";


// Create a new complaint
export const createComplaint = async (req, res) => {
  try {
    const { user, title, description } = req.body;
    const newComplaint = new Complaint({ user, title, description });
    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (error) {
    res.status(500).json({ error: 'Error creating complaint' });
  }
};

// Get all complaints
export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('user').populate('assignedTo');
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching complaints' });
  }
};

// Get a specific complaint by ID
export const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findById(id).populate('user').populate('assignedTo');
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching complaint by ID' });
  }
};

// Update a complaint
export const updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, assignedTo } = req.body;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { title, description, status, assignedTo, updatedAt: Date.now() },
      { new: true }
    );

    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ error: 'Error updating complaint' });
  }
};

// Delete a complaint
export const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComplaint = await Complaint.findByIdAndDelete(id);
    res.status(200).json(deletedComplaint);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting complaint' });
  }
};
