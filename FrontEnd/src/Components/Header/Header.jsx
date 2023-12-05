import React, { useState, useEffect, useContext } from 'react'
import { Logout } from '../Logout/Logout';
import { Link } from "react-router-dom";
import "../Header/Header.css"
import pfw_logo from "../../build/pfw_logo.png"
import icon from "../../build/person.png"
import { getAuth, signOut } from "firebase/auth";
import { UserContext } from '../../App';


export const Header = (props) => {

  const { username } = useContext(UserContext);

  // useEffect(()=>{
  //   const storedUsername = localStorage.getItem('username');
  //   if (storedUsername) {
  //     setusername(storedUsername);
  //   }
  // },[localStorage.getItem('username')])

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const logout = () => {
    const auth = getAuth();
      signOut(auth).then(() => {
      }).catch((error) => {
        console.log("Sign-out issue firebase");
      })
    localStorage.clear();
  }


  return (
    <header className="Header_container">
      <div className='header_img'>
        <div className='one'>
          <a href={props.loggedin ? "/dashboard" : ""}><img src={pfw_logo} alt="" /></a>
        </div>
        <div className='profile_container' style={{display: props.loggedin ? "":"none"}}>
          <div className='two'>
            <div onClick={toggleMenu}><img className='person_header' src={icon} alt='' /></div>
          </div>
          <div className='name_profile'>
            <p onClick={toggleMenu}>{username}</p>
          </div>
          {isMenuOpen && (
            <div className="logout_container" onBlur={closeMenu} tabIndex="0">
              <div className='logout'>
                <a href='/login' onClick={logout}><h3>Logout</h3></a>
              </div>
              <div className='profile'>
                <a href='/dashboard'><h3>Profile</h3></a>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='border'></div>
    </header>
  )
}