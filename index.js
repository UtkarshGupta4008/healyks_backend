require("dotenv").config();
const express = require("express");
//Type: Middleware for handling Cross-Origin Resource Sharing.
//Purpose: Allows frontend applications hosted on a different domain to access the backend.
const cors = require("cors");
const connectDB = require("./src/config/db");

const index = express();

// Middleware
index.use(express.json());
index.use(cors());

// Connect Database
connectDB();

// Routes
index.use("/api/user", require("./src/routes/userRoutes"));
index.use("/api/auth", require("./src/routes/authRoutes"));
index.use("/api/symptoms", require("./src/routes/symptomRoutes"));
index.use("/api/dashboard", require("./src/routes/dashboardRoutes"));

index.get('/', (req, res) => {
    res.send('Healyks API is running');
  });
  
index.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });
  index.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  });
const PORT = process.env.PORT || 5000;
index.listen(PORT, () => console.log(`Server running on port ${PORT}`));
