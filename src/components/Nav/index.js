import React from "react";
import { NavLink } from "react-router-dom";

import { Navbar, Button, Chip, Modal } from "react-materialize";

const Nav = ({ loggedIn: { avatar_url, username }, toggleLogin }) => {
  return (
    <Navbar className="amber lighten-1 " left>
      <li>
        <NavLink className="no-hover" to="/peruse/ALL">
          <p>PERUSE</p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/post">
          <p>POST</p>
        </NavLink>
      </li>
      <li>
        <NavLink to={`/people/${username}`}>
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
            <div className="selector">
              <label>CHOOSE USER</label>
              <select className="browser-default" id="username">
                <option value="cooljmessy">cooljmessy</option>
                <option value="grumpy19">grumpy19</option>
                <option value="happyamy2016">happyamy2016</option>
                <option value="jessjelly">jessjelly</option>
                <option value="tickle122">tickle122</option>
                <option value="weegembump">weegembump</option>
              </select>
            </div>

            <Button className="amber lighten-1 black-text login" type="submit">
              LOGIN
            </Button>
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
