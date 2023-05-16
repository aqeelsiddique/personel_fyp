import React from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectQuiz from "../sub.png";
import Timer from "./Timer";
import "./index.css";
import { setCurrentTeam, setTeamScore } from "../redux/features/Team";

const Quiz = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentTeam = useSelector((state) => state.teams.currentTeam);
  const teams = useSelector((state) => state.teams.data);
  const totalTeams = useSelector((state) => state.teams.totalTeams);
  const loading = useSelector((state) => state.questions.loading);
  const randomIndex = useSelector((state) => state.questions.randomIndex);
  const questions = useSelector((state) => state.questions.data);
  const timeDuration = useSelector((state) => state.timer.maxTime);
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ClipLoader size="30" />
      </div>
    );
  }
  if (questions.length === 0) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No Questions Found
      </div>
    );
  }

  const currentQuestion = questions[randomIndex];

  // This function handles moving to next team or round
  const handleRound = () => {
    // Now move to next Team for current Round, but first we will make sure round is also completed
    if (currentTeam + 1 === totalTeams) {
      navigate("/result", { state: { roundCompleted: true } });
    } else {
      dispatch(setCurrentTeam(currentTeam + 1));
      navigate("/subject");
    }
  };

  const handleOptionSelect = (selectedOption) => {
    if (
      selectedOption.trim().toLowerCase() ===
      currentQuestion.ans.trim().toLowerCase()
    ) {
      toast.success("Correct !");
      dispatch(
        setTeamScore({
          name: teams[currentTeam]?.teamname,
          score: teams[currentTeam]?.score + 10,
        })
      );
    } else {
      toast.error("Wrong !");
    }
    handleRound();
  };

  return (
    <>
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
        <div className="container">
          <div className="quiz-team-detail">
            <div className="row">
              <div className="col-lg-4 ">
                <h2 className="name">Team {currentTeam + 1}</h2>
              </div>
              <div className="col-lg-4 ">
                <h2 className="round">Database</h2>
              </div>
              <div className="col-lg-4   timer">
                <h1 className="circle">
                  <Timer duration={timeDuration} handleRound={handleRound} />
                </h1>
              </div>
            </div>
          </div>
          <div className="quiz-content">
            <div className="question" key={currentQuestion._id}>
              {currentQuestion.image ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "400px",
                    height: "400px",
                  }}
                >
                  <img
                    src={"/images/" + currentQuestion.image}
                    alt="Question Image"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
              ) : (
                currentQuestion.ques
              )}
            </div>
            <div className="options" key={currentQuestion._id}>
              <p onClick={() => handleOptionSelect(currentQuestion.option1)}>
                {currentQuestion.option1}
              </p>
              <p onClick={() => handleOptionSelect(currentQuestion.option2)}>
                {currentQuestion.option2}
              </p>
              <p onClick={() => handleOptionSelect(currentQuestion.option3)}>
                {currentQuestion.option3}
              </p>
              <p onClick={() => handleOptionSelect(currentQuestion.option4)}>
                {currentQuestion.option4}
              </p>
            </div>
          </div>

          {/* <button
            disabled={currentQuestionIndex === questions.length - 1}
            onClick={handleNextQuestion}
          >
            Next Question
          </button> */}

          <div>Current Score: {teams[currentTeam]?.score || 0}</div>
        </div>
      </div>
    </>
  );
};
export default Quiz;
