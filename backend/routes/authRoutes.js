// backend/routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, updateProfile } = require('../controllers/authController'); 
// const upload = require('../middleware/upload');

const multer = require('multer');
const upload = multer();

const router = express.Router();

// Sign-up route
router.post('/signup', registerUser);

// Login route
router.post('/login', loginUser);

// Update user profile route
router.put('/profile/:userId',upload.none(),  updateProfile); 


module.exports = router;
