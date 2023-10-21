import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import "../Login/Login.css"
import { signInWithPopup, OAuthProvider } from 'firebase/auth';
import { auth } from '../../Utils/firebase';


export const Login = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const win = window.sessionStorage;
  const navigate = useNavigate();

  useEffect(() => {
    if (win.getItem('name'))
      setName(win.getItem('name'));

    if (win.getItem('email'))
      setEmail(win.getItem('email'));

    if (win.getItem('password'))
      setPassword(win.getItem('password'));
  }, [])

  useEffect(() => {
    win.setItem('name', name)
    win.setItem('email', email)
    win.setItem('password', password)
  }, [name, email, password])

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
      const credential = OAuthProvider.credentialFromResult(result);
      
      //we only need the accessToken for api requests
      const accessToken = credential.accessToken;
      
      //save the name of the user which may prove useful later in the application
      const username = result.user.displayName;
      
      localStorage.setItem("token",accessToken);
      localStorage.setItem("username",username);
     
      //
      navigate("/profile");
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
        <div className='text'>Login</div>
        <div className='underline'></div>
      </div>

      <div className='inputs'>
        <div className='input'>
          <img src={"/person.png"} alt=""></img>
          <input type='name' placeholder='Username...' className="form-control" onChange={(event) => setName(event.target.value)} required></input>
        </div>
        <div className='input'>
          <img src={"/email.png"} alt=""></img>
          <input type='email' placeholder='Email...' className="form-control" onChange={(event) => setEmail(event.target.value)} required></input>
        </div>
        <div className='input'>
          <img src={"/password.png"} alt=""></img>
          <input type='password' placeholder='Password...' className="form-control" onChange={(event) => setPassword(event.target.value)} required></input>
        </div>
      </div>
      <div className='submit-container'>
        <div className='submit' onClick={microsoftAuth}>Login</div>
        <div className="forgot_n_singup" >
          <div className='forgot-container'>
            <a href=''><p>Forgot Password?</p></a>
          </div>
          <div className='singup-container'>
            <a href='/signup'><p>Signup?</p></a>
          </div>
        </div>
      </div>
    </div>
  )
}
