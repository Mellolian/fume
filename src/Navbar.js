import React from "react";
import Search from "./Search";
import "./App.css";

export default function CustomNavbar(props) {
  return (
    <nav className="Navbar">
      <span id="desktop">fume.</span>
      <h1 id="mobile">f.</h1>

      <div className="search">
        <Search props={props} handleInputChange={props.handleInputChange} />
      </div>
    </nav>
  );
}
