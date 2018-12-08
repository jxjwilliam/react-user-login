import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {Home, Navigator, Footer, NotFound} from './components'

const UserLoginRouters = () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/users" component={Users}/>
        <Route path="/users/:id" render={props => {
            const {loggedIn, ...rest} = props;
            return (
                loggedIn ? <Users {...rest} /> : <Redirect to="/"/>
            )
        }}
        />
    </Switch>
)


class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Navigator />
                    <UserLoginRouters/>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

export default App;
