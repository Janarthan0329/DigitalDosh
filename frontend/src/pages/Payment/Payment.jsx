import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Payment.css'; 
import axios from 'axios'; 

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51QAAnL2N2PUCpEBm8ImWHKHfGpupAZEsWTLhF3lpZaqmUeDzMOF4U8wnQo8F3pFqohvS7Yjew077r50XSRADpJ7D00HgthfqJU');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();

  const { plan, price } = location.state || {}; 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Validate and format the price
  const formattedPrice = price ? parseFloat(price.replace('$', '')) * 100 : 0;

  if (!price || isNaN(formattedPrice)) {
    return <p className="error-message">Invalid price information. Please try again.</p>;
  }

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe has not loaded correctly. Please try again.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    setLoading(true);
    setError(null); // Reset any previous errors

    try {
      // Create payment intent on the backend
      const response = await axios.post('http://localhost:5000/api/payment/create-payment-intent', {
        amount: formattedPrice,
      });

      const { clientSecret } = response.data;

      // Confirm the card payment
      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (confirmError) {
        setError(confirmError.message);
        setLoading(false);
      } else {
        setSuccess(true);
        setLoading(false);
        alert('Payment successful!'); 
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Payment failed. Please try again.');
      setLoading(false);
      console.error(err); // Log the actual error for debugging
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h2>Payment for {plan}</h2>
        <p className="payment-price">Amount: {price}</p>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Payment Successful!</p>}
        <form onSubmit={handlePaymentSubmit}>
          <CardElement className="card-element" />
          <button type="submit" className="payment-btn" disabled={!stripe || loading}>
            {loading ? 'Processing...' : `Pay ${price}`}
          </button>
        </form>
      </div>
    </div>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
