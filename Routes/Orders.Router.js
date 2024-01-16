import express from 'express';
import {
    getAllOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../Controllers/Orders.Controller.js'; // Adjust the path accordingly


const ordersRouter = express.Router();

// Routes
ordersRouter.get('/', getAllOrders);
ordersRouter.post('/', createOrder);
ordersRouter.get('/:id', getOrderById);
ordersRouter.put('/:id', updateOrder);
ordersRouter.delete('/:id', deleteOrder);

export default ordersRouter;