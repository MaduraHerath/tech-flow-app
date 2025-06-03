import React from 'react';

interface TeamFilterProps {
  teams: string[];
  selectedTeam: string;
  onChange: (team: string) => void;
}

const TeamFilter: React.FC<TeamFilterProps> = ({ teams, selectedTeam, onChange }) => {
  return (
    <div className="d-flex justify-content-end mb-3">
      <select
        className="form-select w-auto"
        value={selectedTeam}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All Teams</option>
        {teams.map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TeamFilter;
