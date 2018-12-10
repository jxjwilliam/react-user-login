import React, {Component} from 'react';
import {connect} from 'react-redux'
import {FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import {signupAction} from '../actions'
import {displayInfo} from '../utils'
import {Link} from 'react-router-dom'

const SignupInfo = {
  success: [
    'Welcome ',
    <p>Go to <Link to="/login">Login <i className="fa fa-user"></i></Link> to start!</p>
  ],
  fail: [
    'NOT Successful, Already Exist ',
    <p>Try again or Go back to <Link to="/login">Login <i className="fa fa-user"></i></Link></p>
  ]
}

const AfterSignup = ({email, ok}) => {
  var h3, p;
  if (ok) {
    h3 = <h3>{SignupInfo['success'][0]}{email}.</h3>;
    p = SignupInfo['success'][1]
  } else {
    h3 = <h3>{SignupInfo['fail'][0]}{email}.</h3>
    p = SignupInfo['fail'][1]
  }
  return displayInfo(h3, p)
}

//done: 0-not submit, 1-submit success, 2-submit failure
class Signup extends Component {
  state = {
    email: '',
    password: '',
    done: 0
  }

  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0 && !this.state.done;
  }

  handleChange = e => {
    this.setState({[e.target.id]: e.target.value});
    if (this.state.done) {
      this.setState({done: 0})
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.signupAction(this.state)
      .then(() => {
        if (this.props.signup.success) {
          this.setState({done: 1});
          // after submit, the submit button should be disabled till the input field changes.
        }
        else {
          this.setState({done: 2})
        }
      });
  }

  render() {
    const {email, done} = this.state;
    return (
      <div className="signup">
        <h1>Sign Up <i className="fa fa-sign-in"></i></h1>
        {!!done && <AfterSignup email={email} ok={done === 1 ? true : false}/>}
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              placeholder="Email"
              value={email}
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
          >SignUp <i className="fa fa-sign-in"></i></Button>
        </form>
      </div>
    )
  }
}

export default connect(
  state => ({signup: state.signup}),
  {signupAction}
)(Signup)

