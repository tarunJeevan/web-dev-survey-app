import React, { useState, useEffect, useContext } from 'react'
import { Logout } from '../Logout/Logout';
import { Link } from "react-router-dom";
import "../Header/Header.css"
import pfw_logo from "../../build/pfw_logo.png"
import icon from "../../build/person.png"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { UserContext } from '../../App';
import { Login } from '../Login/Login';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
//import logo from "../../../public/pfw_logo.png"


export const Header = (props) => {

  const { username } = useContext(UserContext);

  // useEffect(()=>{
  //   const storedUsername = localStorage.getItem('username');
  //   if (storedUsername) {
  //     setusername(storedUsername);
  //   }
  // },[localStorage.getItem('username')])

  const[user, setUser] = useState(null);
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    console.log("Changed");
    if (user) {
    setUser(user);
    } 
    else {
    setUser(null);
    }
  });
  }, [])

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
  return(
  <Navbar expand="lg" className="bg-body-tertiary">
  <Container>
  <Navbar.Brand href="/">
            <img
              src={pfw_logo}
            
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
      </Nav>
      <Nav>
      {user? <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {user.displayName}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href='/login' onClick={logout}>Logout</Dropdown.Item>
        <Dropdown.Item href='/dashboard'>Dashboard</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>: <></>}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>)


  return (
    <header className="Header_container">
      <div className='header_img'>
        <div className='one'>
          <a href={props.loggedin ? "/dashboard" : ""}><img src={pfw_logo} alt="" /></a>
        </div>
        {user? <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href='/login' onClick={logout}>Logout</Dropdown.Item>
        <Dropdown.Item href='/dashboard'>Dashboard</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>: <></>}
        {/* {user?        <div className='profile_container' style={{display: props.loggedin ? "":"none"}}>
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
        </div> : <></>} */}
      </div>
      <div className='border'></div>
    </header>
  )
}