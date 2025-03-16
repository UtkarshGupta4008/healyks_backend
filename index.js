require("dotenv").config();
const express = require("express");
//Type: Middleware for handling Cross-Origin Resource Sharing.
//Purpose: Allows frontend applications hosted on a different domain to access the backend.
const cors = require("cors");
const connectDB = require("./src/config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect Database
connectDB();

// Routes
app.use("/api/user", require("./src/routes/userRoutes"));
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/symptoms", require("./src/routes/symptomRoutes"));
app.use("/api/dashboard", require("./src/routes/dashboardRoutes"));

app.get('/', (req, res) => {
    res.send('Healyks API is running');
  });
  
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
