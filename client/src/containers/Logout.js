import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Logout = props => {
  try {
    props.login.token = ''
    props.login.email = ''
    props.login.loggedIn = false
    sessionStorage.removeItem("userLoginToken")
  } catch (e) {}

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h3 className="display-4">Logout Successful.</h3>
        <p>Return
          {" "}<Link to="/login">Login Page</Link> to re-login, or:
          {" "}<Link to="/signup">Signup Page</Link> to create New Login User.
        </p>
      </div>
    </div>
  )
}

export default connect(
  state => ({login: state.login})
)(Logout)

