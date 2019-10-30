// react modules
import React, { Component, } from 'react';
import { Button, Jumbotron, Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
// aws modules
import { Auth } from 'aws-amplify';

import DBOps from '../DBOps.js'
import Postwrite from '../components/Postwrite.js'

class Navbar extends Component {

	constructor(props){
		// props and states
    	super(props);
    	// bind functions
	  //  this.displayUserAttributes 	=	this.displayUserAttributes	.bind(this);
	    this.deleteUser				=	this.deleteUser.bind(this);
  	}

  	// async displayUserAttributes(){
  	// 	// get user info and log it
  	// 	var user = await Auth.currentAuthenticatedUser({ bypassCache: true });
  	// 	console.log(user.attributes);
  	// }

  	async deleteUser(){

        var username = Auth.currentAuthenticatedUser().username;

  		Auth
            .currentAuthenticatedUser()
            .then((user: CognitoUser) => new Promise((resolve, reject) => {
                user.deleteUser(error => {
                    if (error) {
                        return reject(error);
                    }
                    if (this.props.onSessionChange) {
                        this.props.onSessionChange();
                    }
                    document.location.href = "/login";
                    new DBOps().deleteUser(username);
                    resolve();
                });
            }))
            .catch(this.onError);
  	}

	render() {

    	return(
				<div>
	    		<Jumbotron>
	    			<h2>Navbar</h2>
	    			<Link
	    				to= '/'
	    				paddingTop="50px">
		  				<Button
		  					variant="secondary"
		  					size="md"
		  					block>
		    				Profile
		  				</Button>
	    			</Link>
	    			<Link
	    				to= '/settings'
	    				paddingTop="50px">
		  				<Button
		  					variant="secondary"
		  					size="md"
		  					block>
		    				Settings
		  				</Button>
	  				</Link>
	          <Link
	            to= '/'
	            paddingTop="50px">
	            <Button
	              variant="secondary"
	              size="md"
	              onClick={(e) => Auth.signOut()}
	              block>
	              Log Out
	            </Button>
	          </Link>
	  				<Button
	  					variant="secondary"
	  					size="md"
	  					onClick ={this.deleteUser}
	  					block>
	    				Delete User
	  				</Button>
	    		</Jumbotron>
					<Postwrite username={this.props.username}></Postwrite>
				</div>
    	);
  	}
}

export default Navbar;
