import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {displayReduxData, filterData} from '../utils'
import * as actions from '../actions'

class Login extends Component {
    state = {step: null}
    handleChange = e => {
        e.preventDefault()
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        let formData = new FormData();
        const {data} = this.state;
    }

    render() {
        return (
            <div className="container">

            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    let actions = bindActionCreators(
        actions, dispatch
    )
    return {...actions, dispatch}
}

export default connect(
    state = ({S14: filterData(state, "S14")}),
    dispatch => bindActionCreators({actions, dispatch}, dispatch)
)

