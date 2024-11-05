const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: '/path/to/default-avatar.png', // Update with an accessible path or URL
    },
    phone: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    country: {
        type: String,
        default: "",
    },
    joinDate: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        default: "defaultUsername",
    },
    accountType: {
        type: String,
        default: "basic",
    },
    subscription: {
        type: String,
        default: "free",
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
