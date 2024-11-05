// controllers/blogController.js
const BlogPost = require('../models/BlogPost');

// Get all blog posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
};

// Create a new blog post
const createPost = async (req, res) => {
    const { title, content } = req.body;

    const newPost = new BlogPost({ title, content });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost); // Respond with the created post
    } catch (error) {
        res.status(400).json({ message: 'Error creating post' });
    }
};

module.exports = {
    getAllPosts,
    createPost,
};
