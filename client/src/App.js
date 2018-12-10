import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {Header, Footer, Navigator} from './components'
import UL from './containers'
import './App.css'

const UserLoginRouters = () => (
  <Switch>
    <Route exact path="/" component={UL.List}/>
    <Route path="/login" component={UL.Login}/>
    <Route path="/signup" component={UL.Signup}/>
    <Route path="/list" component={UL.List}/>
    <Route path="/users/:email" exact strict component={UL.Users}/>
    <Route path="/users" component={UL.List}/>
    <Route path="/logout" component={UL.Logout}/>
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
