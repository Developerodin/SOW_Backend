import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusinessUsers',
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusinessUsers',
    required: true,
  },
  details: {
    category: {
      type: String,
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
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  otp: {
    type: Number,
    required: true,
  },
});

const B2BOrder = mongoose.model('B2BOrders', orderSchema);

export default B2BOrder;
