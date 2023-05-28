import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Login';
import HomeComponent from './Home';
import Tasks from './Tasks';
import Profile from './Profile';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<>Home Page</>} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path='/my-tasks' element={<Tasks />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
