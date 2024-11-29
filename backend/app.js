const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// DB connection
require('./DB/Connection');

// Routes
const userRoute = require("./routes/userRoutes");
const computerRoute = require("./routes/computerRoutes");  // Import the new computer route

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', userRoute); // User route path
app.use('/api/computer', computerRoute); // Computer route path

// Server listening
app.listen(3008, () => {
  console.log('Listening to port 3008');
});
