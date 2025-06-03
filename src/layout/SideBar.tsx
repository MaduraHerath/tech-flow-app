// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import useRole from '../hooks/useRole';

const Sidebar: React.FC = () => {
  const { hasRole } = useRole();

  return (
    <div className="d-flex flex-column p-3 bg-light" style={{ width: '250px', height: '100vh' }}>
      <h4 className="mb-4">Navigation</h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link text-dark">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/projects" className="nav-link text-dark">
            Projects
          </Link>
        </li>

        {hasRole('admin') && (
          <li>
            <Link to="/analytics" className="nav-link text-dark">
              Analytics
            </Link>
          </li>
        )}

        {hasRole('project_manager') && (
          <li>
            <Link to="/team-performance" className="nav-link text-dark">
              Team Performance
            </Link>
          </li>
        )}

        {hasRole('team_member') && (
          <li>
            <Link to="/my-tasks" className="nav-link text-dark">
              My Tasks
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
