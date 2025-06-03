import React, { useState } from 'react';

import useRole from '../../hooks/useRole';
import ProjectTable from './component/ProjectTable';
import TeamFilter from './component/TeamFilter';
import { useGetProjectsQuery } from './projectApi';
import { useAppSelector } from '../../hooks/hook';
import AddProjectButton from './component/AddProject';

const ProjectList: React.FC = () => {
  const { data: allProjects = [], isLoading, error } = useGetProjectsQuery();
  const { hasRole } = useRole();
  const [selectedTeam, setSelectedTeam] = useState('');
 const user = useAppSelector((state) => state.auth.user);
 
  const teams = Array.from(new Set(allProjects.map((p) => p.teamName)));

  const filteredProjects = React.useMemo(() => {
  if (!user) return [];

  // Start with role-based filtering
  let projectsByRole: any[];
  switch (user.role) {
    case 'admin':
      // Admin sees all projects
      projectsByRole = allProjects;
      break;

    case 'project_manager':
      // PM sees projects from their teams or all if 'all' team is included
      projectsByRole = allProjects.filter((project) =>
        user.teams?.includes('all') || user.teams?.includes(project.teamName)
      );
      break;

    case 'team_member':
      // Team member sees only assigned projects
      projectsByRole = allProjects.filter((project) =>
        user.assignedProjects?.includes(project.id)
      );
      break;

    default:
      projectsByRole = [];
  }

  // Then apply the selectedTeam filter (if selected)
  if (selectedTeam && selectedTeam !== 'all') {
    projectsByRole = projectsByRole.filter(
      (project) => project.teamName === selectedTeam
    );
  }

  return projectsByRole;
}, [allProjects, user, selectedTeam]);


  if (isLoading) return <p>Loading projects...</p>;
  if (error) return <p>Error loading projects.</p>;


  return (
    <div>
      <div className="container mt-4">
        {hasRole('admin') &&
          <TeamFilter
        teams={teams}
        selectedTeam={selectedTeam}
        onChange={setSelectedTeam}
      />
        }

        {hasRole(['admin' ,'project_manager']) &&
          <AddProjectButton
      />
        }
    
      <ProjectTable projects={filteredProjects} />
    </div>
      
    </div>
  );
};

export default ProjectList;
