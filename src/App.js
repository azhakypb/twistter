import React, { Component } from 'react';
import './App.css';

import Settings from './pages/Settings.js'
import Profile from './pages/Profile.js'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { withAuthenticator } from 'aws-amplify-react'

import { Auth } from 'aws-amplify';

class App extends Component {
  async componentDidMount(){
    console.log(window.location.hostname);
    var userInfo = Auth.currentUserInfo()
    console.log(userInfo);
  }
  render() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component = { Profile } />
                <Route path="/settings" component = { Settings } />
            </Switch>
        </Router>
    );
  }
}

export default withAuthenticator( App );
