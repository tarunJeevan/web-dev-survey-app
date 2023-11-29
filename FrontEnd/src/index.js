import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import { Header } from './Components/Header/Header';
import reportWebVitals from './reportWebVitals';
import { Login } from './Components/Login/Login';
import { Signup } from './Components/Signup/Signup';
import { Profile } from './Components/Profile/Profile';
import { Dashboard } from './Components/Dashboard/Dashboard'
import { SurveyBuilder } from './Components/SurveyBuilder/SurveyBuilder'
import { SurveyTaker } from './Components/Survey/SurveyTaker'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/creator" element={<SurveyBuilder />} />
        <Route path="/survey" element={<SurveyTaker />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
