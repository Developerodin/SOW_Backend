import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  images: [{
    filename: String, // Store the filename of the image
    path: String,     // Store the path to the image in the media folder
}],
  status:{
    type:Boolean,
    default:true
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
