import React from "react";
import { NavLink } from "react-router-dom";

import { Navbar, Button, Chip, Modal, Input } from "react-materialize";

const Nav = ({ loggedIn: { avatar_url, username }, toggleLogin }) => {
  return (
    <Navbar className="red accent-4" left>
      <li>
        <NavLink className="no-hover" to="/">
          <p>PERUSE</p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/post">
          <p>POST</p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/people">
          <p>PEOPLE</p>
        </NavLink>
      </li>

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
            <Input s={3} type="select" label="USERNAME" id="username">
              <option value="cooljmessy">cooljmessy</option>
              <option value="grumpy19">grumpy19</option>
              <option value="happyamy2016">happyamy2016</option>
              <option value="jessjelly">jessjelly</option>
              <option value="tickle122">tickle122</option>
              <option value="weegembump">weegembump</option>
            </Input>

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
