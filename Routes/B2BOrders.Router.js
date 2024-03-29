import express from 'express';
import { createB2BOrder, deleteB2BOrder, getB2BOrderById, getB2BOrders, getOrdersByFromUserId, getOrdersByToUserId, updateB2BOrder, updateOrderStatusAndQuantity } from '../Controllers/B2BOrders.Controller.js';


const B2BorderRouter = express.Router();

// Create a new B2B order
B2BorderRouter.post('/', createB2BOrder);

// Get all B2B orders
B2BorderRouter.get('/', getB2BOrders);

// Get B2B order by ID
B2BorderRouter.get('/:id', getB2BOrderById);

// Update B2B order
B2BorderRouter.put('/:id', updateB2BOrder);

// Delete B2B order
B2BorderRouter.delete('/:id', deleteB2BOrder);

B2BorderRouter.get("/from/:userId",getOrdersByFromUserId)
B2BorderRouter.get("/to/:userId",getOrdersByToUserId)
B2BorderRouter.put('/orders/:orderId', updateOrderStatusAndQuantity);
export default B2BorderRouter;
