import React from 'react';
import { useSelector } from 'react-redux';
const RoundScore = () => {
  const teams = useSelector((state) => state.teams.data);
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        {teams?.map((team, index) => {
          return (
            <p key={Math.round(1, 3)}>
              Team {team.teamname} ---- Score: {team.score}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default RoundScore;
