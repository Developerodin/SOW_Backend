import Product from "../Models/Products.Model.js";


// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stockQuantity } = req.body;
    const newProduct = new Product({ name, description, price, category, stockQuantity });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stockQuantity } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, stockQuantity }, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};
