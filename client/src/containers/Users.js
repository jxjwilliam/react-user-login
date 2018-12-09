import React, {Component} from 'react'
import {connect} from 'react-redux'
import {FormGroup, FormControl, ControlLabel, Checkbox, Radio, Button, HelpBlock} from 'react-bootstrap'
import {loadingDefer, isEmpty} from '../utils'

const FieldGroup = ({id, label, help, ...props}) => (
  <FormGroup controlId={id}>
    <ControlLabel >{label}</ControlLabel>
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
    comment: ''
  }

  componentDidMount() {
    loadingDefer(1000).then(() => this.props.S01Action);
  }

  validateForm = () => {
    return this.state.firstName.length > 0 && this.state.lastName.length > 0;
  }

  handleChange = e => {
    if (e.target.type === 'radio') {
      console.log(e.target.name, e.target.checked)
    }
    if (e.target.type === 'checkbox') {
      console.log(e.target.name, e.target.checked)
    }
    this.setState({[e.target.id]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state)
    let formData = new FormData();
  }

  render() {
    return (
      <div className="user">
        <h1>User Preview & Edit</h1>
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
            {['Development Team', 'Support Group', 'Admin'].map(t => (
              <Checkbox inline key={t} id={t} onChange={this.handleChange}>{t}</Checkbox>
            ))}
          </FormGroup>

          <FormGroup id="role" bsSize="large">
            {['Scrum Master', 'Project Manager', 'Business Analyst'].map(r => (
              <Radio name="radioGroup" inline id={r} key={r} onChange={this.handleChange}>{r}</Radio>
            ))}
          </FormGroup>

          <FormGroup controlId="location" bsSize="large">
            <ControlLabel>Location</ControlLabel>
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
            <ControlLabel>Comment</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="User Comment & Notes"
              value={this.state.comment}
              onChange={this.handleChange}
            />
          </FormGroup>

          <Button type="submit" bsStyle="danger">Submit</Button>
        </form>
      </div>
    )
  }
}

export default connect(
  state => ({S01: state.S01, loggedIn: state.loggedIn})
)(Users)