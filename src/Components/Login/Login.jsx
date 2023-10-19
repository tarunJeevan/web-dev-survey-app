import React from 'react'
import "../Login/Login.css"


export const Login = () => {

  return (
    <div className='container'>
    <div className='header'>
      <div className='text'>Login</div>
        <div className='underline'></div>        
    </div>
  
  <div className='inputs'>
          <div className='input'>
            <img src ={"/person.png"} alt=""></img>
            <input type='name' placeholder='Username...' class="form-control" required></input>
          </div>
          <div className='input'>
            <img src ={"/email.png"} alt=""></img>
            <input type='email' placeholder='Email...' class="form-control"  required></input>
          </div>
          <div className='input'>
            <img src ={"/password.png"} alt=""></img>
            <input type='password' placeholder='Password...' class="form-control" required></input>
          </div>
  </div>
  <div className='submit-container'>
    <div className='submit'>Login</div>
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
