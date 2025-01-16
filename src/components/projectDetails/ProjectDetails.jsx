import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./ProjectDetails.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state?.project;

  if (!project) {
    return <p>Project not found.</p>;
  }

  const handleInvestClick = () => {
    navigate("/payment", { state: { project } });
  };

  return (
    <div className="project-details">
      <div className="details-header">
        <img
          src={project.image}
          alt={project.name}
          className="project-image"
        />
        <div className="header-info">
          <h1 className="project-title">{project.name}</h1>
          <p className="category">
            <i className={project.icon}></i> {project.category}
          </p>
        </div>
      </div>

      <div className="details-content">
        <div className="description-container">
          <h2>Description</h2>
          <p className="description">{project.description}</p>
        </div>

        <h3>Project Overview</h3>
        <div className="project-details-list">
          <div className="stat-item">
            <span className="stat-label">Target Amount:</span>
            <span className="stat-value">£{project.target}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Raised Amount:</span>
            <span className="stat-value">£{project.raised}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Investors:</span>
            <span className="stat-value">{project.investors}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Days Left:</span>
            <span className="stat-value">{project.daysLeft}</span>
          </div>
          <div className="stat-item stat-item-min-investment">
            <span className="stat-label">Minimum Investment:</span>
            <span className="stat-value">£{project.minInvestment}</span>
          </div>
        </div>

        <div className="progress-container">
          <h3>Funding Progress</h3>
          <div className="progress-bar" title={`${project.progress}% funded`}>
            <div
              className="progress-fill"
              style={{ width: `${project.progress}%` }}
            >
              <span className="progress-percentage">{project.progress}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="actions">
        <button className="invest-button" onClick={handleInvestClick}>
          Invest Now
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
