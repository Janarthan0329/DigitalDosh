// src/pages/Blog/WriteBlog.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WriteBlog.css"; // Optional styling

const WriteBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = { title, content };

        try {
            const response = await fetch("http://localhost:5000/api/blog/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost),
            });

            if (response.ok) {
                // Optionally, reset the form or handle navigation
                setTitle(""); // Clear title field
                setContent(""); // Clear content field
                navigate("/blog"); // Redirect to the blog page
            } else {
                console.error("Failed to create post");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="write-blog">
            <h1>Write a New Blog Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        required 
                    ></textarea>
                </div>
                <button type="submit">Publish Post</button>
            </form>
        </div>
    );
};

export default WriteBlog;
