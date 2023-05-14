import React from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';

import TeamMember from '../login2.png';
import { useSelector } from 'react-redux';

const Teams = () => {
  const teams = useSelector((state) => state.teams.data);
  const selectedRound = useSelector((state) => state.teams.roundSelected);
  return (
    <>
      <div
        className="teams"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(150, 110, 250, 0.1), rgba(0, 19, 100, 0)), url(${TeamMember}) `,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          height: '100vh',
          width: '100%',
        }}
      >
        <div class="container">
          <div class="row">
            <div className="team-title">
              {selectedRound.replace('_', ' ')} Teams
            </div>

            {teams?.map((team, index) => (
              <div className="col-md-4">
                <div className="card" key={Math.random() + index}>
                  <div className="card-body">
                    <h2 className="uni-name">{team.universityname}</h2>
                    <h3 className="team">{team.teamname}</h3>

                    <div className="members">
                      <p>{team.member1}</p>
                      <p>{team.member2}</p>
                      <p>{team.member3}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="card-submit">
              <button className="Color-White">
                {' '}
                <NavLink
                  to="/main2"
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Cancel
                </NavLink>{' '}
              </button>
              <button className="Color-White">
                {' '}
                <NavLink
                  to="/subject"
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Start
                </NavLink>{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Teams;
