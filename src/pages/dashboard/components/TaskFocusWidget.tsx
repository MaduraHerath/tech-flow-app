import React from 'react';

interface TaskFocusWidgetProps {
  currentTask: string;
  progress: number; // percentage
  assignedBy: string;
}

const TaskFocusWidget: React.FC<TaskFocusWidgetProps> = ({ currentTask, progress, assignedBy }) => {
  return (
    <div className="card p-3 shadow rounded-3">
      <h5 className="mb-3">Current Focus</h5>
      <p><strong>Task:</strong> {currentTask}</p>
      <p><strong>Assigned by:</strong> {assignedBy}</p>
      <div className="progress mt-2" style={{ height: '8px' }}>
        
      </div>
      <small>{progress}% Complete</small>
    </div>
  );
};

export default TaskFocusWidget;
