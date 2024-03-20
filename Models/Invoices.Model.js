import mongoose from 'mongoose';

const { Schema } = mongoose;

const invoiceSchema = new Schema({
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  gstNumber: { type: String, required: true },
  pricePerUnit: { type: String, required: true },
  productDescription: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: String, required: true },
  totalAmount: { type: String, required: true },
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
