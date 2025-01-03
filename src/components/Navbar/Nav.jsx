import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const categories = [
    "Medical",
    "Emergency",
    "Business",
    "Animal",
    "Education",
    "Community",
    "Sports",
    "Creative",
  ];

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          CrowdFund
        </Link>
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search fundraisers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>

      <div className="nav-menu">
        <Link
          to="/"
          className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>
        <div
          className="nav-dropdown"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button
            className={`nav-item dropdown-trigger ${
              selectedCategory ? "active" : ""
            }`}
          >
            {selectedCategory || "Categories"}{" "}
            <i className="fas fa-chevron-down"></i>
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase()}`}
                  className={`dropdown-item ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link
          to="/about"
          className={`nav-item ${
            location.pathname === "/about" ? "active" : ""
          }`}
        >
          About
        </Link>
        <Link
          to="/how-it-works"
          className={`nav-item ${
            location.pathname === "/how-it-works" ? "active" : ""
          }`}
        >
          How it Works
        </Link>
        <Link to="/create-project" className="nav-item create-project-btn">
          <i className="fas fa-plus"></i> Create Project
        </Link>
        <Link
          to="/signin"
          className={`nav-item sign-in ${
            location.pathname === "/signin" ? "active" : ""
          }`}
        >
          Sign In
        </Link>
        <Link
          to="/signout"
          className={`nav-item ${
            location.pathname === "/signout" ? "active" : ""
          }`}
        >
          Sign Out
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
