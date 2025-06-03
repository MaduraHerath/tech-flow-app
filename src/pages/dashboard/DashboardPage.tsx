import React from 'react';
import useRole from '../../hooks/useRole';
import AnalyticsWidget from './components/AnalyticWidget';
import PerformanceMetricsWidget from './components/PerformanceMetricsWidget';
import TaskFocusWidget from './components/TaskFocusWidget';

const DashboardPage: React.FC = () => {
  const { hasRole } = useRole();

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Dashboard</h3>

      {hasRole('admin') && (
        <AnalyticsWidget
          totalProjects={25}
          completed={10}
          inProgress={10}
          onHold={5}
        />
      )}

      {hasRole('project_manager') && (
        <PerformanceMetricsWidget
          velocity={35}
          deliveryRate={88}
          bugs={3}
        />
      )}

      {hasRole('team_member') && (
        <TaskFocusWidget
          currentTask="Implement login flow"
          progress={65}
          assignedBy="Jane Doe"
        />
      )}
    </div>
  );
};

export default DashboardPage;
