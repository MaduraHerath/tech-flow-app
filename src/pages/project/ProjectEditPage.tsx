import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProjectsQuery } from '../../feature/projects/projectApi';
import { useAppSelector } from '../../hooks/hook';
import useRole from '../../hooks/useRole';

const ProjectEditPage: React.FC = () => {
  const { id } = useParams();
  const { data: allProjects = [], isLoading, error } = useGetProjectsQuery();
  const {  hasRole } = useRole();
  const user = useAppSelector((state) => state.auth.user);

  const project = allProjects.find((p) => p.id === id);

  // Loading/Error/Not Found Handling
  if (isLoading) return <p>Loading project...</p>;
  if (error) return <p>Error loading project.</p>;
  if (!project) return <p>Project not found.</p>;

  const isAdmin = user?.role === 'admin';
  const isPMofTeam = user?.role === 'project_manager' && user?.teams?.includes(project.teamName);

  if (!isAdmin && !isPMofTeam) {
    return <p className="text-danger">You do not have permission to edit this project.</p>;
  }

  // ✅ Allow editing
  return (
    <div className="container mt-4">
      <h3>Edit Project: {project.name}</h3>

      {/* Replace this with an editable form if needed */}
      <div className="mb-3">
        <strong>Status:</strong> {project.status}
      </div>
      <div className="mb-3">
        <strong>Priority:</strong> {project.priority}
      </div>
      <div className="mb-3">
        <strong>Team:</strong> {project.teamName}
      </div>
      <div className="mb-3">
        <strong>Assigned To:</strong> {project.assignedTo}
      </div>
      <div className="mb-3">
        <strong>Due Date:</strong> {new Date(project.dueDate).toLocaleDateString()}
      </div>
      <div className="mb-3">
        <strong>Description:</strong> {project.description}
      </div>

      <button className="btn btn-secondary" onClick={() => window.history.back()}>
        Back
      </button>
    </div>
  );
};

export default ProjectEditPage;
