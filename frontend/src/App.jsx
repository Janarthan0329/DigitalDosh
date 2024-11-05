import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Home from './pages/Home/Home';
import Coin from './pages/Coin/Coin';
import Blog from './pages/Blog/Blog';
import BlogPost from './pages/Blog/BlogPost'; 
import WriteBlog from './pages/Blog/WriteBlog';
import Footer from './components/Footer/Footer';
import Pricing from './pages/Pricing/Pricing';
import Payment from './pages/Payment/Payment';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import ProfileManagement from './pages/ProfileManagement/ProfileManagement';
import ProfileEdit from './pages/ProfileEdit/ProfileEdit';
import CurrencyConverter from "./pages/CurrencyConverter/CurrencyConverter";
import ContactUs from "./pages/ContactUs/ContactUs";
import AboutUs from "./pages/AboutUs/AboutUs";
import CryptoNews from './pages/CryptoNews/CryptoNews';
import ChatBot from './pages/ChatBot/ChatBot';

// Load your public Stripe API key
const stripePromise = loadStripe('your-publishable-key-from-stripe'); 

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/coin/:coinId' element={<Coin />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/write" element={<WriteBlog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile-management" element={<ProfileManagement />} />
          <Route path="/edit-profile" element={<ProfileEdit />} />
          <Route path="/currency-converter" element={<CurrencyConverter />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/crypto-news" element={<CryptoNews />} />
          <Route path='/chatbot-container' element={<ChatBot />} />
        </Routes>
      </Elements>
      <Footer/>
    </div>
  );
}

export default App;
