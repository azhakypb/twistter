import React, { Component } from 'react';
import './App.css';

import Settings from './pages/Settings.js'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { withAuthenticator } from 'aws-amplify-react'

class App extends Component {
  async componentDidMount(){
  }
  render() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component = { Settings } />
            </Switch>
        </Router>
    );
  }
}

export default withAuthenticator( App );
