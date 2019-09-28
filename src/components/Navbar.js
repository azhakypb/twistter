import React, { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { Auth } from 'aws-amplify'

class Navbar extends Component {
  render() {

  	function logOut(e) {
  		Auth.signOut()
  	}

    return(
    	<Jumbotron>
    		<h2>Navbar</h2>
    		<Button variant="secondary" size="md" block>
    			My Profile
  			</Button>
  			<Button variant="secondary" size="md" block>
    			Settings
  			</Button>
  			<Button variant="secondary" size="md" onClick ={logOut} block>
    			Log Out
  			</Button>
    	</Jumbotron>
    );
  }
}

export default Navbar;