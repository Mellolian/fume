import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Search from './Search'
import './App.css'


export default function CustomNavbar(props) {
    return (<Navbar className='navbar'>
<h1>fume.</h1>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
     </Nav>
     <div className="search">
<Search props={props} handleInputChange={props.handleInputChange}/></div>
    </Navbar.Collapse>
  </Navbar>)
}