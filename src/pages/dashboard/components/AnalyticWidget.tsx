import React from 'react';

interface AnalyticsWidgetProps {
  totalProjects: number;
  completed: number;
  inProgress: number;
  onHold: number;
}

const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({ totalProjects, completed, inProgress, onHold }) => {
  return (
    <div className="card p-3 shadow rounded-3">
      <h5 className="mb-3">Project Analytics</h5>
      <ul className="list-unstyled mb-0">
        <li>Total Projects: <strong>{totalProjects}</strong></li>
        <li>Completed: <strong>{completed}</strong></li>
        <li>In Progress: <strong>{inProgress}</strong></li>
        <li>On Hold: <strong>{onHold}</strong></li>
      </ul>
    </div>
  );
};

export default AnalyticsWidget;
