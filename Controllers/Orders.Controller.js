import Order from "../Models/Orders.Model.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer details.category').exec();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to create a new order
export const createOrder = async (req, res) => {
  const { customer, details, totalAmount, orderDate, status } = req.body;

  try {
    const newOrder = new Order({
      customer,
      details,
      totalAmount,
      orderDate,
      status,
    });

    const savedOrder = await newOrder.save();
    const populatedOrder = await savedOrder.populate('customer details.category').execPopulate();
    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to get a specific order by ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate('customer details.category');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a specific order by ID
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { details, totalAmount, orderDate, status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { details, totalAmount, orderDate, status },
      { new: true }
    ).populate('customer details.category');

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a specific order by ID
export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id).populate('customer details.category');

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(deletedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};