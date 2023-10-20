import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import "../Login/Login.css"



export const Login = () => {

  const[name, setName] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  
  const win = window.sessionStorage;
  const navigate = useNavigate();

  useEffect(()=>{
    if(win.getItem('name'))
    setName(win.getItem('name'));

    if(win.getItem('email'))
    setEmail(win.getItem('email'));

    if(win.getItem('password'))
    setPassword(win.getItem('password'));
  },[])

  useEffect(()=>{
    win.setItem('name', name)
    win.setItem('email', email)
    win.setItem('password', password)
  },[name, email, password])

  const Submit = (e)=>{
    e.preventDefault();
    navigate("/profile")
  }

  return (
    <div className='container'>
    <div className='header'>
      <div className='text'>Login</div>
        <div className='underline'></div>        
    </div>
  
  <div className='inputs'>
          <div className='input'>
            <img src ={"/person.png"} alt=""></img>
            <input type='name' placeholder='Username...' class="form-control" onChange={(event)=>setName(event.target.value)} required></input>
          </div>
          <div className='input'>
            <img src ={"/email.png"} alt=""></img>
            <input type='email' placeholder='Email...' class="form-control" onChange={(event)=>setEmail(event.target.value)} required></input>
          </div>
          <div className='input'>
            <img src ={"/password.png"} alt=""></img>
            <input type='password' placeholder='Password...' class="form-control"  onChange={(event)=>setPassword(event.target.value)} required></input>
          </div>
  </div>
  <div className='submit-container'>
    <div className='submit' onClick={Submit}>Login</div>
    <div className = "forgot_n_singup" >
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
