import { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

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
    notifications {
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
        post {
          id
        }
        topic {
          id
        }
      }
    }
  }
}`

const notifCreateTemplate = `mutation createNotification(
  $userid: ID!,
  $text: String!,
  $time: Int!
) {
  createNotification(input: {
    notificationUserId: $userid,
    text: $text,
    timestamp: $time
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
  deleteNotification(input: {
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
  ) {
    id
    user {
      id
    }
    text
    timestamp
  }
}`

const createTopicTemplate = `mutation createTopic(
  $id: ID!
) {
  createTopic(input: {
    id: $id
  }) {
    id
  }
}
`

const searchTopicTemplate = `query searchTopic(
  $id: ID!
) {
  getTopics(id: $id) {
    id
    posts {
      items {
        post {
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
          quote{
            id
          }
          quoted {
            items {
              id
            }
          }
        }
      }
    }
  }
}
`

const createTagTemplate = `mutation createTag(
  $tagTopicId: ID!,
  $tagPostId: ID!
) {
  createTag(input: {tagTopicId: $tagTopicId, tagPostId: $tagPostId}) {
    id
    post {
      id
    }
    topic {
      id
    }
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
    var temp;
    try {
      temp = await API.graphql(graphqlOperation(userCreationTemplate, info));
      return temp.data.createUser;
    } catch (e) {
      return e.data;
    }
  }


  /***** END CREATE USER FUNCTIONS *****/

  /***** BEGIN SEARCH USER FUNCTIONS *****/

  searchUser = async (info) => {
    var temp;
    try {
      temp = await API.graphql(graphqlOperation(userSearchTemplate, info));
      return temp.data;
    } catch (e) {
      return e.data;
    }
  }

  /***** END SEARCH USER FUNCTIONS *****/

  /***** BEGIN DELETE USER FUNCTIONS *****/

  deleteUser = async (info) => {
    var temp;
    try {
      temp = await API.graphql(graphqlOperation(userDeletionTemplate, info));
      return temp.data.deleteUser;
    } catch (e) {
      return e.data;
    }
  }

  /***** END DELETE USER FUNCTIONS *****/

  /***** BEGIN CREATE FOLLOW FUNCTIONS *****/

  createFollow = async (info) => {
    var temp;
    try {
      temp = await API.graphql(graphqlOperation(followCreateTemplate, info));
      return temp.data.createFollow;
    } catch (e) {
      return e.data;
    }
  }

  /***** END CREATE FOLLOW FUNCTIONS *****/

  /***** BEGIN UNFOLLOW FUNCTIONS *****/

  deleteFollow = async (info) => {
    var temp;
    try {
      temp = await API.graphql(graphqlOperation(followDeleteTemplate, info));
      return temp.data.deleteFollow;
    } catch (e) {
      return e.data;
    }
  }

  /***** END UNFOLLOW FUNCTIONS *****/

  /***** BEGIN CREATE POST FUNCTIONS *****/

  createPost = async (info) => {
    var temp;
    try {
      temp = await API.graphql(graphqlOperation(postCreateTemplate, info));
      return temp.data.createPost;
    } catch (e) {
      return e.data;
    }
  }

  /***** END CREATE POST FUNCTIONS *****/

  /***** BEGIN SEARCH POST FUNCTIONS *****/

  searchPost = async (info) => {
    var temp;
    try {
      temp = await API.graphql(graphqlOperation(postSearchTemplate, info));
      return temp.data.getPost;
    } catch (e) {
      return e.data;
    }
  }

  /***** END SEARCH POST FUNCTIONS *****/

  /***** CREATE NOTIFICATION *****/

  createNotification = async (info) => {
    var temp;
    try {
      temp = await API.graphql(graphqlOperation(notifCreateTemplate, info));
      return temp.data.createNotification;
    } catch (e) {
      return e.data;
    }
  }

  /***** END CREATE NOTIFICATION *****/

  /***** SEARCH NOTIFICATION *****/

  searchNotification = async (info) => {
    var temp;
    try {
      temp = await API.graphql(graphqlOperation(notifSearchTemplate, info));
      return temp.data;
    } catch (e) {
      return e.data;
    }
  }

  /***** END SEARCH NOTIFICATION *****/

  /***** DELETE NOTIFICATION *****/

  deleteNotification = async (info) => {
    var temp;
    try {
      temp = await API.graphql(graphqlOperation(notifDeleteTemplate, info));
      return temp.data.deleteNotification;
    } catch (e) {
      return e.data;
    }
  }

  /***** END DELETE NOTIFICATION *****/

  /***** CREATE TOPIC *****/

  createTopic = async (info) => {
    var temp;
    try {
      temp = await API.graphql(graphqlOperation(createTopicTemplate, info));
      return temp.data;
    } catch (e) {
      return e.data;
    }
  }

  /***** END CREATE TOPIC *****/

  /***** SEARCH TOPIC *****/

  searchTopic = async (info) => {
    var temp;
    try {
      temp = await API.graphql(graphqlOperation(searchTopicTemplate, info));
      return temp.data;
    } catch (e) {
      return e.data;
    }
  }

  /***** END SEARCH TOPIC *****/

  /***** CREATE TAG *****/

  createTag = async (info) => {
    var temp;
    try {
      temp = await API.graphql(graphqlOperation(createTagTemplate, info));
      console.log(temp);
      return temp.data;
    } catch (e) {
      return e;
    }
  }

  /***** END CREATE TAG *****/

}

export async function createUser(info){
    return API.graphql(graphqlOperation(userCreationTemplate, info));
}

export async function searchUser(info) {
    return API.graphql(graphqlOperation(userSearchTemplate, info));
}

export async function deleteUser(info){
    return API.graphql(graphqlOperation(userDeletionTemplate, info));
}

export async function createFollow(info){
    return API.graphql(graphqlOperation(followCreateTemplate, info));
}

export async function deleteFollow(info){
    return API.graphql(graphqlOperation(followDeleteTemplate, info));
}

export async function createPost(info){
    return API.graphql(graphqlOperation(postCreateTemplate, info));
}

export async function searchPost(info){
    return API.graphql(graphqlOperation(postSearchTemplate, info));
}

export async function createNotification(info){
    return API.graphql(graphqlOperation(notifCreateTemplate, info));
}

export async function deleteNotification(info){
    return API.graphql(graphqlOperation(notifDeleteTemplate, info));
}

export async function searchNotification(info){
    return API.graphql(graphqlOperation(notifSearchTemplate, info));
}

export async function createTopic(info){
    return API.graphql(graphqlOperation(notifSearchTemplate, info));
}
export async function searchTopic(info){
    return API.graphql(graphqlOperation(notifSearchTemplate, info));
}
export async function createTag(info){
    return API.graphql(graphqlOperation(notifSearchTemplate, info));
}

export default DBOps;
