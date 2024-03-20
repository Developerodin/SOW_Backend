import express from 'express';
import { createInvoice, getInvoices, updateInvoice, deleteInvoice } from '../Controllers/Invoices.Controller.js';

const router = express.Router();


router.post('/', createInvoice);


router.get('/', getInvoices);

// Update an invoice
router.put('/:id', updateInvoice);

// Delete an invoice
router.delete('/:id', deleteInvoice);

export default router;
