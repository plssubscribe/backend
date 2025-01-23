// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models/index');
const path = require("path");

// Initialize the Express app
const app = express();

sequelize.sync({ alter: true });

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Express.js backend!');
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/coin", require("./routes/Coin"));
app.use("/api/user", require("./routes/User"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
