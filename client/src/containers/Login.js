import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import {loginAction} from '../actions'
import jwt_decode from 'jwt-decode'

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
    let formData = new FormData();
    this.props.loginAction(this.state)
      .then(data => {
        const token = data.payload;
        if (token) {
          let decoded = jwt_decode(token)
          console.info(decoded)
          this.setState({email: decoded.email})
          sessionStorage.setItem("userLoginToken", token)
        }
      })
  }

  render() {
    if (this.props.login.loggedIn && this.state.email) {
      return <Redirect to={`/signup`}/>
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

