const express = require('express');
const cors = require('cors');
const router = express.Router();
const ComputerModel = require('../model/computer');  // Import the ComputerModel

// Enable CORS middleware globally
router.use(cors());

// Route to get all computers (this includes both available and unavailable systems)
router.get('/', async (req, res) => {
  try {
    const computers = await ComputerModel.find();  // Fetch all computers from the database
    res.status(200).json(computers);  // Send the list of computers as the response
  } catch (error) {
    console.error('Error fetching computers:', error);
    res.status(500).json({ message: 'Failed to fetch computers' });
  }
});

// Route to get available computers
router.get('/available', async (req, res) => {
  try {
    const availableComputers = await ComputerModel.find({ status: 'Active' });
    if (availableComputers.length === 0) {
      return res.status(404).json({ message: 'No available systems at the moment' });
    }
    res.status(200).json(availableComputers); // Send available systems as JSON
  } catch (error) {
    console.error('Error fetching available systems:', error);
    res.status(500).json({ message: 'Failed to fetch available systems' });
  }
});

// Route to add a new computer
router.post('/add', async (req, res) => {
  const { computerId, lab, status } = req.body;

  if (!computerId || !lab || !status) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Create a new computer entry
    const newComputer = new ComputerModel({
      computerId,
      lab,  // Store the lab directly
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

// Route to get a specific computer by its ID
router.get('/computer/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const computer = await ComputerModel.findById(id);
    if (!computer) {
      return res.status(404).json({ message: 'Computer not found' });
    }
    res.status(200).json(computer);
  } catch (err) {
    console.error('Error fetching computer:', err);
    res.status(500).json({ message: 'Server error while fetching computer' });
  }
});

// Route to update a specific computer by its ID
router.put('/computeredit/:id', async (req, res) => {
  const { id } = req.params;
  const { computerId, lab, status } = req.body;

  try {
    // Update the computer by its ID
    const updatedComputer = await ComputerModel.findByIdAndUpdate(id, {
      computerId,
      lab,  // Update the lab directly
      status,
    }, { new: true });  // The 'new' option ensures we return the updated computer

    if (!updatedComputer) {
      return res.status(404).json({ message: 'Computer not found' });
    }

    res.status(200).json(updatedComputer);  // Return the updated computer
  } catch (error) {
    console.error('Error updating computer:', error);
    res.status(500).json({ message: 'Failed to update computer' });
  }
});

// Route to delete a specific computer by its ID
router.delete('/computerdlt/:id', async (req, res) => {
  const { id } = req.params;  // Get the computer ID from the URL

  try {
    // Delete the computer by ID
    const deletedComputer = await ComputerModel.findByIdAndDelete(id);

    if (!deletedComputer) {
      return res.status(404).json({ message: 'Computer not found' });  // Return 404 if the computer does not exist
    }

    res.status(200).json({ message: 'Computer deleted successfully!' });  // Successfully deleted the computer
  } catch (error) {
    console.error('Error deleting computer:', error);
    res.status(500).json({ message: 'Failed to delete computer' });  // Handle any server error
  }
});

module.exports = router;


