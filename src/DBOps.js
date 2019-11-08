import { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

const userCreationTemplate = `mutation createUser($id: ID!) {
    createUser(input:{
        id: $id
    }) {
        id
    }
}`

const getFollowersTemplate = `query getUser($id: ID!) {
    getUser(id: $id){
        followers{
            items{
                id
            }
        }
    }
}`

const getFollowingTemplate = `query getUser($id: ID!) {
    getUser(id: $id){
        following{
            items{
                id
            }
        }
    }
}`

const userSearchTemplate = `query getUser($id: ID!) {
    getUser(
        id: $id
    ){
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

const createLikeTemplate = `mutation createLike(
  $id: ID!,
  $user: ID!,
  $post: ID!
) {
  createLike(input: {
    id: $id,
    likeLikerId: $user,
    likeLikeeId: $post
  }) {
    id
  }
}`

const deleteLikeTemplate = `mutation deleteLike(
  $id: ID!
) {
  deleteLike(input: {
    id: $id
  }) {
    id
  }
}`

class DBOps extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      text: "",
      timestamp: 0
    }
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
      return temp.data;
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

  /***** CREATE LIKE *****/

  createLike = async (info) => {
    var temp;
    try {
      temp = await API.graphql(graphqlOperation(createLikeTemplate, info));
      console.log(temp);
      return temp.data;
    } catch (e) {
      return e;
    }
  }

  /***** END CREATE LIKE *****/

  /***** DELETE LIKE *****/

  deleteLike = async (info) => {
    var temp;
    try {
      temp = await API.graphql(graphqlOperation(deleteLikeTemplate, info));
      console.log(temp);
      return temp.data;
    } catch (e) {
      return e;
    }
  }

  /***** END CREATE LIKE *****/

}

export function createUser(username){
    return API.graphql(graphqlOperation(userCreationTemplate, JSON.stringify({id:username})));
}

export function searchUser(username) {
    return API.graphql(graphqlOperation(userSearchTemplate, JSON.stringify({id:username})));
}

export function deleteUser(username){
    return API.graphql(graphqlOperation(userDeletionTemplate, JSON.stringify({id: username})));
}

export function createFollow(follower, followee){
    return API.graphql(graphqlOperation(followCreateTemplate, JSON.stringify({
        id: follower+'-'+followee,
        followFollowerId: follower,
        followFolloweeId: followee })));
}

export function deleteFollow(follower, followee){
    return API.graphql(graphqlOperation(followDeleteTemplate, JSON.stringify({
        id: follower+'-'+followee
    })));
}

export function createPost(info){
    return API.graphql(graphqlOperation(postCreateTemplate, info));
}

export function searchPost(info){
    return API.graphql(graphqlOperation(postSearchTemplate, info));
}

export function createNotification(info){
    return API.graphql(graphqlOperation(notifCreateTemplate, info));
}

export function deleteNotification(info){
    return API.graphql(graphqlOperation(notifDeleteTemplate, info));
}

export function searchNotification(info){
    return API.graphql(graphqlOperation(notifSearchTemplate, info));
}

export function createTopic(info){
    return API.graphql(graphqlOperation(createTopicTemplate, info));
}
export function searchTopic(info){
    return API.graphql(graphqlOperation(searchTopicTemplate, info));
}
export function createTag(info){
    return API.graphql(graphqlOperation(createTagTemplate, info));
}
export function createLike(info){
    return API.graphql(graphqlOperation(createLikeTemplate, info));
}
export function deleteLike(info){
    return API.graphql(graphqlOperation(deleteLikeTemplate, info));
}
export function getFollowers(userid){
    return API.graphql(graphqlOperation(getFollowersTemplate, JSON.stringify({id: userid})));
}
export function getFollowing(userid){
    return API.graphql(graphqlOperation(getFollowingTemplate, JSON.stringify({id: userid})));
}


export default DBOps;
