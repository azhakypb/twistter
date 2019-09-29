import React, { Component, } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';

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
    		<Link to= '/' paddingTop="50px">
	  			<Button variant="secondary" size="md" block>
	    			Profile
	  			</Button>
    		</Link>
    		<Link to= '/settings' paddingTop="50px">
	  			<Button variant="secondary" size="md" block>
	    			Settings
	  			</Button>
  			</Link>
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