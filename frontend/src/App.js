import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/login';
import Start from './component/start';
import Subject from './component/subject';
import Quiz from './component/quiz';
import Teams from './component/teams';
import Main2 from './component/main2';
import Test from './test';
import TeamList from './component/teams';
import Result from './component/result';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="test" element={<Test />} />
          <Route exact path="/" element={Login} />
          <Route index element={<Login />} />
          <Route  path="main2" element={<Main2 />} />
          <Route path="start" element={<Start />} />
          <Route path="subject" element={<Subject />} />
          <Route path="Quiz" element={<Quiz />} />
          <Route path="teams" element={<Teams />} />
          <Route path="/selectteams/:round" component={TeamList} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
