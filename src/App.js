// react modules
import { BrowserRouter as Router, Route, Switch }   from 'react-router-dom';
import React, { Component }                         from 'react';
// aws modules
import { withAuthenticator } from 'aws-amplify-react'
import { Auth } from 'aws-amplify';
import { UsernameContext } from './UsernameContext.js';
// pages
import Homepage from './pages/Homepage.js'
import Search from './pages/Search.js'
import Settings from './pages/Settings.js'
import Profile from './pages/Profile.js'
import Test from './pages/Test.js'
import Notifications from './pages/Notifications.js'
import OtherProfile from './pages/OtherProfile.js'
// style sheet
import './App.css';

//const user = Auth.currentAuthenticatedUser({ bypassCache: true});

class App extends Component {
	state = { username: '' };

	async getUser(){
		Auth.currentAuthenticatedUser({ bypassCache: true})
			.catch((err)=>{
				console.log('Error getting user', err);
			})
			.then((user)=>{
				this.setState({
					username: user.username
				});
				console.log('Context test:', user.username);
			});
  	}

    render() {
		if(this.state.username === ''){
			this.getUser();
		}
		return (
			<UsernameContext.Provider value={{username: this.state.username}}>
            	<Router>
                	<Switch>
						<Route
							exact path="/"
							component = { Homepage }
						/>
                    	<Route
                        	exact path="/profile"
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
			</UsernameContext.Provider>
        );
    }
}

export default withAuthenticator( App )
