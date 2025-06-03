import React from 'react';

interface PerformanceMetricsProps {
  velocity: number;        // Story points per sprint
  deliveryRate: number;    // % of tasks completed on time
  bugs: number;            // Number of open bugs
}

const PerformanceMetricsWidget: React.FC<PerformanceMetricsProps> = ({ velocity, deliveryRate, bugs }) => {
  return (
    <div className="card p-3 shadow rounded-3">
      <h5 className="mb-3">Performance Metrics</h5>
      <div className="row">
        <div className="col">
          <p>Velocity</p>
          <h6>{velocity} pts/sprint</h6>
        </div>
        <div className="col">
          <p>Delivery Rate</p>
          <h6>{deliveryRate}%</h6>
        </div>
        <div className="col">
          <p>Open Bugs</p>
          <h6>{bugs}</h6>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetricsWidget;
