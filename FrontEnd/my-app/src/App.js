import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './components/home/signin';
import SignUp from './components/home/signup';
import DashBoard from "./components/dashboard/dashboard";
import Profile from "./components/profile/profile";
import History from "./components/history/history";
import Find from "./components/find/find.jsx";
import './App.css';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignIn />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/dashboard" element={<DashBoard />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route exact path="/history" element={<History/>}></Route>
          <Route exact path="/find" element={<Find/>}></Route>
        </Routes>
      </Router>
    </>
  );
}
