import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hook';
import useRole from '../../hooks/useRole';
// import { useAddProjectMutation } from '../../feature/projects/projectApi'; // Uncomment if using mutation hook

const ProjectAddPage: React.FC = () => {
     const navigate = useNavigate();
     const user = useAppSelector((state) => state.auth.user);
     const { hasRole } = useRole();
     // const [addProject] = useAddProjectMutation(); // If using RTK mutation

     const [formData, setFormData] = useState({
          name: '',
          status: 'planning',
          priority: 'medium',
          assignedTo: '',
          dueDate: '',
          description: '',
     });

     const handleChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
     ) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          // Call API to add project
          console.log('New Project:', formData);
          // await addProject(formData).unwrap();
          navigate(-1); // Go back after save
     };

     const isAdmin = user?.role === 'admin';
     const isPMofTeam = user?.role === 'project_manager';

     if (!isAdmin && !isPMofTeam) {
          return <p className="text-danger">You do not have permission to edit this project.</p>;
     }


     return (
          <div className="container mt-4">
               <h3>Add New Project</h3>
               <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                         <label className="form-label">Project Name</label>
                         <input
                              name="name"
                              type="text"
                              value={formData.name}
                              onChange={handleChange}
                              className="form-control"
                              required
                         />
                    </div>

                    <div className="mb-3">
                         <label className="form-label">Status</label>
                         <select
                              name="status"
                              value={formData.status}
                              onChange={handleChange}
                              className="form-select"
                         >
                              <option value="planning">Planning</option>
                              <option value="in-progress">In Progress</option>
                              <option value="review">Review</option>
                              <option value="completed">Completed</option>
                              <option value="on-hold">On Hold</option>
                         </select>
                    </div>

                    <div className="mb-3">
                         <label className="form-label">Priority</label>
                         <select
                              name="priority"
                              value={formData.priority}
                              onChange={handleChange}
                              className="form-select"
                         >
                              <option value="high">High</option>
                              <option value="medium">Medium</option>
                              <option value="low">Low</option>
                         </select>
                    </div>

                    <div className="mb-3">
                         <label className="form-label">Assigned To</label>
                         <input
                              name="assignedTo"
                              type="text"
                              disabled={!hasRole(['admin', 'project_manager'])}
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
                              disabled={!hasRole('admin')}
                              value={formData.dueDate}
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
                              disabled={!hasRole('admin')}
                              className="form-control"
                              rows={4}
                         />
                    </div>

                    <button type="submit" className="btn btn-success me-2">
                         Create Project
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                         Cancel
                    </button>
               </form>
          </div>
     );
};

export default ProjectAddPage;
