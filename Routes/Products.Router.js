import express from 'express';
import {
    createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from '../Controllers/Products.Controller.js';
import multer from 'multer';
const productRouter = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'media/'); // Set the destination folder for image storage
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename for the stored image
  },
});
const upload = multer({ storage: storage });
// Create a new product
productRouter.post('/',upload.array('images', 1), createProduct);

// Get all products
productRouter.get('/', getProducts);

// Update a product
productRouter.put('/:id', updateProduct);

// Delete a product
productRouter.delete('/:id', deleteProduct);

export default productRouter;
