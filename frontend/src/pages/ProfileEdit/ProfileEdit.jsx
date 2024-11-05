// frontend/src/pages/ProfileEdit/ProfileEdit.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfileEdit.css';


const ProfileEdit = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // State for each editable field
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [joinDate, setJoinDate] = useState(""); 
    const [accountType, setAccountType] = useState("");
    const [subscription, setSubscription] = useState("");

    // Fetch user data from localStorage on mount
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setName(storedUser.name || "");
            setEmail(storedUser.email || "");
            setUsername(storedUser.username || "");
            setPhone(storedUser.phone || "");
            setAddress(storedUser.address || "");
            setCity(storedUser.city || "");
            setCountry(storedUser.country || "");
            setJoinDate(storedUser.joinDate || "");
            setAccountType(storedUser.accountType || "");
            setSubscription(storedUser.subscription || "");
            
        }
    }, []);

    if (!user) {
        return <div>No user data available.</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!user.id) {
            console.error("User data is missing. Cannot update profile.");
            alert("Unable to update profile. User data is missing.");
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("username", username);
            formData.append("phone", phone);
            formData.append("address", address);
            formData.append("city", city);
            formData.append("country", country);
            formData.append("joinDate", joinDate);
            formData.append("accountType", accountType);
            formData.append("subscription", subscription);


    
            // Make the API call to update the user profile without Authorization header
            const response = await axios.put(
                `http://localhost:5000/api/auth/profile/${user.id}`,
                formData
            );
    
            const updatedUser = response.data.user;
            console.log(updatedUser)
            
    
            // Update localStorage with the new user data
            localStorage.setItem("user", JSON.stringify(updatedUser));
    
            // Redirect to ProfileManagement page
            navigate("/profile-management");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred while updating the profile. Please try again.");
        }
    };
    

    return (
        <div className="profile-edit">
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="joinDate">Join Date:</label>
                    <input
                        type="date"
                        id="joinDate"
                        value={joinDate}
                        onChange={(e) => setJoinDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="accountType">Account Type:</label>
                    <input
                        type="text"
                        id="accountType"
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subscription">Subscription:</label>
                    <input
                        type="text"
                        id="subscription"
                        value={subscription}
                        onChange={(e) => setSubscription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="update-button">Update Profile</button>
            </form>
            <div className="action-buttons">
                <button onClick={() => navigate("/profile-management")} className="back-button">
                    Back to Profile
                </button>
            </div>
        </div>
    );
};

export default ProfileEdit;


