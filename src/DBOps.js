import React, { Component } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';

const userCreationTemplate = `mutation createUser($id: ID!) {
  createUser(input:{
    id: $id
  }) {
    id
  }
}`

const userSearchTemplate = `query getUser($id: ID!) {
  getUser(
    id: $id
  ) {
    id
    image
  }
}`

const followCreateTemplate = `mutation createFollow(
    $id: ID!,
    $followerid: ID!,
    $followeeid: ID!
  ) {
    createFollow(input: {
      id: $id,
      followFollowerId: $followerid,
      followFolloweeId: $followeeid
    }) {
      id
      followee {
        id
      }
      follower {
        id
      }
    }
  }
`

class DBOps extends Component {

  constructor(props) {
    super(props);
    this.state = null;
    this.return = null;
  }
  /***** BEGIN CREATE USER FUNCTIONS *****/

  createUser = info => {
    console.log(info)
    this.state = (JSON.parse(info.toString()));
    console.log(this.state);
    this.dbCreateUser();
    return JSON.stringify(this.state);
  }

  dbCreateUser = async () => {
    try {
      console.log("dbCreateUser: creating: " + JSON.stringify(this.state));
      this.return = await API.graphql(graphqlOperation(userCreationTemplate, this.state));
    }
    catch (error) {
      this.return = null;
      console.log("dbCreateUser: " + error);
    }
  }

  /***** END CREATE USER FUNCTIONS *****/

  /***** BEGIN SEARCH USER FUNCTIONS *****/

  searchUser = info => {
    this.state = JSON.parse(info);
    console.log("searchUser: " + JSON.stringify(this.state));
    this.dbSearchUser();
    return JSON.stringify(this.return);
  }

  dbSearchUser = async () => {
    try {
      console.log("searching for: " + JSON.stringify(this.state));
      this.result = null;
      this.result = await API.graphql(graphqlOperation(userSearchTemplate, this.state));
    }
    catch (error) {
      this.return = null;
      console.log("dbSearchUser: " + error);
    }
  }

  /***** END SEARCH USER FUNCTIONS *****/

  /***** BEGIN CREATE FOLLOW FUNCTIONS *****/

  createFollow = info => {
    console.log(info)
    this.state = (JSON.parse(info.toString()));
    console.log(this.state);
    this.dbCreateFollow();
    return JSON.stringify(this.state);
  }

  dbCreateFollow = async () => {
    try {
      console.log("dbCreateFollow: creating Follow: " + JSON.stringify(this.state));
      this.return = await API.graphql(graphqlOperation(followCreateTemplate, this.state));
    }
    catch (error) {
      this.return = null;
      console.log("dbCreateFollow: " + error);
    }
  }

  /***** END CREATE FOLLOW FUNCTIONS *****/


}

export default DBOps;
