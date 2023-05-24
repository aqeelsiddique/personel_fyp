import React, { useEffect, useState } from 'react';
import Sub from '../sub.png';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestion } from '../redux/features/Question';
import { setSubject } from '../redux/features/Team';
import { toast } from 'react-toastify';
import './index.css';

function Subject() {
  const [subjects, setSubjects] = useState([]);
  const teams = useSelector((state) => state.teams.data);
  const currentTeam = useSelector((state) => state.teams.currentTeam);
  const selectedRound = useSelector((state) => state.teams.roundSelected);
  const currentRound = useSelector((state) => state.teams.currentRound);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchSubjects() {
      const response = await fetch('/subjects');
      const data = await response.json();
      console.log('Subjects: ', data);
      setSubjects(data);
    }
    fetchSubjects();
  }, []);

  const handleSubjectClick = (id) => {
    dispatch(fetchQuestion(encodeURIComponent(id)))
      .unwrap()
      .then(() => {
        dispatch(setSubject(id));
        navigate('/Quiz');
      })
      .catch((err) => toast.error(err?.message || 'Something went wrong'));
  };
  return (
    <>
      <div
        className="subject"
        style={{
          backgroundImage: `url(${Sub})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100vh',
        }}
      >
        <div className="container">

          <div className="round flex-row">
            <p>{teams[currentTeam].universityname || 'University Name'}</p>
            <h1>
              Quiz <span> {selectedRound.replace('_', ' ')} </span>
            </h1>{' '}
            <p>{teams[currentTeam].teamname || 'Team Name'}</p>
          </div>
          <div className="sub">
            <div className="sub-title text-center text-white">
              <h2>Select Subject</h2>
            </div>
            <div className="sub-content">
              {subjects.map((subject) => (
                <p
                  key={subject._id}
                  className="subj"
                  onClick={() => handleSubjectClick(subject?.name)}
                >
                  {subject.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="loop-count">
          <p >{currentRound + 1}</p>
        </div>
      </div>
    </>
  );
}

export default Subject;
