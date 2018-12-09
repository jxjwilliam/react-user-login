import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import {loginAction} from '../actions'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = e => {
    this.setState({[e.target.id]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.loginAction(this.state)
      .then(data => {
        const token = this.props.login.token;
        if (token) {
          sessionStorage.setItem("userLoginToken", token)
        }
      })
  }

  render() {
    const {email, loggedIn} = this.props.login;
    if (loggedIn && email) {
      return <Redirect to={`/users/${email}`}/>
      //return <Users {...this.props.login} email={this.state.email}/>
    }
    return (
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}/>
          </FormGroup>

          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}/>
          </FormGroup>

          <Button
            block
            type="submit"
            disabled={!this.validateForm()}
            bsSize="large"
            bsStyle="danger"
          >Login</Button>
        </form>
      </div>
    )
  }
}

export default connect(
  state => ({login: state.login}),
  {loginAction}
)(Login)

