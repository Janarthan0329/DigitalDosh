
// backend/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

// Routes
app.use('/api/blog', blogRoutes);      
app.use('/api/payment', paymentRoutes); 
app.use('/api/auth', authRoutes);  

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
