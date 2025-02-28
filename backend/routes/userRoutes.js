const express = require('express');
const jwt = require('jsonwebtoken');
const user = require('../model/user'); // Your user model
const Cuser=require('../model/currentUser');

const router = express.Router();

//signup
router.post('/post',async(req,res)=>{
    try {
        const data = req.body;
        await user(data).save();
        res.status(200).json({message:"Register successfully"})

    } catch (error) {
        console.log(error);
        res.status(400).json({message:"unable to register"})

    }

})

router.post('/login', async (req, res) => {
    let u = req.body.username;
    let p = req.body.password;
    console.log(u);
    console.log(p);

    try {
        const person = await user.findOne({ username: u });
        
        if (!person) {
            return res.json({ message: "User not found" });
        }

        if (person.password === p) {
            // Assuming person contains the data to be copied into cuser
            const newCuser = new Cuser({
                username: person.username,
                password: person.password,
                email: person.email, // Add more fields as necessary
                // You can add other fields from person as needed
            });

            // Save the new cuser document to the database
            await newCuser.save();

            return res.status(200).json({ message: "Successfully logged in", person });
            
        } else {
            return res.json({ message: "Login failed" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
});

// GET route to fetch all details from the Cuser collection
router.get('/current-users', async (req, res) => {
    try {
        // Fetch all documents from the Cuser collection
        const currentUsers = await Cuser.find({});

        // Respond with the fetched data
        res.status(200).json({ message: "Current users fetched successfully", currentUsers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router; 
