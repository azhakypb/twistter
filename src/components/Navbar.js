// react modules
import React, { Component, } from 'react';
import { Button, Jumbotron, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// aws modules
import { Auth } from 'aws-amplify';

import DBOps from '../DBOps.js'

class Navbar extends Component {

	constructor(props){
		// props and states
    	super(props);
	this.state = {
	    visibleDeletePrompt	: false,
	    visibleDeleteNo	: false,
	    visibleDeleteYes	: false
	};
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

	// Modal display control functions  
	showDeletePrompt() { 
	  this.setState({ visibleDeletePrompt: true }); 
	}

  	closeDeletePromptNo() {
    	  this.setState({
      	    visibleDeletePrompt: false,
      	    visibleDeleteNo: true
    	  });
  	}

  	closeDeletePromptYes() {
	  this.deleteUser();
    	  this.setState({
      	    visibleDeletePrompt: false,
      	    visibleDeleteYes: true
    	  });
  	}

  	closeDeleteNo() {
    	  this.setState({ visibleDeleteNo: false });
  	}

  	closeDeleteYes() {
    	  this.setState({ visibleDeleteYes: false });
  	}


	render() {

    	return(

	    <div>
		<Modal show={this.state.visibleDeletePrompt} onHide={this.closeDeletePromptNo.bind(this)}>
		  <Modal.Header></Modal.Header>
		  <Modal.Body>Are you sure you want to continue? All of your information will be deleted.</Modal.Body>
      		  <Modal.Footer>
        		<Button variant="secondary" onClick={this.closeDeletePromptNo.bind(this)}>No</Button>
        		<Button variant="primary" onClick={this.closeDeletePromptYes.bind(this)}>Yes</Button>
      		  </Modal.Footer>
    		</Modal>
 
    		<Modal show={this.state.visibleDeleteNo} onHide={this.closeDeleteNo.bind(this)}>
      		  <Modal.Header></Modal.Header>
      		  <Modal.Body>Cancelled.</Modal.Body>
      		  <Modal.Footer>
			<Button variant="secondary" onClick={this.closeDeleteNo.bind(this)}>Close</Button>
      		  </Modal.Footer>
    		</Modal>

    		<Modal show={this.state.visibleDeleteYes} onHide={this.closeDeleteYes.bind(this)}>
      		  <Modal.Header></Modal.Header>
      		  <Modal.Body>Account successfully deleted.</Modal.Body>
      		  <Modal.Footer>
	  		<Button variant="secondary" onClick={this.closeDeleteYes.bind(this)}>Close</Button>
      		  </Modal.Footer>
    		</Modal>

    		<Jumbotron>
    			<h2>Navbar</h2>
    			<Link
    				to= '/'>
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
    				to= '/settings'>
	  				<Button
	  					variant="secondary"
	  					size="md"
	  					block>
	    				Settings
	  				</Button>
  				</Link>
				<Link
					to= '/'>
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
						onClick ={this.showDeletePrompt.bind(this)}
						block>
						Delete User
					</Button>
    		</Jumbotron>
	    </div>

    	);
  	}
}

export default Navbar;
