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


export const addSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, unit } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Use the addToSet method to add a subcategory without duplicates
    category.sub_category.addToSet({ name, price, unit });

    const updatedCategory = await category.save();

    res.status(201).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error adding subcategory' });
  }
};

// Update a subcategory within a category
export const updateSubcategory = async (req, res) => {
  try {
    const { categoryId, subcategoryId } = req.params;
    const { name, price, unit } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const subcategory = category.sub_category.id(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }

    subcategory.set({ name, price, unit });
    const updatedCategory = await category.save();

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error updating subcategory' });
  }
};

// Delete a subcategory within a category
export const deleteSubcategory = async (req, res) => {
  try {
    const { categoryId, subcategoryId } = req.params;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $pull: { sub_category: { _id: subcategoryId } } },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting subcategory' });
  }
};