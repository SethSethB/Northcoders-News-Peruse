import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavItem } from "react-materialize";

const Nav = ({ loggedIn }) => {
  return (
    <Navbar left>
      <NavItem Link="/">PERUSE</NavItem>
      <NavItem href="/post">POST</NavItem>
      <NavItem href="/people">PEOPLE</NavItem>
    </Navbar>
  );
};

export default Nav;

// <div>
//   <Link to="/">
//     <h1>PERUSE</h1>
//   </Link>
//   <Link to="/post">
//     <h1>POST</h1>
//   </Link>
//   <Link to="/people">
//     <h1>PEOPLE</h1>
//   </Link>
// </div>
