// src/pages/BlogPost.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BlogPost.css"; // Optional styling for full blog post page

const BlogPost = () => {
  const { id } = useParams(); // Get the blog post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blog/posts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data); // Store the full post data
        } else {
          console.error("Failed to fetch the post");
        }
      } catch (error) {
        console.error("Error fetching the post:", error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Loading post...</p>; // Display a loading message while fetching data
  }

  if (!post) {
    return <p>Post not found.</p>; // Display if no post is found
  }

  return (
    <div className="blog-post-detail">
      <h1>{post.title}</h1>
      <p className="blog-date">Posted on {new Date(post.date).toLocaleDateString()}</p>
      <div className="blog-content">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default BlogPost;
