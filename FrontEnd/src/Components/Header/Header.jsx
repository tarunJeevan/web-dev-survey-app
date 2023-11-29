import React, { useState, useEffect } from 'react'
import { Logout } from '../Logout/Logout';
import { useNavigate } from "react-router-dom";
import "../Header/Header.css"

export const Header = () => {

  const name = localStorage.getItem('username')
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="Header_container">
      <div className='header_img'>
        <div className='one'>
          <a href='/dashboard'><img src="pfw_logo.png" alt="" /></a>
        </div>
        <div className='profile_container'>
          <div className='two'>
            <div onClick={toggleMenu}><img className='person_header' src="person.png" alt='' /></div>
          </div>
              <div className='name_profile'>
                <p onClick={toggleMenu}>{name}</p>
              </div>  
            {isMenuOpen && (
              <div className="logout_container" onBlur={closeMenu} tabIndex="0">
                <div className='logout'>
                  <h3>Logout</h3>
                </div>
                <div className='profile'>
                  <h3>Profile</h3>
                </div>
              </div>
            )}
        </div>
      </div>
      <div className='border'>
      </div>
    </header>
  )
}
