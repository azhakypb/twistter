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

const postCreateTemplate = `mutation createPost($: ID!) {
  createPost(input: {
    id
  })
}`

class DBOps extends Component {

  constructor(props) {
    super(props);
    this.state = null;
    this.return_value = null;
  }
  /***** BEGIN CREATE USER FUNCTIONS *****/

  createUser = async (info) => {
    var temp = await API.graphql(graphqlOperation(userCreationTemplate, info));
    return temp.data.createUser;
  }


  /***** END CREATE USER FUNCTIONS *****/

  /***** BEGIN SEARCH USER FUNCTIONS *****/

  searchUser = async (info) => {
    var temp = await API.graphql(graphqlOperation(userSearchTemplate, info));
    return temp.data.getUser;
  }

  /***** END SEARCH USER FUNCTIONS *****/

  /***** BEGIN DELETE USER FUNCTIONS *****/

  deleteUser = async (info) => {
    var temp = await API.graphql(graphqlOperation(userDeletionTemplate, info));
    return temp.data.deleteUser;
  }

  /***** END DELETE USER FUNCTIONS *****/

  /***** BEGIN CREATE FOLLOW FUNCTIONS *****/

  createFollow = async (info) => {
    var temp = await API.graphql(graphqlOperation(followCreateTemplate, info));
    return temp.data.createFollow;
  }

  /***** END CREATE FOLLOW FUNCTIONS *****/

  /***** BEGIN UNFOLLOW FUNCTIONS *****/

  deleteFollow = async (info) => {
    var temp = await API.graphql(graphqlOperation(followDeleteTemplate, info));
    return temp.data.deleteFollow;
  }

  /***** END UNFOLLOW FUNCTIONS *****/

  /***** BEGIN CREATE POST FUNCTIONS *****/

  createFollow = async (info) => {
    var temp = await API.graphql(graphqlOperation(followCreateTemplate, info));
    return temp.data.createFollow;
  }

  /***** END CREATE POST FUNCTIONS *****/

  /***** BEGIN DELETE POST FUNCTIONS *****/

  deleteFollow = async (info) => {
    var temp = await API.graphql(graphqlOperation(followDeleteTemplate, info));
    return temp.data.deleteFollow;
  }

  /***** END DELETE POST FUNCTIONS *****/


}

export default DBOps;
