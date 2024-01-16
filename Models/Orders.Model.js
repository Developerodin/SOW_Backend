import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  details: {
    category: {
      type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    },
    sub_category:{
        type: String,
        required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['not assigned', 'assigned', 'in progress', 'completed'],
    default: 'not assigned',
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
