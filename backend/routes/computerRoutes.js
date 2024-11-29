const express = require('express');
const router = express.Router();
const ComputerModel = require('../model/computer');  // Import the ComputerModel

// Route to get all computers
router.get('/', async (req, res) => {
  try {
    const computers = await ComputerModel.find();  // Fetch all computers from the database
    res.status(200).json(computers);  // Send the list of computers as the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch computers' });
  }
});

// Route to add a new computer
router.post('/add', async (req, res) => {
  const { computerId, timeSlot1, status } = req.body;

  try {
    // Create a new computer entry
    const newComputer = new ComputerModel({
      computerId,
      timeSlots: [timeSlot1],  // Ensure it's passed as an array
      status,
    });

    // Save the new computer to the database
    await newComputer.save();

    res.status(201).json({ message: 'Computer added successfully!' });
  } catch (error) {
    console.error('Error in /add route:', error);
    res.status(500).json({ message: 'Failed to add computer' });
  }
});

// Route to get a specific computer by its ID (fixing the route)
router.get('/computer/:id', async (req, res) => {
  const { id } = req.params;  // Get the computer ID from the URL
  try {
    // Find the computer by ID in the database
    const computer = await ComputerModel.findById(id); // Use the correct model name here
    if (!computer) {
      return res.status(404).json({ message: 'Computer not found' });  // Return 404 if not found
    }
    res.status(200).json(computer);  // Return the found computer
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });  // Handle any server error
  }
});



module.exports = router;
