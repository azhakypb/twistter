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

const userDeletionTemplate = `mutation deleteUser($id: ID!) {
  deleteUser(input: {
    id: $id
  }) {
    id
  }
}
`

const followCreateTemplate = `mutation createFollow(
    $id: ID!,
    $followFollowerId: ID!,
    $followFolloweeId: ID!
  ) {
    createFollow(input: {
      id: $id,
      followFollowerId: $followFollowerId,
      followFolloweeId: $followFolloweeId
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

const followDeleteTemplate = `mutation deleteFollow($id: ID!) {
  deleteFollow (input: {
    id: $id
  }){
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
    this.return_value = null;
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
      this.return_value = await API.graphql(graphqlOperation(userCreationTemplate, this.state));
    }
    catch (error) {
      this.return_value = null;
      console.log("dbCreateUser: " + error);
    }
  }

  /***** END CREATE USER FUNCTIONS *****/

  /***** BEGIN SEARCH USER FUNCTIONS *****/

  searchUser = async (info) => {
    this.state = JSON.parse(info);
    console.log("searchUser: " + JSON.stringify(this.state));
    //this.dbSearchUser();
    var temp = await API.graphql(graphqlOperation(userSearchTemplate, this.state));
    return temp;
  }

  /***** END SEARCH USER FUNCTIONS *****/

  /***** BEGIN DELETE USER FUNCTIONS *****/

  deleteUser = info => {
    console.log(info)
    this.state = (JSON.parse(info));
    console.log("deleteUser: " + info);
    this.dbDeleteUser();
    return JSON.stringify(this.return_value);
  }

  dbDeleteUser = async () => {
    try {
      console.log("dbDeleteUser deleting: " + JSON.stringify(this.state));
      this.return_value = await API.graphql(graphqlOperation(userDeletionTemplate, this.state));
    }
    catch (error) {
      this.return_value = null;
      console.log("dbDeleteUser: " + JSON.stringify(error));
    }
  }

  /***** END DELETE USER FUNCTIONS *****/

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
      this.return_value = await API.graphql(graphqlOperation(followCreateTemplate, this.state));
    }
    catch (error) {
      this.return_value = null;
      console.log("dbCreateFollow: " + JSON.stringify(error));
    }
  }

  /***** END CREATE FOLLOW FUNCTIONS *****/

  /***** BEGIN UNFOLLOW FUNCTIONS *****/

  deleteFollow = info => {
    console.log(info)
    this.state = (JSON.parse(info.toString()));
    console.log(this.state);
    this.dbDeleteFollow();
    return JSON.stringify(this.state);
  }

  dbDeleteFollow = async () => {
    try {
      console.log("dbDeleteFollow: creating Follow: " + JSON.stringify(this.state));
      this.return_value = null;
      this.return_value = await API.graphql(graphqlOperation(followDeleteTemplate, this.state));
    }
    catch (error) {
      console.log("dbDeleteFollow: " + error);
    }
  }

  /***** END UNFOLLOW FUNCTIONS *****/


}

export default DBOps;
