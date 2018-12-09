import React, {Component} from 'react';
import {Header, Footer, Navigator} from './components'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Login from './containers/Login'
import Signup from './containers/Signup'
import Users from './containers/Users'
import Logout from './containers/Logout'
import './App.css'

const UserLoginRouters = () => (
  <Switch>
    <Route exact path="/" component={Login}/>
    <Route path="/login" component={Login}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/users/:email" exact strict component={Users}/>
    {/*<Route path="/users" component={Users}/>*/}
    <Route path="/logout" component={Logout}/>
    <Route render={({match}) => <Redirect to="/"/>}/>
  </Switch>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container">
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
