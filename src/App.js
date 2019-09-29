// react modules
import { BrowserRouter as Router, Route, Switch }   from 'react-router-dom';
import React, { Component }                         from 'react';
// aws modules
import { withAuthenticator } from 'aws-amplify-react'
import { Auth } from 'aws-amplify';
// pages
import Settings from './pages/Settings.js'
import Profile from './pages/Profile.js'
// style sheet
import './App.css';

class App extends Component {

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
