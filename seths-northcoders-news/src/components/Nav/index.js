import React from "react";
import { Link } from "react-router-dom";

import { Navbar, NavItem, Button, Chip, Modal, Input } from "react-materialize";

const Nav = ({ loggedIn: { avatar_url, username }, toggleLogin }) => {
  return (
    <Navbar className="red accent-4" left>
      <Link to="/">
        <NavItem>PERUSE</NavItem>
      </Link>
      <Link to="/post">
        <NavItem>POST</NavItem>
      </Link>
      <Link to="/people">
        <NavItem>PEOPLE</NavItem>
      </Link>

      {username === "guest" ? (
        <Modal
          trigger={
            <li className="right">
              <Chip>
                <img src={avatar_url} alt="Avatar" />LOGIN
              </Chip>
            </li>
          }
        >
          <form onSubmit={toggleLogin}>
            <Input s={2} label="Username" type="textarea" id="username" />
            <Button type="submit">LOGIN</Button>
          </form>
        </Modal>
      ) : (
        <li onClick={toggleLogin} className="right">
          <Chip>
            <img src={avatar_url} alt="Avatar" />LOGOUT
          </Chip>
        </li>
      )}
    </Navbar>
  );
};

export default Nav;
