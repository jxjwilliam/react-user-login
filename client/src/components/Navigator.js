import React from 'react';
import {NavLink} from 'react-router-dom'

const Navigator = () => (
  <React.Fragment>
    <div style={{float:"right", marginRight:"30px"}}>
      <NavLink exact activeStyle={{color: 'green'}} to="/login">Login</NavLink>{" | "}
      <NavLink exact activeStyle={{color: 'green'}} to="/signup">Sign Up</NavLink>{" | "}
      <NavLink exact activeStyle={{color: 'green'}} to="/logout">Logout</NavLink>
    </div>
  </React.Fragment>
);

export default Navigator
