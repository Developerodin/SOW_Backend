import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  sub_category:[
    {
      name: String, // Store the filename of the image
      price: String,
      unit:String     // Store the path to the image in the media folder
  }
  ],
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;