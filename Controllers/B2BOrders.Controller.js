import B2BOrder from "../Models/B2BOrdersModel.js";

// Create a new B2B order
export const createB2BOrder = async (req, res) => {
  try {
    const { from, to, details, totalAmount, status } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000);
    const newOrder = new B2BOrder({ from, to, details, totalAmount, status, otp });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error creating B2B order' });
  }
};

// Get all B2B orders
export const getB2BOrders = async (req, res) => {
  try {
    const orders = await B2BOrder.find().populate('from')
    .populate('to').exec();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching B2B orders' });
  }
};

// Get B2B order by ID
export const getB2BOrderById = async (req, res) => {
  try {
    const order = await B2BOrder.findById(req.params.id) .populate('from')
    .populate('to').exec();
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching B2B order' });
  }
};

// Update B2B order
export const updateB2BOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { from, to, details, totalAmount, status } = req.body;
    const updatedOrder = await B2BOrder.findByIdAndUpdate(id, { from, to, details, totalAmount, status }, { new: true });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error updating B2B order' });
  }
};

// Delete B2B order
export const deleteB2BOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await B2BOrder.findByIdAndDelete(id);
    res.status(200).json(deletedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting B2B order' });
  }
};



export const getOrdersByFromUserId = async(req, res) =>{
  try {
    const userId = req.params.userId;
    const query = { from: userId };
     console.log(query);
    const orders = await B2BOrder.find(query) .populate('from')
    .populate('to').exec();
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getOrdersByToUserId = async(req, res) =>{
  try {
    const userId = req.params.userId;
    const query = { to: userId };

    const orders = await B2BOrder.find(query).populate('from')
    .populate('to').exec();
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export const updateOrderStatusAndQuantity = async (req, res) => {
  try {
    const orderId = req.params.orderId; // Assuming orderId is part of the route parameters
    const { status, quantity } = req.body;

    // Find the order by ID
    const order = await B2BOrder.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update order status and quantity
    order.status = status || order.status; // If status is not provided, keep the existing status
    // order.details.quantity = quantity || order.details.quantity; // If quantity is not provided, keep the existing quantity

    // Save the updated order
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating order status and quantity' });
  }
};