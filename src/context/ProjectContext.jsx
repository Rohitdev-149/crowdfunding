import { createContext, useContext, useState, useEffect } from "react";
import { categories } from "../config/categories";
import { defaultProjects } from "../data/defaultProjects";

const ProjectContext = createContext();

const STORAGE_KEY = "crowdfund_projects";

export const ProjectProvider = ({ children }) => {
  // Load projects from localStorage or use default projects if none exist
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem(STORAGE_KEY);
    return savedProjects ? JSON.parse(savedProjects) : defaultProjects;
  });

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const addProject = (project) => {
    // Format the project data
    const newProject = {
      ...project,
      id: `custom-${Date.now()}`,
      progress: 0,
      investors: 0,
      raised: "0",
      createdAt: new Date().toISOString(),
      // Ensure the category is properly set
      category: project.category,
      // Convert file object to URL if it exists
      image:
        project.image instanceof File
          ? URL.createObjectURL(project.image)
          : project.image,
    };

    setProjects((prevProjects) => {
      const updatedProjects = [newProject, ...prevProjects];
      return updatedProjects;
    });
  };

  const updateProjectProgress = (projectId, investmentAmount) => {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) => {
        if (project.id === projectId) {
          const currentRaised = parseFloat(
            project.raised.replace(/[^0-9.]/g, "")
          );
          const newRaised = currentRaised + parseFloat(investmentAmount);
          const targetAmount = parseFloat(
            project.target.replace(/[^0-9.]/g, "")
          );
          const newProgress = Math.min((newRaised / targetAmount) * 100, 100);

          return {
            ...project,
            raised: `${newRaised}`,
            progress: newProgress,
            investors: (project.investors || 0) + 1,
          };
        }
        return project;
      });

      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
      return updatedProjects;
    });
  };

  // Get projects by category
  const getProjectsByCategory = (categoryName) => {
    const categoryLower = categoryName.toLowerCase();
    return projects.filter((project) => {
      const projectCategory = project.category.toLowerCase();
      // Check if it matches main category or subcategory
      const category = categories.find(
        (cat) =>
          cat.name.toLowerCase() === categoryLower ||
          cat.subcategories.some((sub) => sub.toLowerCase() === categoryLower)
      );

      if (category) {
        return (
          projectCategory === categoryLower ||
          category.subcategories.some(
            (sub) => sub.toLowerCase() === projectCategory
          )
        );
      }
      return false;
    });
  };

  // Delete project (optional)
  const deleteProject = (projectId) => {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.filter(
        (project) => project.id !== projectId
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
      return updatedProjects;
    });
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProjectProgress,
        getProjectsByCategory,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
