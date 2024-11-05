const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Import mongoose for ObjectId validation
const BlogPost = require('../models/BlogPost'); // Assuming you have a BlogPost model

// Fetch all blog posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await BlogPost.find();
        if (!posts.length) {
            return res.status(404).json({ message: 'No posts found' });
        }
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch a single blog post by ID with ObjectId validation
router.get('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the id is a valid ObjectId before querying
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid post ID format' });
        }

        const post = await BlogPost.findById(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new blog post
router.post('/posts', async (req, res) => {
    const { title, content } = req.body;

    // Simple validation
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const newPost = new BlogPost({ title, content, date: new Date() });
        await newPost.save();
        res.status(201).json(newPost); // 201 status for successful resource creation
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
