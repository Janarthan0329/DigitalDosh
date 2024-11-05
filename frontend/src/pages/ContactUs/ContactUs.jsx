import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactUs.css';

export const ContactUs = () => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_61pouob', 
        'template_cu7wxye', 
        form.current, 
        'BbmWzNfsVTZNyc4Th'
      )
      .then(
        () => {
          setStatusMessage('Message sent successfully!');
          setIsError(false);
          form.current.reset();
        },
        (error) => {
          setStatusMessage('Failed to send message. Please try again later.');
          setIsError(true);
          console.error('Email error:', error);
        }
      );
  };

  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text1" name="name" required placeholder="Your Name" />
        
        <label>Email</label>
        <input type="email" name="email" required placeholder="Your Email" />

        <label>Phone Number</label>
        <input type='phone' name='phone' required placeholder='Your Phone number'/>

        <label>Message</label>
        <textarea name="message" required placeholder="Your Message" />
        
        <input type="submit" value="Send" />
      </form>

      {statusMessage && (
        <p className={isError ? 'error-message' : 'success-message'}>
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default ContactUs;
