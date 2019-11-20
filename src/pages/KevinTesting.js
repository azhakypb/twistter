import React, { Component } from 'react';
import { getFollowingPost } from '../DBOps.js'
import { Auth } from 'aws-amplify';

class KevinTesting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<h1>Hello World</h1>);
  }
}

export default KevinTesting;
