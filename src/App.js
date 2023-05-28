import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/Login';
import Tasks from './Components/Tasks';
import Profile from './Components/Profile';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path='/my-tasks' element={<Tasks />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
