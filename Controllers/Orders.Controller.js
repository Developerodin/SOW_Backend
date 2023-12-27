import Order from "../Models/Orders.Model.js";


// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { customer, products, totalAmount } = req.body;
    const newOrder = new Order({ customer, products, totalAmount });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer').populate('products.product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { products, totalAmount } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(id, { products, totalAmount }, { new: true });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error updating order' });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    res.status(200).json(deletedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting order' });
  }
};
