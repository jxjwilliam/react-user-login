import React from 'react';
import {connect} from 'react-redux'
import {displayInfo} from '../utils'
import {Link} from 'react-router-dom'

const Logout = props => {
  try {
    props.login.token = ''
    props.login.email = ''
    props.login.loggedIn = false
    sessionStorage.removeItem("userLoginToken")
  } catch (e) {
  }

  const h3 = <h3>Logout Successful.</h3>
  const p = <p>Return <Link to="/login">Login <i className="fa fa-user"></i></Link> to edit User, or <Link
    to="/signup">Signup <i className="fa fa-sign-in"></i></Link> to create New User.</p>;

  return (
    <div className="signout">
      <h1>Sign Out <i className="fa fa-sign-out"></i></h1>
      {displayInfo(h3, p)}
    </div>
  )
}

export default connect(
  state => ({login: state.login})
)(Logout)

