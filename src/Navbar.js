import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Search from './Search'
import './App.css'
import { Button } from '@material-ui/core';
import Dropdown from './Dropdown'

export default function CustomNavbar(props) {  
    return (<Navbar className='navbar'>
<button name="1" onClick={props.setCurrentPage}>fume.</button>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-20">
     </Nav>
     <div className="search">
<Search props={props} handleInputChange={props.handleInputChange}/></div>
<Dropdown sortByPrice={props.sortByPrice}
          sortByName ={props.sortByName}
          sortByDiscount={props.sortByDiscount}/>
    </Navbar.Collapse>
  </Navbar>)
}