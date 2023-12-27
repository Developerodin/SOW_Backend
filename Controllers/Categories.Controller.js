import Category from "../Models/Categories.Model.js";


// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = new Category({ name, description });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error creating category' });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

export const getCategoriesById = async (req, res) => {
  try {
    const categories = await Category.find({_id: req.params.id});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
}
// Update a category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error updating category' });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting category' });
  }
};
