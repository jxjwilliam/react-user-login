import React, {Component} from 'react';
import {connect} from 'react-redux'
import {FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import {signupAction} from '../actions'

class Signup extends Component {
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
    this.props.signupAction(this.state);
  }


  render() {
    return (
      <div className="signup">
        <h1>Sign Up</h1>
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
          >Sign Up !</Button>
        </form>
      </div>
    )
  }
}

export default connect(
  state => ({signup: state.signup}),
  {signupAction}
)(Signup)

