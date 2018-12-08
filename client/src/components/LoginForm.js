import React, {Component} from 'react';
import {Form, FormGroup, Col, FormControl, ControlLabel, Button} from 'react-bootstrap'

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  }

  render() {
    const {handleChange, handleSubmit} = this.props;
    return (
      <Form horizontal onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email"
                         id="email"
                         placeholder="Email"
                         defaultValue={this.state.email}
                         onChange={handleChange}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="password">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl type="password"
                         id="password"
                         placeholder="Password"
                         defaultValue={this.state.password}
                         onChange={handleChange}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" bsStyle="danger">Login</Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

export default LoginForm;