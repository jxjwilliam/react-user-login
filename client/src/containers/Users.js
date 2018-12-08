import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadingDefer, displayReduxData, isEmpty} from '../utils'

class Users extends Component {
    state = {step: null}

    componentDidMount() {
        loadingDefer(1000).then(() => this.props.S01Action);
    }

    handleStep(router) {
        return e => {
            this.setState({step: router});
            e.preventDefault()
        }
    }

    render() {
        if (this.state.step) {
            return <Redirect to={this.state.step}/>
        }
        return (
            <>
            {isEmpty(this.props["S01"]) ? <div className="loader"/> : <LoginForm /> }
            {window.displayDebugInfo && displayReduxData([this.props.S01, this.props.loggedIn])}
            </>
        )
    }
}

export default connect(
    state => ({S01: state.S01, loggedIn: state.loggedIn}),
    {S01Action}
)(Users)