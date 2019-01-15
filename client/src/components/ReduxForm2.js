import React, {Fragment} from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

const Checkbox = props => (
  <div className="checkbox">
    <input
      {...props.input}
      type="checkbox"
      checked={props.input.value}
    />
    <label>{props.label}</label>
  </div>
)

const Radio = props => {
  if (props && props.input && props.options) {
    const renderRadioButtons = (key, index) => {
      return (
        <label key={`${index}`} htmlFor={`${props.input.name}-${index}`}>
          <Field
            id={`${props.input.name}-${index}`}
            component="input"
            name={props.input.name}
            type="radio"
            value={key}
          />
          {key}
        </label>
      )
    };
    return (
      <div className="radio">
        <label>
          {props.label}
        </label>
        <div>
          {props.options &&
          props.options.map(renderRadioButtons)}
        </div>
      </div>
    );
  }
  return <Fragment></Fragment>
}


const Select = props => {
  const renderSelectOptions = (key, index) => {
    return (
      <option
        key={`${index}-${key}`}
        value={key}
      >
        {props.options[key]}
      </option>
    )
  }

  if (props && props.options) {
    return (
      <div>
        <label>{props.label}</label>
        <select {...props.input}>
          <option value="">-- location --</option>
          {Object.keys(props.options).map(renderSelectOptions)}
        </select>
      </div>
    )
  }
  return <Fragment></Fragment>
}

const validate = values => {
  const errors = {}
  //TODO:
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}


const renderField = props => {
  const {input, label, type, meta:{touched, error}} = props;
  return (
    <div className="input-row">
      <label>{label}</label>
      <div>
        <input
          {...input}
          placeholder={label}
          type={type}
        />
        {touched &&
        ((error && <span>{error}</span>))}
      </div>
    </div>
  )
}

/* Development Team, Support_Group, Admin */
const ReduxForm = (props) => {
  const {handleSubmit, user, pristine, reset, submitting} = props;
  return (
    <div className="row" style={{marginTop: 40, paddingLeft: 40}}>
      <form onSubmit={handleSubmit}>

        <Field
          name="firstName"
          component={renderField}
          value={user.firstName}
          type="text"
          label="First Name"
        />

        <Field
          name="lastName"
          component={renderField}
          value={user.lastName}
          type="text"
          label="Last Name"
        />

        <Field
          name="email"
          component={renderField}
          value={user.email}
          type="email"
          label="Email"
        />

        <Field
          name="password"
          component={renderField}
          value={user.password}
          type="password"
          label="Password"
        />

        <Field
          name="team"
          component={Checkbox}
          label="Team"
        />

        <Field
          name="role"
          component={Radio}
          label="Role"
          options={[
            'Scrum Master',
            'Project Manager',
            'Business Analyst'
          ]}
        />

        <Field
          name="location"
          component={Select}
          label="Location"
          options={{
            HK: 'HK',
            GZ: 'GZ',
            XA: 'XA',
            Other: 'Other'
          }}
        />

        <div>
          <label htmlFor="comment">Comment</label>
          <div>
            <Field
              name="comment"
              component="textarea"
              value={user.comment}
            />
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Update</button>
          <button type="button" className="btn btn-warning" disabled={pristine || submitting} onClick={reset}>Clear
            Values
          </button>
        </div>

      </form>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({initialValues: ownProps.user})

export default connect(mapStateToProps)(reduxForm({
  form: 'user-login-form',
  validate
})(ReduxForm))
