// react modules
import { BrowserRouter as Router, Route, Switch }   from 'react-router-dom';
import React, { Component }                         from 'react';
// aws modules
import { withAuthenticator } from 'aws-amplify-react'
// pages
import Search from './pages/Search.js'
import Settings from './pages/Settings.js'
import Profile from './pages/Profile.js'
import Test from './pages/Test.js'
import Notifications from './pages/Notifications.js'
import OtherProfile from './pages/OtherProfile.js'
// style sheet
import './App.css';

window.LOG_LEVEL = 'DEBUG';

class App extends Component {

    render() {

        return (

            <Router>
                <Switch>
                    <Route
                        exact path="/"
                        component = { Profile }
                    />
                    <Route
                        path="/settings"
                        component = { Settings }
                    />
                    <Route
                        path="/search"
                        component = { Search }
                    />
                    <Route
                        path="/testing"
                        component = { Test }
                    />
                    <Route
                        path="/notifications"
                        component = { Notifications }
                    />
                    <Route path="/otherprofile/:id" component={ OtherProfile } />
                </Switch>
            </Router>
        );
    }
}

export default withAuthenticator( App )