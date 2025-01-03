import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state?.project;

  const [paymentDetails, setPaymentDetails] = useState({
    amount: project?.minInvestment || "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });

  if (!project) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <h2>No project selected</h2>
          <button 
            className="cancel-button"
            onClick={() => navigate('/')}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically process the payment
    alert('Payment processed successfully!');
    navigate('/');
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="project-summary">
          <img 
            src={project.image} 
            alt={project.name} 
            className="project-image"
          />
          <div className="project-info">
            <h2>{project.name}</h2>
            <div className="project-stats">
              <div className="stat">
                <span>Target Amount:</span>
                <span>£{project.target}</span>
              </div>
              <div className="stat">
                <span>Minimum Investment:</span>
                <span>£{project.minInvestment}</span>
              </div>
              <div className="stat">
                <span>Progress:</span>
                <span>{project.progress}%</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <h3>Investment Details</h3>
          <div className="form-group">
            <label htmlFor="amount">Investment Amount (£)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={paymentDetails.amount}
              onChange={handleInputChange}
              min={project.minInvestment}
              required
            />
            <span className="min-investment">
              Minimum investment: £{project.minInvestment}
            </span>
          </div>

          <h3>Payment Information</h3>
          <div className="form-group">
            <label htmlFor="name">Cardholder Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={paymentDetails.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handleInputChange}
              maxLength="16"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={paymentDetails.expiryDate}
                onChange={handleInputChange}
                maxLength="5"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleInputChange}
                maxLength="3"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Complete Investment
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment; 