import React, { Component } from 'react';
import {Col, Row, Alert } from 'react-bootstrap';
import {getNotifications, deleteNotification}  from '../DBOps.js'
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
    	Auth.currentAuthenticatedUser({ bypassCache: true })
			.catch((err)=>{
				console.log('Notifications.js error getting user', err);
			})
			.then((user)=>{
				console.log('Notifications.js got user', user);
    			this.setState({user: user.username});
    			getNotifications(this.state.user)
					.catch((err)=>{
						console.log('Notifications.js error getting notifications', err);
					})
					.then((userData)=>{
						console.log('Notifications.js got notifications', userData);
    					this.setState({notifications: userData.data.getUser.notifications.items});

						for(var i = 0; i < this.state.notifications.length; i++){
						var deleteID = this.state.notifications[i].id;
						new deleteNotification(deleteID)
							.catch((err)=>{
								console.log('Notifications.js error deleting notification', err);
							})
							.then((ret)=>{
								console.log('Notifications.js deleted notification', ret);
							});
						}
					});
			});		
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
