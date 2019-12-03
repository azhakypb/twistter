// react modules
import React, { Component, } from 'react';
import { Button, Jumbotron, Modal,Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSlash, faDoorOpen, faStar, faUsersCog, faSearch, faUserCircle, faHome } from '@fortawesome/free-solid-svg-icons'
// aws modules
import { Auth } from 'aws-amplify';

import DBOps from '../DBOps.js'
import { deleteUser } from '../DBOps.js'
import Postwrite from '../components/Postwrite.js'
import './compCSS/Navbar.css'

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

        var user = await Auth.currentAuthenticatedUser({ bypassCache: true});
        console.log(user);
        var username = user.username;

        deleteUser(username)
        	.catch((err)=>console.log(err))
        	.then((res)=>{
        		console.log(res);


        		Auth.currentAuthenticatedUser()
        			.then((user: CognitoUser) =>{

                		user.deleteUser(error => {
                    		if (error) { console.log(error); }

                    		if (this.props.onSessionChange) {
                        		this.props.onSessionChange();
                        	}

                        	document.location.href = "/login";

                    	});
                    });
            });
  	}

	render() {
		var del 	= " Delete User"
		var logout 	= " Log Out"
		var notific = " Notifications"
		var sett    = " Settings"
		var search  = " Search"
		var profile	= " My Profile"
		var home 	= " Home Page"
    	return(
			<div id="navbar">
					<Link
						className = "links"
						to= '/'
						>
						<Button
							className="home but"
							variant="outline-light"
							size="md"
							block>
							<FontAwesomeIcon icon={faHome} />
							{home}
						</Button>
					</Link>
	    			<Link
						className = "links"
	    				to= '/profile'>
		  				<Button
							className="profile but"
		  					variant="outline-light"
		  					size="md"
		  					block>
							<FontAwesomeIcon icon={faUserCircle} />
		    				{profile}
		  				</Button>
	    			</Link>
					<Link
						className = "links"
						to= '/search'>
						<Button
							className="search but"
							variant="outline-info"
							size="md"
							block>
							<FontAwesomeIcon icon={faSearch} />
							{search}
							</Button>
					</Link>
	    			<Link
					    className = "links"
	    				to= '/settings'>
		  				<Button
							className="settings but"
		  					variant="outline-info"
		  					size="md"
		  					block>
							<FontAwesomeIcon icon={faUsersCog} />
		    				{sett}
		  				</Button>
	  				</Link>
					<Link
						className = "links"
						to= '/notifications'>
						<Button
							className="notifications but"
							variant="outline-info"
							size="md"
							block>
							<FontAwesomeIcon icon={faStar} />
							{notific}
						</Button>
					</Link>
	          		<Link
						className = "links"
	            		to= '/'>
	            		<Button
							className="logout but"
	              			variant="outline-dark"
	              			size="md"
	              			onClick={(e) => Auth.signOut()}
	              			block>
							<FontAwesomeIcon icon={faDoorOpen} />
	              			{logout}
	            		</Button>
	          		</Link>
	  				<Button
						className="delete but"
	  					variant="outline-danger"
	  					size="md"
	  					onClick ={this.handleShow}
	  					block>
						<FontAwesomeIcon icon={faUserSlash} />
						{del}
	  				</Button>
	  				<Postwrite username={this.props.username}></Postwrite>
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
