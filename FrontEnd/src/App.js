import logo from './logo.svg';
import './App.css';
import { Login } from './Components/Login/Login';
import { Header } from './Components/Header/Header';
import { createContext, useState } from 'react';
import { Profile } from './Components/Profile/Profile';
import { Dashboard } from './Components/Dashboard/Dashboard'
import {SurveyBuilder} from './Components/SurveyBuilder/SurveyBuilder'
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const UserContext = createContext(null);

function App() {
  const[username, setusername] = useState(null);
  return (
    <UserContext.Provider value={{username, setusername}}>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/creator" element={<SurveyBuilder />} />
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
