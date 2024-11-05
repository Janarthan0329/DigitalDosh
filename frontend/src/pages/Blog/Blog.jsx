// // src/pages/Blog.jsx

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Blog.css"; // Make sure the corresponding CSS file exists

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const navigate = useNavigate();

  // Fetching blog posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blog/posts");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts, using simulated data.");
          setPosts(simulatedPosts());
        }
      } catch (error) {
        console.error("Error:", error);
        setPosts(simulatedPosts());
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPosts();
  }, []);

  // Simulated blog posts
  const simulatedPosts = () => [
    { _id: 1, title: "The Rise of Cryptocurrencies", content: "Lorem ipsum dolor sit amet...", date: "2024-09-30" },
    { _id: 2, title: "How to Invest in Digital Assets", content: "Consectetur adipiscing elit...", date: "2024-09-29" },
    { _id: 3, title: "The Future of DeFi", content: "Sed do eiusmod tempor incididunt...", date: "2024-09-28" },
  ];

  if (loading) {
    return <p>Loading posts...</p>; // Display loading message
  }

  return (
    <div className="blog">
      <h1>Our Blog</h1>
      <p>Stay updated with the latest news and insights in the world of cryptocurrency.</p>
      <div className="button-container">
        <button onClick={() => navigate("/blog/write")} className="write-blog-button">
          Write a New Blog Post
        </button>
      </div>
      <div className="blog-posts">
        {posts.map((post) => (
          <Link to={`/blog/${post._id}`} key={post._id} className="blog-post">
            <h2>{post.title}</h2>
            <p>{post.content.substring(0, 100)}...</p>
            <p className="blog-date">Posted on {new Date(post.date).toLocaleDateString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
