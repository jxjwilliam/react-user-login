import React, {Component} from 'react';
import {Header, Footer, Navigator} from './components'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Login from './containers/Login'
import Signup from './containers/Signup'
import Users from './containers/Users'
import './App.css'

const UserLoginRouters = () => (
  <Switch>
    <Route exact path="/" component={Login}/>
    <Route path="/login" component={Login}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/users/:email" render={props => {
      console.log('--william in app--', props);
      return (
        <Users {...props} />
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
          <Header/>
          <Navigator />
          <UserLoginRouters/>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
