import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProjectsQuery } from '../../feature/projects/projectApi';
import { useAppSelector } from '../../hooks/hook';
import useRole from '../../hooks/useRole';

const ProjectEditPage: React.FC = () => {
  const { id } = useParams();
  const { data: allProjects = [], isLoading, error } = useGetProjectsQuery();
  const { hasRole } = useRole();
  const user = useAppSelector((state) => state.auth.user);

  const project = allProjects.find((p) => p.id === id);

  const isAdmin = user?.role === 'admin';
  const isPMofTeam = user?.role === 'project_manager' && user?.teams?.includes(project?.teamName || '');

  if (isLoading) return <p>Loading project...</p>;
  if (error) return <p>Error loading project.</p>;
  if (!project) return <p>Project not found.</p>;
  if (!isAdmin && !isPMofTeam) {
    return <p className="text-danger">You do not have permission to edit this project.</p>;
  }

  const [formData, setFormData] = useState({
    status: project.status,
    priority: project.priority,
    assignedTo: project.assignedTo,
    dueDate: project.dueDate,
    description: project.description,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace this with an API call to update the project
    console.log('Updated Project:', { id, ...formData });
  };

  return (
    <div className="container mt-4">
      <h3>Edit Project: {project.name}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="form-select">
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange} className="form-select">
            <option value="high">High</option>
            <option value="meadium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Assigned To</label>
          <input
            name="assignedTo"
            type="text"
            disabled ={!hasRole(['admin','project_manager'])}
            value={formData.assignedTo}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input
            name="dueDate"
            type="date"
            disabled ={!hasRole('admin')}
            value={formData.dueDate.split('T')[0]}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled ={!hasRole('admin')}
            className="form-control"
            rows={4}
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          Save Changes
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => window.history.back()}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ProjectEditPage;
