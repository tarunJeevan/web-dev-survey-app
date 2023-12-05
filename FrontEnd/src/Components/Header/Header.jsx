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

        {user? <Nav.Link href="/dashboard">Dashboard</Nav.Link> : <></> }
        
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

}