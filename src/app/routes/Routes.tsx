import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from '../../pages/login/LoginPage';
import UnauthorizedPage from '../../pages/UnauthorizedPage';
import DashboardPage from '../../pages/dashboard/DashboardPage';
import Layout from '../../layout/Layout';
import ProjectPage from '../../pages/ProjectPage';
import AnalyticsPage from '../../pages/AnalyticsPage';
import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from '../../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Protected routes wrapped in Layout */}
      <Route element={<ProtectedRoute allowedRoles={['admin', 'project_manager', 'team_member']} />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Project page - only accessible by project managers */}
          <Route element={<ProtectedRoute allowedRoles={['project_manager']} />}>
            <Route path="project" element={<ProjectPage />} />
          </Route>

          {/* Analytics page - only accessible by admins */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="analytics" element={<AnalyticsPage />} />
          </Route>
        </Route>
      </Route>

      {/* Catch-all for unmatched routes */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
