import "./Navbar.css";
import logo from "../../assets/logo.png";
import arrow_icon from "../../assets/arrow_icon.png";
import { useContext, useState } from "react";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/default-avatar.png";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isFeaturesExpanded, setIsFeaturesExpanded] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      case "inr":
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      case "lkr":
        setCurrency({ name: "lkr", symbol: "රු" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
        break;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleProfileClick = () => {
    window.location.href = "/profile-management";
  };

  const toggleFeatures = () => {
    setIsFeaturesExpanded(!isFeaturesExpanded);
  };

  const toggleLightMode = () => {
    setIsLightMode(!isLightMode);
    document.body.classList.toggle("light-mode", !isLightMode); // Toggle body class for light mode
  };

  return (
    <div className={`navbar ${isLightMode ? "light" : ""}`}>
      <Link to={"/"}>
        <img src={logo} alt="" className="logo" />
      </Link>
      <ul>
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <li onClick={toggleFeatures} className="features">
          <span className="arrow-icon">{isFeaturesExpanded ? "▲" : "▼"}</span>
          _Features
        </li>
        {isFeaturesExpanded && (
          <ol className="feature-list">
            <Link to={"/currency-converter"}>
              <li>Currency Converter</li>
            </Link>
            <Link to={"/chatbot-container"}>
              <li>ChatBot</li>
            </Link>
            <li onClick={toggleLightMode}>Light Mode</li> {/* Toggle Light Mode */}
            <Link to={"/crypto-news"}>
              <li>News Feed</li>
            </Link>
            <Link to={"/contact-us"}>
              <li>Contact Us</li>
            </Link>
            <Link to={"/about-us"}>
              <li>About Us</li>
            </Link>
          </ol>
        )}
        <Link to={"/Pricing"}>
          <li>Pricing</li>
        </Link>
        <Link to={"/blog"}>
          <li>Blog</li>
        </Link>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
          <option value="lkr">LKR</option>
        </select>
        {user ? (
          <div className="user-profile">
            <img
              src={user.defaultAvatar}
              alt="Profile"
              className="profile-avatar"
              onClick={handleProfileClick}
            />
            <span>{user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button>
            <Link to="/signup">
              Sign up <img src={arrow_icon} alt="" />
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
