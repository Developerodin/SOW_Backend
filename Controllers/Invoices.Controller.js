import Invoice from "../Models/Invoices.Model.js";

// Create a new invoice
export const createInvoice = async (req, res) => {
  try {
    const { address, contactNumber, customerName, email, gstNumber, pricePerUnit, productDescription, productName, quantity, totalAmount } = req.body;
    const newInvoice = new Invoice({ address, contactNumber, customerName, email, gstNumber, pricePerUnit, productDescription, productName, quantity , totalAmount });
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(500).json({ error: 'Error creating invoice' });
  }
};

// Get all invoices
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching invoices' });
  }
};

// Update an invoice
export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, contactNumber, customerName, email, gstNumber, pricePerUnit, productDescription, productName, quantity } = req.body;
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, { address, contactNumber, customerName, email, gstNumber, pricePerUnit, productDescription, productName, quantity }, { new: true });
    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ error: 'Error updating invoice' });
  }
};

// Delete an invoice
export const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInvoice = await Invoice.findByIdAndDelete(id);
    res.status(200).json(deletedInvoice);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting invoice' });
  }
};
