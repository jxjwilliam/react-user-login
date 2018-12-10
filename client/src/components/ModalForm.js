import React from 'react'
import { Modal, Button } from "react-bootstrap";
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

const EditModal = ({show, close, onUpdate, user}) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <EditForm onSubmit={onUpdate} user={user}/>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={close}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

const beforeSubmit = (values) => {
  console.log(values);
};
//<Field component={(props)=><input type="text" placeholder="Last Name" value={props.user.lastName} onChange={()=>{}} .../>
const renderField = ({input, label}) => {
  return (
    <div>
      <label>{label}</label>

      <div>
        <input type="text" {...input} placeholder={label} />
      </div>
    </div>
  )
};
/**
 * handleSubmit(values => { this.props.onSubmit({...values, myField: event.target.value});})();add parentheses here
 * <form onSubmit={handleSubmit(beforeSubmit)}>
 */
let EditForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const user = props.user || {};
  return (
    <div className="row well" style={{marginTop:20}}>
      <form onSubmit={ handleSubmit }>
        <div>
          <Field name="firstName" label="First Name" component={renderField} onChange={()=>{}}/>
          <Field name="lastName"  label="Last Name" component={renderField} onChange={()=>{}}/>
          <Field name="email" label="Email" component={renderField} onChange={()=>{}}/>
          <Field name="role" label="Phone" component={renderField} onChange={()=>{}}/>
          <Field name="location" label="Date of Birth" component={renderField} onChange={()=>{}}/>
          <Field name="comment" user={user} component={props=><input type="hidden" name="id" value={user._id} />}/>
        </div>
        <div>
          <button type="submit" className="btn btn-primary" disabled={submitting}>Update</button>
          <button type="button" className="btn btn-warning" disabled={pristine || submitting} onClick={reset}>Clear
            Values
          </button>
        </div>
      </form>
    </div>
  )
};

function mapStateToProps(state, ownProps) {
  return {
    initialValues: ownProps.user
  }
}

EditForm = reduxForm({
  form: 'editForm'  // a unique identifier for this form
})(EditForm)

//state => ({initialValues: state.userList[0]})
EditForm = connect(mapStateToProps)(EditForm);

export default EditModal;
