import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <h2>About DigitalDosh</h2>
      <p>
        Welcome to DigitalDosh! Our platform is designed to empower individuals with the financial insights and tools they need to make informed decisions. Whether you're new to personal finance or a seasoned investor, DigitalDosh provides resources to help you grow.
      </p>
      <h3>Our Mission</h3>
      <p>
        At DigitalDosh, our mission is to make financial knowledge accessible and actionable for everyone. We strive to provide reliable, easy-to-use tools for tracking currency, monitoring crypto trends, and more.
      </p>

      <h3>Meet Our Team</h3>
      <div className="team">
        <div className="team-member">
          <img src="/src/assets/team-member1.jpg" alt="Team Member 1" />
          <h4>Jane Doe</h4>
          <p>Founder & CEO</p>
        </div>
        <div className="team-member">
          <img src="/src/assets/team-member2.jpg" alt="Team Member 2" />
          <h4>John Smith</h4>
          <p>CTO</p>
        </div>
        {/* Add more team members as needed */}
      </div>
    </div>
  );
};

export default AboutUs;
