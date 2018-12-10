import React from 'react';
import {NavLink} from 'react-router-dom'

const Navigator = () => (
  <React.Fragment>
    <div style={{float: "right", marginRight: "30px"}}>
      <NavLink exact activeStyle={{color: 'green'}} to="/login">Login
        <i className="fa fa-user"></i>
      </NavLink>{" | "}
      <NavLink exact activeStyle={{color: 'green'}} to="/signup">SignUp
        <i className="fa fa-sign-in"></i>
      </NavLink>{" | "}
      <NavLink exact activeStyle={{color: 'green'}} to="/logout">Logout
        <i className="fa fa-sign-out"></i>
      </NavLink>
    </div>
  </React.Fragment>
);

export default Navigator
