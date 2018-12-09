import React from 'react';
import {Link} from 'react-router-dom'

const Navigator = () => (
  <ul className="navbar-nav mr-auto">
    <li className="nav-item">
      <Link className="nav-link" to="/login">Login</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/signup">Sign Up</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/users">Logout</Link>
    </li>
  </ul>
);

export default Navigator
