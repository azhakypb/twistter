import React, { Component } from 'react';
import { getUserPost, getFollowedPost } from '../DBOps.js'
import { Auth } from 'aws-amplify';

class KevinTesting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      data: []
    }
  }

  async componentDidMount() {
    var user = await Auth.currentAuthenticatedUser({ bypassCache: true });
    this.setState({userid: user.username});
    var userData = await getFollowedPost(this.state.userid);
    this.setState({data: userData})
    console.log(this.state.data);
  }

  render() {
    var temp = [];

    return (<h1>Hello World</h1>);
  }
}

export default KevinTesting;