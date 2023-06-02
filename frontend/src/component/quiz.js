// import React from "react";
// import { toast } from "react-toastify";
// import { ClipLoader } from "react-spinners";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import SelectQuiz from "../sub.png";
// import Timer from "./Timer";
// import "./index.css";
// import { setCurrentTeam, setTeamScore } from "../redux/features/Team";
// // import React from 'react';
// // import Popup from 'reactjs-popup';
// // import 'reactjs-popup/dist/index.css';

// const Quiz = (props) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const currentTeam = useSelector((state) => state.teams.currentTeam);
//   const teams = useSelector((state) => state.teams.data);
//   const totalTeams = useSelector((state) => state.teams.totalTeams);
//   const loading = useSelector((state) => state.questions.loading);
//   const randomIndex = useSelector((state) => state.questions.randomIndex);
//   const questions = useSelector((state) => state.questions.data);
//   // const [subjects, setSubjects] = useState([]);
//   // const currentSubject = useSelector((state) => state.subjects.currentSubject);
//   const timeDuration = useSelector((state) => state.timer.maxTime);
//   const subject = useSelector((state) => state.teams.selectedSubject);

//   if (loading) {
//     return (
//       <div
//         style={{
//           height: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <ClipLoader size="30" />
//       </div>
//     );
//   }
//   if (questions.length === 0) {
//     return (
//       <div
//         style={{
//           height: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         {/* <Popup posistion=' right center'  width='300px' height='300px'> */}
//         <div> No Questions Found</div>
//         {/* </Popup> */}
//       </div>
//     );
//   }

//   const currentQuestion = questions[randomIndex];

//   // This function handles moving to next team or round
//   const handleRound = () => {
//     // Now move to next Team for current Round, but first we will make sure round is also completed
//     if (currentTeam + 1 === totalTeams) {
//       navigate("/result", { state: { roundCompleted: true } });
//     } else {
//       dispatch(setCurrentTeam(currentTeam + 1));
//       navigate("/subject");
//     }
//   };

//   const handleOptionSelect = (selectedOption) => {
//     if (
//       selectedOption.trim().toLowerCase() ===
//       currentQuestion.ans.trim().toLowerCase()
//     ) {
//       toast.success("Correct !");
//       dispatch(
//         setTeamScore({
//           name: teams[currentTeam]?.teamname,
//           score: teams[currentTeam]?.score + 10,
//         })
//       );
//     } else {
//       toast.error("Wrong!");
//     }
//     handleRound();
//   };

//   return (
//     <>
//       <div
//         className="quiz"
//         style={{
//           backgroundImage: `url(${SelectQuiz})`,
//           backgroundPosition: "center center",
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//           width: "100%",
//           height: "100vh",
//         }}
//       >
//         <div className="container">
//           <div className="quiz-team-detail">
//             <div className="row">
//               <div className="col-lg-4 ">
//                 {/* <h2 className="name">Team {currentTeam + 1}</h2> */}
//                 <h2 className="name">
//                   {teams[currentTeam].universityname || "University Name"}
//                 </h2>
//               </div>
//               <div className="col-lg-4 ">
//                 <h2 className="round">{subject}</h2>
//                 {/* <h2 className="round">{[currentSubject].name}</h2> */}
//               </div>
//               <div className="col-lg-4   timer">
//                 <h1 className="circle">
//                   <Timer duration={timeDuration} handleRound={handleRound} />
//                 </h1>
//               </div>
//             </div>
//           </div>
//           <div className="quiz-content">
//             <div className="question" key={currentQuestion._id}>
//               {currentQuestion.image ? (
//                 <div
//                   style={{
//                     display: "flex",
//                     // justifyContent: "center",
//                     // alignItems: "center",
//                     width: "100%",
//                     height: "200px",
//                   }}
//                 >
//                   <img
//                     src={"/images/" + currentQuestion.image}
//                     alt="Cat playing with a ball"
//                     style={{
//                       width: "100%",
//                       maxWidth: "500px",
//                       height: "200px",
//                       maxHeight: "300px",
//                     }}
//                   />
//                 </div>
//               ) : (
//                 currentQuestion.ques
//               )}
//             </div>
//             <div className="options" key={currentQuestion._id}>
//               <p onClick={() => handleOptionSelect(currentQuestion.option1)}>
//                 a. {currentQuestion.option1}
//               </p>
//               <p onClick={() => handleOptionSelect(currentQuestion.option2)}>
//                 b. {currentQuestion.option2}
//               </p>
//               <p onClick={() => handleOptionSelect(currentQuestion.option3)}>
//                 c. {currentQuestion.option3}
//               </p>
//               <p onClick={() => handleOptionSelect(currentQuestion.option4)}>
//                 d. {currentQuestion.option4}
//               </p>
//             </div>
//           </div>
//           {/* <button
//             disabled={currentQuestionIndex === questions.length - 1}
//             onClick={handleNextQuestion}
//           >
//             Next Question
//           </button> */}
//         </div>
//         <div className="current-score">
//           <p> Current Score: {teams[currentTeam]?.score || 0}</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Quiz;
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
  // Access necessary hooks and Redux store values
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentTeam = useSelector((state) => state.teams.currentTeam);
  const teams = useSelector((state) => state.teams.data);
  const totalTeams = useSelector((state) => state.teams.totalTeams);
  const loading = useSelector((state) => state.questions.loading);
  const randomIndex = useSelector((state) => state.questions.randomIndex);
  const questions = useSelector((state) => state.questions.data);
  const timeDuration = useSelector((state) => state.timer.maxTime);
  const subject = useSelector((state) => state.teams.selectedSubject);



  // Loading state: Display spinner if questions are still loading
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

  // No questions found: Display message
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
        <div> No Questions Found</div>
      </div>
    );
  }

  // Get the current question based on randomIndex
  const currentQuestion = questions[randomIndex];

  // Handle moving to the next team or round
  const handleRound = () => {
    if (currentTeam + 1 === totalTeams) {
      // All teams completed the current round
      navigate("/result", { state: { roundCompleted: true } });
    } else {
      // Move to the next team for the current round
      dispatch(setCurrentTeam(currentTeam + 1));
      navigate("/subject");
    }
  };

  // Handle option selection
  const handleOptionSelect = (selectedOption) => {
    if (
      selectedOption.trim().toLowerCase() ===
      currentQuestion.ans.trim().toLowerCase()
    ) {
      toast.success("Correct !");
      // Update team score if the answer is correct
      dispatch(
        setTeamScore({
          name: teams[currentTeam]?.teamname,
          score: teams[currentTeam]?.score + 10,
        })
      );
    } else {
      toast.error("Wrong!");
    }
    handleRound();
  };

  // Render the quiz interface
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
              <div className="col-lg-4">
                <h2 className="name">
                  {teams[currentTeam].universityname || "University Name"}
                </h2>
              </div>
              <div className="col-lg-4">
                <h2 className="round">{subject}</h2>
              </div>
              <div className="col-lg-4 timer">
                <h1 className="circle">
                  <Timer duration={timeDuration} handleRound={handleRound} />
                </h1>
              </div>
            </div>
          </div>
          <div className="quiz-content">
            {currentQuestion && (
              <div className="question" key={currentQuestion._id}>
                {currentQuestion.image && (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "200px",
                    }}
                  >
                    <img
                      src={"/images/" + currentQuestion.image}
                      alt="Cat playing with a ball"
                      style={{
                        width: "100%",
                        maxWidth: "500px",
                        height: "200px",
                        maxHeight: "300px",
                      }}
                    />
                  </div>
                )}
                {currentQuestion.ques && <p>{currentQuestion.ques}</p>}
              </div>
            )}
            {currentQuestion && (
              <div className="options" key={currentQuestion._id}>
                {currentQuestion.option1 && (
                  <p
                    onClick={() => handleOptionSelect(currentQuestion.option1)}
                  >
                    a. {currentQuestion.option1}
                  </p>
                )}
                {currentQuestion.option2 && (
                  <p
                    onClick={() => handleOptionSelect(currentQuestion.option2)}
                  >
                    b. {currentQuestion.option2}
                  </p>
                )}
                {currentQuestion.option3 && (
                  <p
                    onClick={() => handleOptionSelect(currentQuestion.option3)}
                  >
                    c. {currentQuestion.option3}
                  </p>
                )}
                {currentQuestion.option4 && (
                  <p
                    onClick={() => handleOptionSelect(currentQuestion.option4)}
                  >
                    d. {currentQuestion.option4}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="current-score">
          <p> Current Score: {teams[currentTeam]?.score || 0}</p>
        </div>
      </div>
    </>
  );
};

export default Quiz;
