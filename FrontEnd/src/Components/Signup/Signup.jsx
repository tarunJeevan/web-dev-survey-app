import React from 'react'
import '../Signup/Signup.css'

export const Signup = () => {
  return (
    <div className='container'>
    <div className='header'>
      <div className='text'>Sign-up</div>
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
          <div className='input'>
            <img src ={"/password.png"} alt=""></img>
            <input type='password' placeholder='Re-Password...' class="form-control" required></input>
          </div>
  </div>
  <div className='submit-container'>
    <div className='submit'>Signup</div>
  </div>
  </div>
  )
}
