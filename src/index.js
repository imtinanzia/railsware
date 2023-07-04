const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const emailRoutes = require('./routes/email.js');

dotenv.config();
// Create port variable from .env file
const port = process.env.PORT || 8888;

const app = express();

// Middleware to parse JSON request bodies
//  * MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register user routes
app.use('/api', emailRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
