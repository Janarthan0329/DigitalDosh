import React, { useState, useEffect } from 'react';
import './CryptoNews.css';

const CryptoNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fallbackImage = 'path/to/your/fallback-image.jpg'; // Path to your fallback image

  useEffect(() => {
    const fetchCryptoNews = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/news');
        const data = await response.json();
        setNews(data.data || []); // Ensure news is set correctly
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch crypto news:", error);
        setLoading(false);
      }
    };

    fetchCryptoNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="crypto-news">
      <h2>Latest Crypto News</h2>
      <ul>
        {news.slice(0, 10).map((article, index) => (
          <li key={index} className="news-item">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.image && (
                <img 
                  src={article.image} 
                  alt={article.title} 
                  onError={(e) => { e.target.src = fallbackImage; }} // Set fallback image on error
                  style={{ width: '100%', height: 'auto' }} // Style for images
                />
              )}
              <div>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <span>{new Date(article.published_at).toLocaleDateString()}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoNews;
