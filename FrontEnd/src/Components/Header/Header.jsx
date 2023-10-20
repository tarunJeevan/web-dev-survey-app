import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import "../Header/Header.css"

export const Header = () => {

  const win = window.sessionStorage;
  const name = win.getItem('name')

  return (
    <header className="Header_container">
        <div className='header_img'>
            <div className='one'>
            <img src="pfw_logo.png" alt="" />
            </div>
            <div className='profile_container'>
            <div className='two'>
            <a href='/profile'><img className='person_header' src="person.png" alt='' /></a>
            </div>
            <div className='name_profile'>
            <p>{name}</p>
            </div>
            </div>
        </div>
        <div className='border'>
        </div>
    </header>
  )
}
