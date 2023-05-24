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
// import { useSelector, useDispatch } from 'react-redux';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Result = () => {
  const currentRound = useSelector((state) => state.teams.currentRound);
  const totalRounds = useSelector((state) => state.teams.totalRounds);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedRound = useSelector((state) => state.teams.roundSelected);
  // const currentTeam = useSelector((state) => state.teams.currentTeam);

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
              {/* <span>Result</span> Round : {currentRound + 1} */}
              Result {selectedRound.replace('_', ' ')} 
            </h1>
          </div>
        </div>
        <div className="container">
          <div className="result-card">
            {/* <div className="row">
              <div className="col-md-4"> */}

                  {/* <ol>
                  {sortedTeams?.map((team, index) => {
                    return (
                      <li key={`${index}_${team?.teamname}`}>
                        <p>{team.universityname} University</p>
                        <p>Score : {team.score}</p>
                      </li>

                    );
                  })}
                </ol> */}

                    {sortedTeams?.map((team, index) => {
                      return (
                  <Card className='r-card'>
                  <div className="row">
                    <div className="col-md-4">
                        <ListGroup className='teams-display' key={`${index}_${team?.teamname}`} >
                <div className="card">
                          <ListGroup.Item className='uniname'>{team.universityname}</ListGroup.Item>
                          <ListGroup.Item className='teamname'>Score : {team.score}</ListGroup.Item>

                </div>
                        </ListGroup>
                        </div>
                  </div>
                  </Card>
                      );
                    })}

              {/* </div>
            </div> */}
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
    </div >
  );
};

export default Result;
