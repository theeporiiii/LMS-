const mongoose = require('mongoose');

// Define the Computer Schema
const computerSchema = mongoose.Schema({
  computerId: {
    type: String,
    required: true, // Ensure that the computerId is provided
    unique: true,   // Ensure that each computer has a unique ID
  },
  lab: {
    type: String,  // Lab is now a string (can represent the lab name or number)
    required: true, // Ensure lab is provided
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'], // Status can only be 'Active' or 'Inactive'
    default: 'Active',           // Default value is 'Active'
  },
});

// Create the model from the schema
const ComputerModel = mongoose.model('Computers', computerSchema);

// Export the model
module.exports = ComputerModel;
