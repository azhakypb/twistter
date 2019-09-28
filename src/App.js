<<<<<<< HEAD
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


export default App;
=======
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
>>>>>>> 83939d226c584afcab11261c7abb7af550b03ad4
