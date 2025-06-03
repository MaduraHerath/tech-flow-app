import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddProjectButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/projects/new');
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      + Add Project
    </button>
  );
};

export default AddProjectButton;
