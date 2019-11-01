import React, { Component } from 'react';
import DBOps from '../DBOps.js'
import { Auth } from 'aws-amplify';

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
  }

  render() {
    var temp = [];

    for (const [index, value] of this.state.notifications.entries()) {
      temp.push(<div>Notication {index}:<br/>id: {value.id}<br/>text: {value.text}<br/>follower: {value.user.id}</div>);
    }

    return (<div className="App">
      {temp}
    </div>);
  }

}

export default Notifications;
