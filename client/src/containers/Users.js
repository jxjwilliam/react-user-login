import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {FormGroup, FormControl, ControlLabel, Checkbox, Radio, Button, HelpBlock} from 'react-bootstrap'
import {getUserAction, updateUserAction} from '../actions'
import {loadingDefer, isEmpty} from '../utils'

const FieldGroup = ({id, label, help, ...props}) => (
  <FormGroup controlId={id}>
    <ControlLabel >{label}:</ControlLabel>
    <FormControl {...props} />
    {help && <HelpBlock>{help}</HelpBlock>}
  </FormGroup>
);


class Users extends Component {
  state = {
    firstName: '',
    lastName: '',
    team: [],
    role: '',
    location: '',
    comment: '',
    step: null
  }

  componentDidMount() {
    const {loggedIn, token} = this.props.login;
    const {email} = this.props.match.params || this.props.email;
    if (loggedIn) {
      loadingDefer(1000)
        .then(() => this.props.getUserAction(email, token))
        .then(() => {
          this.setState((state, ownProps) => {
            if (!isEmpty(ownProps.user)) {
              return {
                firstName: ownProps.user['firstName'],
                lastName: ownProps.user['lastName'],
                team: ownProps.user['team'],
                role: ownProps.user['role'],
                location: ownProps.user['location'],
                comment: ownProps.user['comment'],
              }
            }
          });
        })
    }
    else {
      this.setState({step: "login"})
    }
  }

  validateForm = () => {
    return this.state.firstName.length > 0 && this.state.lastName.length > 0;
  }

  handleChange = e => {
    if (e.target.type === 'radio') {
      e.target.checked && this.setState({'role': e.target.id})
    }
    else if (e.target.type === 'checkbox') {
      e.target.checked && this.setState({'team': [...this.state.team, e.target.id]})
    }
    else {
      this.setState({[e.target.id]: e.target.value})
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const {loggedIn, token, email} = this.props.login;
    if (loggedIn) {
      const {step, ...rest} = this.state;
      const formData = {...rest, email}
      this.props.updateUserAction(formData, token)
    }
    else {
      this.setState({step: "login"})
    }
  }

  render() {
    if (this.state.step) {
      return <Redirect to={`/${this.state.step}`}/>
    }
    let email = '';
    try {
      email = this.props.login.email
    } catch(e) {}
    return (
      <div className="user">
        <h3><u>{email}</u> Preview & Edit</h3>
        <form onSubmit={this.handleSubmit}>
          <FieldGroup
            id="firstName"
            type="text"
            label="First Name"
            placeholder="First Name"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <FieldGroup
            id="lastName"
            type="text"
            label="Last Name"
            placeholder="Last Name"
            value={this.state.lastName}
            onChange={this.handleChange}
          />

          <FormGroup id="team" bsSize="large" style={{margin: '15px'}}>
            <ControlLabel>Team:</ControlLabel>
            {['Development Team', 'Support Group', 'Admin'].map(t => (
              <Checkbox inline key={t} id={t} onChange={this.handleChange}>{t}</Checkbox>
            ))}
          </FormGroup>

          <FormGroup id="role" bsSize="large">
            <ControlLabel>Role:</ControlLabel>
            {['Scrum Master', 'Project Manager', 'Business Analyst'].map(r => (
              <Radio name="radioGroup" inline id={r} key={r} onChange={this.handleChange}>{r}</Radio>
            ))}
          </FormGroup>

          <FormGroup controlId="location" bsSize="large">
            <ControlLabel>Location:</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              value={this.state.location}
              onChange={this.handleChange}
            >
              <option value="select">-- location --</option>
              {['HK', 'GZ', 'XA', 'Other'].map(l => (
                <option value={l} key={l}>{l}</option>
              ))}
            </FormControl>
          </FormGroup>

          <FormGroup controlId="comment" bsSize="large">
            <ControlLabel>Comment:</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="User Comment & Notes"
              value={this.state.comment}
              onChange={this.handleChange}
            />
          </FormGroup>

          <Button
            block
            type="submit"
            disabled={!this.validateForm()}
            bsSize="large"
            bsStyle="danger">
            Edit User {email}
          </Button>
        </form>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, login: state.login}),
  {getUserAction, updateUserAction}
)(Users)