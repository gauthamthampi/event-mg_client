import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Home from './components/home';
import MyEvents from './components/myevents';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/myevents" element={<MyEvents />} />
      </Routes>
    </Router>
  );
};

export default App;