import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { Project } from '../../../types/types';
import useRole from '../../../hooks/useRole';
import { useDeleteProjectMutation } from '../projectApi';

interface ProjectTableProps {
    projects: Project[];
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
    const navigate = useNavigate();
    const { hasRole } = useRole();
    const handleEdit = (id: string) => {
        navigate(`/projects/${id}/edit`);
    };
     const [deleteProject, { isLoading }] = useDeleteProjectMutation();

  const handleDelete = async(id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id).unwrap();
        alert('Project deleted');
      } catch (err) {
        console.error('Delete failed', err);
        alert('Failed to delete project');
      }
    }
  };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Project List</h3>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Team</th>
                        <th>Assigned To</th>
                        <th>Due Date</th>
                        <th>Description</th>
                        {hasRole(['admin', 'project_manager']) &&
                            <th>Action</th>
                        }

                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>
                                <span className={`badge 
                  ${project.status === 'completed' ? 'bg-success' :
                                        project.status === 'in-progress' ? 'bg-primary' :
                                            project.status === 'review' ? 'bg-warning text-dark' :
                                                project.status === 'on-hold' ? 'bg-secondary' : 'bg-info'}
                `}>
                                    {project.status}
                                </span>
                            </td>
                            <td>
                                <span className={`text-capitalize 
                  ${project.priority === 'high' ? 'text-danger' :
                                        project.priority === 'meadium' ? 'text-warning' : 'text-success'}`}
                                >
                                    {project.priority}
                                </span>
                            </td>
                            <td>{project.teamName}</td>
                            <td>{project.assignedTo}</td>
                            <td>{new Date(project.dueDate).toLocaleDateString()}</td>
                            <td>{project.description}</td>
                            <td>
                                {hasRole(['admin', 'project_manager']) &&
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => handleEdit(project.id)}
                                    >
                                        Edit
                                    </button>
                                }
                                <hr/>
                                {hasRole('admin') &&
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(project.id)}
                                    >
                                        Delete
                                    </button>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectTable;
