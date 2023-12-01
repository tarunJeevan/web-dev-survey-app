import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import "../Logout/Logout.css";
import { signInWithPopup, OAuthProvider } from 'firebase/auth';
import { auth } from '../../Utils/firebase';

export const Logout = () => {

    return (
        <div className="logout_container">
            <div className="Logout internal">
                <div className='logout'>
                    <h3>Logout</h3>
                </div>
                <div className='profile'>
                    <h3>Profile</h3>
                </div>
            </div>
        </div>
      )
}