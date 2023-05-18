import React from 'react';
import './index.css';
import SelectQuiz from '../sub.png';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  setCurrentRound,
  setCurrentTeam,
  setTotalRounds,
} from '../redux/features/Team';
import { toast } from 'react-toastify';
import { setTime } from '../redux/features/Timer';
const Result = () => {
  const currentRound = useSelector((state) => state.teams.currentRound);
  const totalRounds = useSelector((state) => state.teams.totalRounds);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let teams = useSelector((state) => state.teams.data);
  let sortedTeams = [...teams];
  sortedTeams.sort((a, b) => b.score - a.score);

  const handleClick = async  () => {
    try {
      const response = await axios.post('/results', {
        round: currentRound + 1,
        teams: sortedTeams,
      });

      if (response.status === 201) {
        console.log('Result saved successfully');
      } else {
        console.log('Error saving result');
      }
    } catch (error) {
      console.log('Error:', error.message);
    }

    if (currentRound + 1 >= totalRounds) {
      toast.info('Thanks for participating');
      dispatch(setCurrentRound(0));
      dispatch(setCurrentTeam(0));
      dispatch(setTotalRounds(0));
      dispatch(setTime(0));
      navigate('/main2');
    } else {
      dispatch(setCurrentRound(currentRound + 1));
      dispatch(setCurrentTeam(0));
      navigate('/subject');
    }
  };
  return (
    <div className="result">
      <div
        className="quiz"
        style={{
          backgroundImage: `url(${SelectQuiz})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100vh',
        }}
      >
        <div className="round-detail">
          <div className="round">
            <h1>
              <span>Result</span> Round : {currentRound + 1}
            </h1>
          </div>
        </div>
        <div className="container">
          <div className="flex-content">
            <ol>
              {sortedTeams?.map((team, index) => {
                return (
                  <li key={`${index}_${team?.teamname}`}>
                    <p>{team.universityname} University</p>
                    <p>Score : {team.score}</p>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="card-submit">
            <button className="Color-White" onClick={handleClick}>
              {currentRound + 1 >= totalRounds
                ? 'Go to Main Screen'
                : 'continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
