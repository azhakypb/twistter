import React, { Component } from 'react';
import {Col, Row, Alert } from 'react-bootstrap';
import DBOps from '../DBOps.js'
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
    var userData = await new DBOps().searchUser(JSON.stringify({id: this.state.user}));
    this.setState({notifications: userData.getUser.notifications.items})
    console.log(this.state.notifications);

	for(var i = 0; i < this.state.notifications.length; i++){
		var deleteID = this.state.notifications[i].id;
		await new DBOps().deleteNotification(JSON.stringify({id: deleteID}));
	}
  }

  render() {
    var temp = [];

    for (const [index, value] of this.state.notifications.entries()) {
      temp.push(<div>{value.text}</div>);
    }

    return (
		<div>
			<Row>
				<Col>
					<Navbar></Navbar>
				</Col>
				<Col md="6" xs="10" >
      				{temp.map(item => (
						<Alert key={item} variant='primary'><p>{item}</p>
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
