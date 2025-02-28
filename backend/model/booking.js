const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,  // Ensure email is required in the schema
  },  
  computerId: {
    type: String,
    required: true, // Ensure that the computerId is provided
    unique: true,   // Ensure that each computer has a unique ID
  },

  timeSlot: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],  // Only these values are allowed
    default: 'pending',  // Default value is 'pending'
  }
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;

