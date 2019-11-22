// react modules
import React, { Component, } from 'react';
import { Button, Jumbotron, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// aws modules
import { Auth } from 'aws-amplify';

import DBOps from '../DBOps.js'
import { deleteUser } from '../DBOps.js'
import Postwrite from '../components/Postwrite.js'

class Navbar extends Component {

	constructor(props){
		// props and states
    	super(props);
		this.state = {
			show : false
		};
    	// bind functions
		//  this.displayUserAttributes 	=	this.displayUserAttributes	.bind(this);
	    this.deleteUser				=	this.deleteUser.bind(this);
		this.handleShow				= 	this.handleShow.bind(this);
		this.handleClose			= 	this.handleClose.bind(this);
  	}

  	// async displayUserAttributes(){
  	// 	// get user info and log it
  	// 	var user = await Auth.currentAuthenticatedUser({ bypassCache: true });
  	// 	console.log(user.attributes);
  	// }

	handleShow(){
		this.setState({
				show: true
			});
	}

	handleClose(){
		this.setState({
				show: false
			});
	}

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
                    deleteUser(username)
                    	.then((res)=>{
                    		console.log('navbar','delete user','success',res)
                    		document.location.href = "/login";
                    		resolve();
                    	},(err)=>{
                    		console.log('navbar','delete user','error',err)
                    		document.location.href = "/login";
                    		resolve();
                    	});
                });
            }))
            .catch(this.onError);
		this.handleClose();
  	}

	render() {

    	return(
			<div>
	    		<Jumbotron>
	    			<h2>Navbar</h2>
					<Link
						to= '/'
						paddingtop='100px'>
						<Button
							variant="secondary"
							size="md"
							block>
							Home
						</Button>
					</Link>
	    			<Link
	    				to= '/profile'>
		  				<Button
		  					variant="secondary"
		  					size="md"
		  					block>
		    				Profile
		  				</Button>
	    			</Link>
					<Link
						to= '/search'>
						<Button
							variant="secondary"
							size="md"
							block>
							Search
							</Button>
					</Link>
	    			<Link
	    				to= '/settings'
	    				paddingtop="50px">
		  				<Button
		  					variant="secondary"
		  					size="md"
		  					block>
		    				Settings
		  				</Button>
	  				</Link>
					<Link
						to= '/notifications'
						paddingtop="50px">
						<Button
							variant="secondary"
							size="md"
							block>
							Notifications
						</Button>
					</Link>
	          		<Link
	            		to= '/'
	            		paddingtop="50px">
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
	  					onClick ={this.handleShow}
	  					block>
	    				Delete User
	  				</Button>
	  				<Postwrite username={this.props.username}></Postwrite>
	    		</Jumbotron>
			<Modal show={this.state.show} onHide={this.handleClose}>
				<Modal.Header>
					<Modal.Title>Confirm Account Deletion</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Are you sure you want to delete your account? This cannot be undone!</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
					<Button variant="primary" onClick={this.deleteUser}>Confirm</Button>
				</Modal.Footer>
			</Modal>
			</div>
    	);
  	}
}

export default Navbar;
