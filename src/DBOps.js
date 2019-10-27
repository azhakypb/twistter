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
    likes {
      items {
        id
      }
    }
    interests {
      items {
        id
      }
    }
    following {
      items {
        id
      }
    }
    followers {
      items {
        id
      }
    }
    posts {
      items {
        id
        text
        timestamp
        author {
          id
        }
        topics {
          items {
            id
          }
        }
        quote {
          id
        }
        quoted {
          items {
            id
          }
        }
      }
    }
    notificaitons {
      items {
        id
        user {
          id
        }
        text
        timestamp
      }
    }
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

const postCreateTemplate = `mutation createPost(
    $text: String!,
    $timestamp: Int!,
    $postAuthorId: ID!
  ) {
  createPost (input:{
    text: $text,
    timestamp: $timestamp,
    postAuthorId: $postAuthorId
  }){
    id,
    text,
    timestamp,
    author {
      id
    }
  }
}`

const postSearchTemplate = `query getPost(
    $id: ID!
  ) {
  getPost (id: $id){
    id,
    text,
    timestamp,
    author {
      id
    }
    likes {
      items {
        id
      }
    }
    topics {
      items {
        id
      }
    }
    quote,
    quoted {
      items {
        id
      }
    }
  }
}`

const notifCreateTemplate = `mutation createNotification(
  $notificationAuthorID: ID!,
  text: String!,
  timestamp: Int!
) {
  createNotification(input: {
    notificationAuthorID: $notificationAuthorID,
    text: $text,
    timestamp: $timestamp
  }) {
    id
    user {
      id
    }
    text
    timestamp
  }
}`

const notifDeleteTemplate = `mutation deleteNotification(
  $id: ID!
) {
  deleteNotification(
    id: $id
  }) {
    id
    user {
      id
    }
    text
    timestamp
  }
}`

const notifSearchTemplate = `query getNotification(
  $id: ID!
) {
  getNotification(
    id: $id
  }) {
    id
    user {
      id
    }
    text
    timestamp
  }
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

  createPost = async (info) => {
    console.log(info);
    var temp = await API.graphql(graphqlOperation(postCreateTemplate, info));
    return temp.data.createPost;
  }

  /***** END CREATE POST FUNCTIONS *****/

  /***** BEGIN SEARCH POST FUNCTIONS *****/

  searchPost = async (info) => {
    var temp = await API.graphql(graphqlOperation(postSearchTemplate, info));
    return temp.data.getPost;
  }

  /***** END SEARCH POST FUNCTIONS *****/

  /***** CREATE NOTIFICATION *****/

  createNotification = async (info) => {
    var temp = await API.graphql(graphqlOperation(notifCreateTemplate, info));
    return temp.data.createNotification;
  }

  /***** END CREATE NOTIFICATION *****/

  /***** DELETE NOTIFICATION *****/

  deleteNotification = async (info) => {
    var temp = await API.graphql(graphqlOperation(notifDeleteTemplate, info));
    return temp.data.deleteNotification;
  }

  /***** END DELETE NOTIFICATION *****/

  /***** SEARCH NOTIFICATION *****/

  searchNotification = async (info) => {
    var temp = await API.graphql(graphqlOperation(notifSearchTemplate, info));
    return temp.data.getNotification;
  }

  /***** END SEARCH NOTIFICATION *****/

}

export default DBOps;
