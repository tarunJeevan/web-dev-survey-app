import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { Login } from './Components/Login/Login';
import { Header } from './Components/Header/Header';
import { createContext, useState } from 'react';
import { Dashboard } from './Components/Dashboard/Dashboard'
import {SurveyBuilder} from './Components/SurveyBuilder/SurveyBuilder'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SurveyTaker } from './Components/Survey/SurveyTaker';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext(null);

function App() {
  const[username, setusername] = useState(null);

  useEffect(()=>{
    if(localStorage.getItem("username")===null){
      setusername("");
    }
    else{
      setusername(localStorage.getItem("username"));
    }
  },[])

  const[loginpage, setloginpage] = useState(false);
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
    setloginpage(true);
    } 
    else {
    setloginpage(false);
    }
  });
  }, [])

  return (
    <UserContext.Provider value={{username, setusername}}>
    <BrowserRouter>
    <Header loggedin={loginpage}/>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/creator" element={<SurveyBuilder />} />
        <Route path="/survey" element={<SurveyTaker />} />
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;