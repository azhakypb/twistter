import React, { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { Auth } from 'aws-amplify'

class Navbar extends Component {

	constructor(props){
    	super(props);

	    this.logOut        			=	this.logOut.bind(this);
	    this.displayUserAttributes 	=	this.displayUserAttributes.bind(this); 
  	}

  	logOut(){
  		Auth.signOut();
  	}

  	async displayUserAttributes(){

  		var user = await Auth.currentAuthenticatedUser({ bypassCache: true });
  		console.log(user.attributes);
  	}

	render() {

    return(
    	<Jumbotron>
    		<h2>Navbar</h2>
    		<Button variant="secondary" size="md" block>
    			My Profile
  			</Button>
  			<Button variant="secondary" size="md" block>
    			Settings
  			</Button>
  			<Button variant="secondary" size="md" onClick ={this.logOut} block>
    			Log Out
  			</Button>
  			<Button variant="secondary" size="md" onClick ={this.displayUserAttributes} block>
    			Display Attributes
  			</Button>
    	</Jumbotron>
    );
  }
}

export default Navbar;