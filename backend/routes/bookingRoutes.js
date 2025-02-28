const express = require('express');
const router = express.Router();
const BookingModel = require('../model/booking'); // Import the BookingModel
const ComputerModel = require('../model/computer'); // Import the ComputerModel

// Route to create a new booking
router.post('/book', async (req, res) => {
  const { username, email, computerId, timeSlot } = req.body;  // Destructure email from the request body

  // Check if the required fields are provided
  if (!username || !email || !computerId || !timeSlot) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if the computerId is valid
    const computer = await ComputerModel.findOne({ computerId });
    if (!computer) {
      return res.status(404).json({ message: 'Computer not found' });
    }

    // Check if the selected timeSlot is available for the computer
    if (!computer.timeSlots.includes(timeSlot)) {
      return res.status(400).json({ message: 'Time slot not available for this computer' });
    }

    // Create a new booking entry with status defaulted to 'pending'
    const newBooking = new BookingModel({
      username,
      email,  // Include email in the booking data
      computerId,
      timeSlot,
      status: 'pending',  // Set default status as 'pending'
    });

    // Save the new booking to the database
    await newBooking.save();

    res.status(201).json({ message: 'Booking created successfully!', booking: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Failed to create booking' });
  }
});

// Get all bookings
router.get('/all', async (req, res) => {
  try {
    const bookings = await BookingModel.find()
      .populate('computerId', 'computerId timeSlots status')  // Populate computerId with relevant computer fields
      .exec();
    res.status(200).json(bookings); // Send back the bookings as JSON
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

// Accept a booking
router.put('/accept/:id', async (req, res) => {
  const bookingId = req.params.id;

  try {
    // Find the booking and update its status to 'accepted'
    const updatedBooking = await BookingModel.findByIdAndUpdate(
      bookingId,
      { status: 'accepted' },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking accepted', booking: updatedBooking });
  } catch (error) {
    console.error('Error accepting booking:', error);
    res.status(500).json({ message: 'Failed to accept booking' });
  }
});

// Decline a booking
router.put('/decline/:id', async (req, res) => {
  const bookingId = req.params.id;

  try {
    // Find the booking and update its status to 'declined'
    const updatedBooking = await BookingModel.findByIdAndUpdate(
      bookingId,
      { status: 'declined' },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking declined', booking: updatedBooking });
  } catch (error) {
    console.error('Error declining booking:', error);
    res.status(500).json({ message: 'Failed to decline booking' });
  }
});

module.exports = router;







