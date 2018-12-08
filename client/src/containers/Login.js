import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import LoginForm from '../components/LoginForm'
import {displayReduxData, filterData} from '../utils'
import * as actions from '../actions'
import jwt_decode from 'jwt-decode'

class Login extends Component {
  state = {step: null}

  handleChange = e => {
    this.setState({[e.target.id]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    let formData = new FormData();
    this.props.loginAction(this.state)
      .then(data => {
        if (data.token) {
          let decoded = jwt_decode(data.token)
          console.info(decoded)
        }
        return data.token;
      })
      .then(token => sessionStorage.setItem("token", token))
  }

  render() {
    return (
      <Fragment>
        <LoginForm handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
      </Fragment>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
}

export default connect(
  state => ({S14: filterData(state, "S14")}),
  mapDispatchToProps
)(Login)

