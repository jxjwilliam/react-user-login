import React, {Component} from 'react';
import {Header, Footer, Navigator} from './components'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Login from './containers/Login'
import Users from './containers/Users'
import './App.css'

const UserLoginRouters = () => (
  <Switch>
    <Route exact path="/" component={Login}/>
    <Route path="/login" component={Login}/>
    <Route path="/users" component={Users}/>
    <Route path="/users/:id" render={props => {
      const {loggedIn, ...rest} = props;
      return (
        loggedIn ? <Users {...rest} /> : <Redirect to="/"/>
      )
    }}
    />
    <Route render={() => {
      return <Redirect to="/"/>
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
