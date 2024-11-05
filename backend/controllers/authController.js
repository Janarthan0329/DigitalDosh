// const User = require('../models/User');

// // Register new user (sign-up)
// const registerUser = async (req, res) => {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//         return res.status(400).json({ message: 'Please provide all required fields (name, email, password)' });
//     }

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({
//             message: 'User registered successfully',
//             user: { id: newUser._id, name, email }
//         });
//     } catch (error) {
//         console.error('Error during user registration:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // Login user
// const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Please provide all required fields (email, password)' });
//     }

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'User does not exist' });
//         }

//         res.status(200).json({
//             success: true,
//             user: { id: user._id, name: user.name, email: user.email }
//         });
//     } catch (error) {
//         console.error('Error during user login:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // Update User Profile
// const updateProfile = async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const updates = req.body;
        

//         if (!userId) {
//             return res.status(400).json({ message: 'User ID is required.' });
//         }

//         if (req.file) {
//             updates.avatar = req.file.path; 
//         }

//         const user = await User.findByIdAndUpdate(userId, updates, { new: true });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json({
//             message: 'Profile updated successfully',
//             user
//         });
//     } catch (error) {
//         console.error('Error updating profile:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// module.exports = {
//     registerUser,
//     loginUser,
//     updateProfile
// };


const User = require('../models/User');

// Register new user (sign-up)
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields (name, email, password)' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ name, email, password }); // Store plain text password
        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: { id: newUser._id, name, email }
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields (email, password)' });
    }

    try {
        const user = await User.findOne({ email, password }); // Directly check plain text password
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({
            success: true,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update User Profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updates = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        if (req.file) {
            updates.avatar = req.file.path; 
        }

        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            user
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateProfile
};
