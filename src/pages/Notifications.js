import React, { Component } from 'react';
import {Col, Row, Alert } from 'react-bootstrap';
import DBOps, {getNotifications}  from '../DBOps.js'
import { Auth } from 'aws-amplify';
import Navbar from '../components/Navbar.js'

class Notifications extends Component {

  	constructor(props) {
    	super(props);
    	this.state = {
      		user: "",
      		notifications: []
    	}
  	}

  	async componentDidMount(){
    	var user = await Auth.currentAuthenticatedUser({ bypassCache: true });
    	this.setState({user: user.username});
    	var userData = await getNotifications(this.state.user);
    	this.setState({notifications: userData.data.getUser.notifications.items})
    	console.log(this.state.notifications);

		for(var i = 0; i < this.state.notifications.length; i++){
			var deleteID = this.state.notifications[i].id;
			await new DBOps().deleteNotification(JSON.stringify({id: deleteID}));
		}
  	}

  	render() {
    	var temp = [];

    	for (const [index, value] of this.state.notifications.entries()) {
      		temp.push(value.text);
    	}

		if(temp.length === 0){
			temp.push("You have no new notifications.");
		}

    	return (
			<div>
				<Row>
					<Col>
						<Navbar></Navbar>
					</Col>
					<Col md="6" xs="10" >
						<br />
      					{temp.map(item => (
							<Alert key={item} variant='info'>
							{item}
							</Alert>))}
					</Col>
					<Col>
					</Col>
				</Row>
    		</div>
		);
	}

}

export default Notifications;
