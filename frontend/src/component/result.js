import React from "react";
import "./index.css";
import SelectQuiz from "../sub.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCurrentRound,
  setCurrentTeam,
  setTotalRounds,
} from "../redux/features/Team";
import { toast } from "react-toastify";
import axios from "axios";

import { setTime } from "../redux/features/Timer";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const Result = () => {
  const currentRound = useSelector((state) => state.teams.currentRound);
  const totalRounds = useSelector((state) => state.teams.totalRounds);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedRound = useSelector((state) => state.teams.roundSelected);

  let teams = useSelector((state) => state.teams.data);
  let sortedTeams = [...teams];
  sortedTeams.sort((a, b) => b.score - a.score);

  const handleClick = async () => {
    try {
      const response = await axios.post("/results", {
        round: currentRound + 1,
        teams: sortedTeams,
      });

      if (response.status === 201) {
        console.log("Result saved successfully");
      } else {
        console.log("Error saving result");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }

    if (currentRound + 1 >= totalRounds) {
      toast.info("Thanks for participating");
      dispatch(setCurrentRound(0));
      dispatch(setCurrentTeam(0));
      dispatch(setTotalRounds(0));
      dispatch(setTime(0));
      navigate("/main2");
    } else {
      dispatch(setCurrentRound(currentRound + 1));
      dispatch(setCurrentTeam(0));
      navigate("/subject");
    }
  };

  return (
    <div className="result">
      <div
        className="quiz"
        style={{
          backgroundImage: `url(${SelectQuiz})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100vh",
        }}
      >
        <div className="round-detail">
          <div className="round">
            <h1>Result {selectedRound.replace("_", " ")}</h1>
          </div>
        </div>
        <div className="container">
          <div className="result-card">
            {sortedTeams?.map((team, index) => {
              return (
                <Card className="r-card" key={index}>
                  <div className="row">
                    <div className="col-md-4">
                      <ListGroup
                        className="teams-display"
                        key={`${index}_${team?.teamname}`}
                      >
                        <div className="card">
                          <ListGroup.Item className="uniname">
                            {team.universityname}
                          </ListGroup.Item>
                          <ListGroup.Item className="teamname">
                            {team.teamname}
                          </ListGroup.Item>
                          <ListGroup.Item className="members">
                            <p>{team.member1}</p>
                            <p>{team.member2}</p>
                            <p>{team.member3}</p>
                          </ListGroup.Item>
                          <ListGroup.Item className="teamname">
                            Score: {team.score}
                          </ListGroup.Item>
                        </div>
                      </ListGroup>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          <div className="card-submit">
            <button className="Color-White" onClick={handleClick}>
              {currentRound + 1 >= totalRounds
                ? "Go to Main Screen"
                : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
