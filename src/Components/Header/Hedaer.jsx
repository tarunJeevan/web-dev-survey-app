import React from 'react'
import "../Header/Header.css"

export const Hedaer = () => {
  return (
    <header className="Header_container">
        <div className='header_img'>
            <div className='one'>
            <img src="pfw_logo.png" alt="" />
            </div>
            <div className='two'>
            <img className='person_header' src="person.png" alt='' />
            </div>
        </div>
        <div className='border'>
        </div>
    </header>
  )
}
