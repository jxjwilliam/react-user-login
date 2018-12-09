import React from 'react';
import {NavLink} from 'react-router-dom'

const Navigator = () => (
  <ul className="navbar-nav mr-auto">
    <li className="nav-item">
      <NavLink exact activeStyle={{color: 'green'}} to="/login">Login</NavLink>
    </li>
    <li className="nav-item">
      <NavLink exact activeStyle={{color: 'green'}} to="/signup">Sign Up</NavLink>
    </li>
    <li className="nav-item">
      <NavLink exact activeStyle={{color: 'green'}} to="/logout">Logout</NavLink>
    </li>
  </ul>
);

export default Navigator
