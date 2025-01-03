import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import ProjectSection from "../common/ProjectSection";
import ProjectCard from "../common/ProjectCard";
import "./Categories.css";

const Categories = () => {
  const { category } = useParams();
  const { getProjectsByCategory } = useProjects();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Get projects for this category
  const categoryProjects = getProjectsByCategory(category);

  // Filter projects by search query
  const filteredProjects = categoryProjects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get trending projects in this category
  const trendingProjects = [...filteredProjects]
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 3);

  // Get newest projects in this category
  const newestProjects = [...filteredProjects]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className="categories-page">
      <div className="category-header">
        <h1>{category} Projects</h1>
        <p>Discover and invest in {category.toLowerCase()} opportunities</p>

        <div className="category-search">
          <div className="search-box">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder={`Search ${category} projects...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="clear-search"
                onClick={() => setSearchQuery("")}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
          <div className="search-results">
            {searchQuery && (
              <span className="results-count">
                Found {filteredProjects.length} projects
              </span>
            )}
          </div>
        </div>
      </div>

      <ProjectSection
        title="Trending in This Category"
        description={`Top performing ${category.toLowerCase()} projects`}
        projects={trendingProjects}
        initialCount={3}
      />

      <ProjectSection
        title="Newest Additions"
        description={`Recently added ${category.toLowerCase()} projects`}
        projects={newestProjects}
        initialCount={3}
      />

      <div className="all-projects-section">
        <h2>All {category} Projects</h2>
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {filteredProjects.length === 0 && (
        <div className="no-results">
          <i className="fas fa-search"></i>
          <h3>No projects found</h3>
          <p>Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};

export default Categories;
