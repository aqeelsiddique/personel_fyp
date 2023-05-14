import React from 'react';
import './index.css';
import SelectQuiz from '../sub.png';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

  const handleClick = () => {
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
            {/* {sortedTeams?.length === 3 && (
              <>
                <div className="second">
                  <h1>Second Position</h1>
                  <h2>{sortedTeams[1].teamname} University</h2>
                  <h2>Score : {sortedTeams[1].score}</h2>
                </div>
                <div className="winner">
                  <h1>Winner</h1>
                  <h2>{sortedTeams[0].teamname} University</h2>
                  <h2>Score : {sortedTeams[0].score}</h2>
                </div>
                <div className="third">
                  <h1>Third Position</h1>
                  <h2>{sortedTeams[2].teamname} University</h2>
                  <h2>Score : {sortedTeams[2].score}</h2>
                </div>
              </>
            )}
            {sortedTeams?.length === 2 && (
              <>
                <div className="second">
                  <h1>Second Position</h1>
                  <h2>{sortedTeams[1].teamname} University</h2>
                  <h2>Score : {sortedTeams[1].score}</h2>
                </div>
                <div className="winner">
                  <h1>Winner</h1>
                  <h2>{sortedTeams[0].teamname} University</h2>
                  <h2>Score : {sortedTeams[0].score}</h2>
                </div>
              </>
            )}
            {sortedTeams?.length === 1 && (
              <>
                <div className="winner">
                  <h1>Winner</h1>
                  <h2>{sortedTeams[0].teamname} University</h2>
                  <h2>Score : {sortedTeams[0].score}</h2>
                </div>
              </>
            )} */}
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
