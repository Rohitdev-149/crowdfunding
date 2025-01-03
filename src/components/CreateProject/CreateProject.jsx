import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import "./CreateProject.css";

const CreateProject = () => {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  const [projectData, setProjectData] = useState({
    name: "",
    category: "",
    description: "",
    target: "",
    minInvestment: "",
    duration: "",
    image: null,
    imagePreview: null,
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject({
      name: projectData.name,
      category: projectData.category,
      description: projectData.description,
      target: projectData.target,
      minInvestment: projectData.minInvestment,
      daysLeft: projectData.duration,
      image: projectData.imagePreview,
    });

    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="create-project">
      <div className="create-project-container">
        <h1>Create New Project</h1>
        <form onSubmit={handleSubmit} className="project-form">
          <div className="form-group">
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={projectData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter project name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={projectData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={projectData.description}
              onChange={handleInputChange}
              required
              placeholder="Describe your project"
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="target">Target Amount (£)</label>
              <input
                type="number"
                id="target"
                name="target"
                value={projectData.target}
                onChange={handleInputChange}
                required
                min="0"
                placeholder="Enter target amount"
              />
            </div>

            <div className="form-group">
              <label htmlFor="minInvestment">Minimum Investment (£)</label>
              <input
                type="number"
                id="minInvestment"
                name="minInvestment"
                value={projectData.minInvestment}
                onChange={handleInputChange}
                required
                min="0"
                placeholder="Enter minimum investment"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration (days)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={projectData.duration}
              onChange={handleInputChange}
              required
              min="1"
              max="365"
              placeholder="Enter campaign duration"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Project Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              required
              className="file-input"
            />
            {projectData.imagePreview && (
              <div className="image-preview">
                <img src={projectData.imagePreview} alt="Project preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Create Project
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
