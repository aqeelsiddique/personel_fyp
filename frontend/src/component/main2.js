import React, { useEffect, useState } from 'react';

import './index.css';
import Img from '../mainimg.png';
import Mainbg from '../mainbg.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchTeams,
  setTotalRounds,
  setRoundSelected,
} from '../redux/features/Team';
import { setTime } from '../redux/features/Timer';
import { ClipLoader } from 'react-spinners';
const Main = () => {
  const [rounds, setRounds] = useState([]);
  const [selectedRound, setSelectedRound] = useState('');
  const [noMcqs, setNoMcqs] = useState(1);
  const loading = useSelector((state) => state.teams.loading);
  const [maxTime, setMaxTime] = useState(30);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // increment Decrement 

  // let [num, setNum] = useState(0);
  // let incNum = () => {
  //   if (num < 10) {
  //     setNum(Number(num) + 1);
  //   }
  // };
  // let decNum = () => {
  //   if (num > 0) {
  //     setNum(num - 1);
  //   }
  // }

  // let [tnum, setTnum] = useState(0);
  // let incTnum = () => {
  //   if (tnum < 10) {
  //     setTnum(Number(tnum) + 1);
  //   }
  // };
  // let decTnum = () => {
  //   if (tnum > 0) {
  //     setTnum(tnum - 1);
  //   }
  // }



    // const [noMcqs, setNoMcqs] = useState(1);
  
    // const increment = () => {
    //   setNoMcqs(prevNoMcqs => prevNoMcqs + 1);
    //   setMaxTime(prevTime => prevTime + 1);   
    // };
  
    // const decrement = () => {
    //   setNoMcqs(prevNoMcqs => (prevNoMcqs > 1 ? prevNoMcqs - 1 : 1));
    //   setMaxTime(prevTime => (prevTime > 1 ? prevTime - 1 : 1));      
    // };

    // const incre = () => {
    // };
  
    // const decre = () => {
    // };


  useEffect(() => {
    async function fetchRounds() {
      const response = await fetch('/rounds');
      const data = await response.json();
      setRounds(data);
      setSelectedRound(data[0]?.roundname);
    }
    fetchRounds();
  }, []);

  const handleRoundChange = (event) => {
    setSelectedRound(event.target.value);
  };

  //  Form Handler here
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (selectedRound && selectedRound !== '' && noMcqs && noMcqs !== '') {
        const totalRounds = Number.parseInt(noMcqs);
        // validations are done, now we will hit our api for extracting teams for selectedRound
        dispatch(fetchTeams(selectedRound))
          .unwrap()
          .then(() => {
            dispatch(setTotalRounds(totalRounds));
            dispatch(setRoundSelected(selectedRound));
            dispatch(setTime(Number.parseInt(maxTime)));
            toast.success('Fetched Successfully');
            navigate('/start');
          })
          .catch((err) => toast.error(err?.message || 'Something went wrong'));
      } else {
        throw new Error('Please select all options.');
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <>
      <div className="main2 container">
        <div
          className="main m-4 "
          style={{
            backgroundImage: `url(${Mainbg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100%',
          }}
        >
          <div className="row">
            <div className="container main-set col-6">
              <h1 className="text">Visio Spark Quiz</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Select Round</Form.Label>
                  <Form.Select onChange={handleRoundChange}>
                    {rounds.map((option) => (
                      <option key={option._id} value={option.roundname}>
                        {option.roundname}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* <div class="input-group-prepend">
                  <button class="btn btn-outline-primary" type="button" onClick={decNum}>-</button>
                </div>
                <input type="text" class="form-control" onChange={(e) => setNoMcqs(e.target.value)} value={num} />
                <div class="input-group-prepend">
                  <button class="btn btn-outline-primary" type="button" onClick={incNum}>+</button>
                </div> */}


                {/* pract */}

                <Form.Group className="mb-4">
                  <Form.Label>Number Of Mcqs</Form.Label>
                  <div>
                    {/* <div onClick={decrement}>-</div> */}
                    <Form.Control
                      type="number"
                      value={noMcqs}
                      onChange={(e) => setNoMcqs(e.target.value)}
                      min={1}
                      // max={10}
                      style={{ width: "100%", margin: "0px 5px" }}
                    />
                    {/* <div onClick={increment}>+</div> */}
                  </div>
                </Form.Group>
                
                
                <Form.Group className="mb-4">
                  <Form.Label>Number Of Mcqs</Form.Label>
                  <div>
                    {/* <div onClick={decrement}>-</div> */}
                    <Form.Control
                    className="timer"
                      type="number"
                      value={maxTime}
                      onChange={(e) => setMaxTime(e.target.value)}
                      min={1}
                      // max={10}
                      style={{ width: "100%", margin: "0px 5px" }}
                    />
                    {/* <div onClick={increment}>+</div> */}
                  </div>
                </Form.Group>

                {/* pract end */}


                {/* <Form.Group className="mb-4">
                  <Form.Label>Number Of Mcqs</Form.Label>
                  <Form.Select onChange={(e) => setNoMcqs(e.target.value)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Select Timer</Form.Label>
                  <Form.Select onChange={(e) => setMaxTime(e.target.value)}>
                    <option value={30}>30</option>
                    <option value={45}>45</option>
                    <option value={60}>60</option>
                  </Form.Select>
                </Form.Group> */}

                {/* <div class="input-group-prepend">
                  <button class="btn btn-outline-primary" type="button" onClick={decTnum}>-</button>
                </div>
                <input type="text" class="form-control" value={tnum} onChange={(e) => setMaxTime(e.target.value)} />
                <div class="input-group-prepend">
                  <button class="btn btn-outline-primary" type="button" onClick={incTnum}>+</button>
                </div> */}


                <div className="d-grid gap-2 mt-3 submit">
                  <Button
                    type="submit"
                    className="btn btn"
                    disabled={loading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    Submit
                    {loading && (
                      <ClipLoader
                        size="20"
                        cssOverride={{ marginLeft: '1rem' }}
                      />
                    )}
                  </Button>
                </div>
              </Form>
            </div>
            <div className="mainimg col-6">
              <img src={Img} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
