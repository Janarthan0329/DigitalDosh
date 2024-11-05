import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Pricing.css'; 

const Pricing = () => {
  const navigate = useNavigate(); // Initialize navigation

  const handleChoosePlan = (plan, price) => {
    // Navigate to payment page and pass plan details as state
    navigate('/payment', { state: { plan, price } });
  };

  return (
    <div className="pricing-page">
      <h1>Pricing Plans</h1>

      <div className="pricing-container">
        {/* Basic Plan */}
        <div className="pricing-plan basic">
          <h2>Basic Plan</h2>
          <p className="price">$10 / month</p>
          <ul>
            <li>Access to basic features with limitation</li>
            <li>10 GB of storage</li>
            <li>Email support</li>
            <li>Offline Access</li>
          </ul>
          <button className="plan-btn" onClick={() => handleChoosePlan('Basic Plan', '$10 / month')}>
            Choose Basic
          </button>
        </div>

        {/* Pro Plan */}
        <div className="pricing-plan pro">
          <h2>Pro Plan</h2>
          <p className="price">$25 / month</p>
          <ul>
            <li>Access to all basic features</li>
            <li>50 GB of storage</li>
            <li>Priority email support</li>
            <li>Analytics and reporting tools</li>
          </ul>
          <button className="plan-btn" onClick={() => handleChoosePlan('Pro Plan', '$25 / month')}>
            Choose Pro
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="pricing-plan enterprise">
          <h2>Enterprise Plan</h2>
          <p className="price">$100 / month</p>
          <ul>
            <li>Unlimited access to all features</li>
            <li>Unlimited storage</li>
            <li>Dedicated support</li>
            <li>Custom integrations</li>
          </ul>
          <button className="plan-btn" onClick={() => handleChoosePlan('Enterprise Plan', '$100 / month')}>
            Choose Enterprise
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
