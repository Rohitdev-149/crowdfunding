import { useState } from "react";
import { useProjects } from "../../context/ProjectContext";
import Tooltip from "../common/Tooltip";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [visibleItems, setVisibleItems] = useState(9);
  const { projects } = useProjects();
  const navigate = useNavigate();

  // Updated investments data with more specific images
  const investments = [
    {
      id: 1,
      name: "Tech Startup X",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
      category: "Software",
      raised: "2.5M",
      target: "5M",
      progress: 50,
      minInvestment: "100",
      daysLeft: 15,
    },
    {
      id: 2,
      name: "Green Energy Solutions",
      image:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800",
      category: "Clean Energy",
      raised: "1.8M",
      target: "3M",
      progress: 60,
      minInvestment: "150",
      daysLeft: 22,
    },
    {
      id: 3,
      name: "Health Tech Innovation",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
      category: "Healthcare",
      raised: "750K",
      target: "2M",
      progress: 37.5,
      daysLeft: 30,
      minInvestment: "200",
    },
    {
      id: 4,
      name: "AI Research Lab",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
      category: "Artificial Intelligence",
      raised: "3.2M",
      target: "4M",
      progress: 80,
      minInvestment: "250",
      daysLeft: 10,
    },
    {
      id: 5,
      name: "Sustainable Fashion",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
      category: "Fashion",
      raised: "900K",
      target: "1.5M",
      progress: 60,
      minInvestment: "100",
      daysLeft: 25,
    },
    {
      id: 6,
      name: "Smart Home Tech",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800",
      category: "IoT",
      raised: "1.2M",
      target: "2M",
      progress: 60,
      minInvestment: "175",
      daysLeft: 18,
    },
    {
      id: 7,
      name: "Urban Farming Tech",
      image:
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800",
      category: "Agriculture",
      raised: "450K",
      target: "1M",
      progress: 45,
      minInvestment: "125",
      daysLeft: 28,
    },
    {
      id: 8,
      name: "EdTech Platform",
      image:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800",
      category: "Education",
      raised: "2.1M",
      target: "3M",
      progress: 70,
      minInvestment: "200",
      daysLeft: 12,
    },
    {
      id: 9,
      name: "Blockchain Solutions",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
      category: "Crypto",
      raised: "1.5M",
      target: "2.5M",
      progress: 60,
      minInvestment: "300",
      daysLeft: 20,
    },
    {
      id: 10,
      name: "Space Technology",
      image:
        "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
      category: "Aerospace",
      raised: "5M",
      target: "10M",
      progress: 50,
      minInvestment: "500",
      daysLeft: 45,
    },
    {
      id: 11,
      name: "Renewable Materials",
      image:
        "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800",
      category: "Materials",
      raised: "800K",
      target: "1.5M",
      progress: 53,
      minInvestment: "150",
      daysLeft: 33,
    },
    {
      id: 12,
      name: "Virtual Reality Games",
      image:
        "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800",
      category: "Gaming",
      raised: "3.3M",
      target: "5M",
      progress: 66,
      minInvestment: "250",
      daysLeft: 17,
    },
  ];

  // Combine default investments with user-created projects
  const allProjects = [...projects, ...investments];

  const loadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 6, allProjects.length));
  };

  const scrollToMore = () => {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: "smooth",
    });
  };

  // Calculate remaining items
  const remainingItems = allProjects.length - visibleItems;

  // Add styles for the image cards
  const cardStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "transform 0.3s ease-in-out",
  };

  const handleInvestClick = (investment) => {
    navigate('/payment', { 
      state: { project: investment }
    });
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <Tooltip text="Discover amazing investment opportunities">
            <h1>Invest in the Future</h1>
          </Tooltip>
          <p>Discover and support innovative startups</p>
          <Tooltip text="Begin your investment journey">
            <button className="cta-button">Start Investing</button>
          </Tooltip>
        </div>
      </section>

      <section className="investment-section">
        <div className="investment-header">
          <Tooltip text="Browse our top performing opportunities">
            <h2>Trending Opportunities</h2>
          </Tooltip>
          <div className="filter-sort">
            <Tooltip text="Sort projects by different criteria">
              <select className="sort-select">
                <option value="trending">Trending</option>
                <option value="newest">Newest</option>
                <option value="raised">Most Raised</option>
              </select>
            </Tooltip>
          </div>
        </div>

        <div className="investment-grid">
          {allProjects.slice(0, visibleItems).map((investment) => (
            <div key={investment.id} className="investment-card">
              <div className="card-header">
                <div className="company-logo">
                  <img src={investment.image} alt={investment.name} />
                </div>
                <div className="company-info">
                  <h3>{investment.name}</h3>
                  <p className="company-description">
                    {investment.description ||
                      "Revolutionizing the industry with innovative solutions"}
                  </p>
                </div>
              </div>

              <div className="investment-details">
                <div className="funding-progress">
                  <div className="progress-stats">
                    <div className="progress-percentage">
                      {investment.progress}%
                    </div>
                    <div className="target-amount">£{investment.target}</div>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${investment.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="investment-meta">
                  <div className="meta-item">
                    <span className="meta-label">Valuation</span>
                    <span className="meta-value">
                      £{investment.valuation || "3M"}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Target</span>
                    <span className="meta-value">£{investment.target}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Investors</span>
                    <span className="meta-value">
                      {investment.investors || "127"}
                    </span>
                  </div>
                </div>

                <div className="card-actions">
                  <button 
                    className="invest-button"
                    onClick={() => handleInvestClick(investment)}
                  >
                    <i className="fas fa-hand-holding-usd"></i>
                    Invest Now
                  </button>
                  <button 
                    className="view-more-button"
                    onClick={() => window.alert(`View details of ${investment.name}`)}
                  >
                    <i className="fas fa-info-circle"></i>
                    View Details
                  </button>
                </div>

                <div className="investment-tags">
                  <span className="tag eis-tag">EIS</span>
                  <span className="tag country-tag">
                    <img src="/uk-flag.png" alt="UK" className="country-flag" />
                    UK
                  </span>
                </div>

                <div className="time-remaining">
                  <span className="days-left">
                    {investment.daysLeft} days left
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {remainingItems > 0 && (
          <Tooltip text={`Show ${remainingItems} more projects`}>
            <div className="scroll-indicator">
              <button onClick={loadMore} className="scroll-button">
                <i className="fas fa-chevron-down"></i>
              </button>
            </div>
          </Tooltip>
        )}
      </section>

      <section className="about-section">
        <div className="about-content">
          <h2>Why Invest With Us</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <i className="fas fa-chart-line"></i>
              <h3>High Growth Potential</h3>
              <p>Access carefully vetted investment opportunities</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-shield-alt"></i>
              <h3>Secure Platform</h3>
              <p>Your investments are protected and regulated</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-hand-holding-usd"></i>
              <h3>Low Minimum Investment</h3>
              <p>Start investing with as little as $100</p>
            </div>
          </div>
        </div>
      </section>

      <section className="video-section">
        <div className="video-container">
          <video autoPlay muted loop playsInline className="background-video">
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-business-team-meeting-in-an-office-4819-large.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="video-content">
            <h2>Join Our Investment Community</h2>
            <p>Be part of the next big innovation</p>
            <button className="video-cta">Learn More</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
