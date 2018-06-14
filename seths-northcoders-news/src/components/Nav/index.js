import React from "react";

import { Navbar, NavItem, Button, Chip, Modal, Input } from "react-materialize";

const Nav = ({ loggedIn: { avatar_url, username }, toggleLogin }) => {
  return (
    <Navbar className="red accent-4" left>
      <NavItem href="/">PERUSE</NavItem>
      <NavItem href="/post">POST</NavItem>
      <NavItem href="/people">PEOPLE</NavItem>

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

      {/* <li className="right" onClick={toggleLogin}>
        {username === "guest" ? (
          <Chip>
            <img src={avatar_url} alt="Avatar" />LOGIN
          </Chip>
        ) : (
          <Chip>
            <img src={avatar_url} alt="Avatar" />LOGOUT
          </Chip>
        )}
      </li> */}
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
