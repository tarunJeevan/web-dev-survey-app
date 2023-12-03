import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import "../Login/Login.css"
import { signInWithPopup, OAuthProvider } from 'firebase/auth';
import { auth } from '../../Utils/firebase';
import { UserContext } from '../../App';


export const Login = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {setusername} = useContext(UserContext);


  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    navigate("/profile")
  }

  // Microsoft authentication
  
  const provider = new OAuthProvider("microsoft.com");
  
  //tenant Id is the id for the project id created in the Azure admin center.. remind me to share in the group
  provider.setCustomParameters({
    prompt: "login",
    tenant: "b7dc318e-8abb-4c84-9a6a-3ae9fff0999f",
  });

  const microsoftAuth = () => {
    signInWithPopup(auth, provider).then((result) => {
      //we only need the accessToken for api requests
      const accessToken = result.user.accessToken;
      
      //save the name of the user which may prove useful later in the application
      const username = result.user.displayName;
      
      localStorage.setItem("token",accessToken);
      localStorage.setItem("username",username);
      setusername(username);
      // Changed this from "profile" to "dashboard". Change later as needed
      navigate("/dashboard");
    }).catch((e) => {
      console.log(e);
    })
  }

  //Todo redesign ui to only allow single sign in
  //Suggestions for Front-end team may have a context to set the username and accessToken 
  //rather than just have to set them to LocalStorage here
  
  //
  return (
    <div className='container'>
      <div className='header'>
        <div className='underline'></div>
      </div>
      <div className='submit-container'>
        <div className='mastodon_div'><img className='mastodon' src="mastodon.jpg" alt='' /></div>
        <div className='student_BG'></div>
        <div className='submit' onClick={microsoftAuth}>LOGIN</div>
      </div>
    </div>
  )
}
