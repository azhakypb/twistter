import { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

const userCreationTemplate = `mutation createUser($id: ID!) {
    createUser(input:{
        id: $id
    }) {
        id
    }
}`

const getFollowedTopicsTemplate = `query getFollow($id: ID!) {
    getFollow(id: $id){
        followedtopics
        unfollowedtopics
        newtopics
    }
}`

const updateFollowedTopicsTemplate = `mutation updateFollow($id: ID!, $followedtopics: String) {
    updateFollow( input: { id: $id, followedtopics: $followedtopics}){
        followedtopics
        unfollowedtopics
        newtopics
    }
}`

const updateUnfollowedTopicsTemplate = `mutation updateFollow($id: ID!, $unfollowedtopics: String) {
    updateFollow( input: { id: $id, unfollowedtopics: $unfollowedtopics}){
        followedtopics
        unfollowedtopics
        newtopics
    }
}`

const updateNewTopicsTemplate = `mutation updateFollow($id: ID!, $newtopics: String) {
    updateFollow( input: { id: $id, newtopics: $newtopics }){
        followedtopics
        unfollowedtopics
        newtopics
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

const getNotificationsTemplate = `query getUser($id: ID!) {
    getUser(
        id: $id
    ){
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
        topics
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
        $timestamp: String!,
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

const deletePostTemplate = `mutation deletePost(
        $id: ID!
    ) {
        deletePost (id: $id){
        id,
        text,
        timestamp,
        author {
            id
        }
    }
}`

const quotePostCreateTemplate = `mutation createPost(
        $text: String!,
        $timestamp: String!,
        $postAuthorId: ID!,
        $quote: ID!
    ) {
        createPost (input:{
        text: $text,
        timestamp: $timestamp,
        postAuthorId: $postAuthorId,
        quote: $quote
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
        }
      }
    }
  }
}
`

/* To be added to search Topic
quote{
  id
}
quoted {
  items {
    id
  }
}

*/

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

const createEngagementTemplate = `mutation createEngagement(
  $id: ID!,
  $value: Int!,
  $topicid: ID!,
  $userid: ID!
) {
  createEngagement(input: {
    id: $id,
    value: $value,
    engagementTopicId: $topicid,
    engagementUserId: $userid
  }) {
    id
    value
  }
}`

const updateEngagementTemplate = `mutation updateEngagement(
  $id: ID!,
  $value: Int!
) {
  updateEngagement(input: {id: $id, value: $value}) {
    id
    value
  }
}`

const getEngagementTemplate = `query getEngagement(
  $id: ID!
) {
  getEngagement(id: $id) {
    id
    value
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
	return new Promise((resolve,reject)=>{

		API.graphql(graphqlOperation(followCreateTemplate, JSON.stringify({
        	id: follower+'-'+followee,
        	followFollowerId: follower,
        	followFolloweeId: followee
    	}))).then((res)=>{

    		const res1 = res;

			createNotification(followee,'You have been followed by '+follower)
				.then((res)=>{

					var resObject = {'followResult':res1,'notificationResult':res};
					resolve(resObject);

				},(err)=>{

					var resObject = {'followResult':res1,'notificationResult':err};
					reject(resObject);

				});

    	},(err)=>{
    		reject(err);
    	})
	});
}

export function deleteFollow(follower, followee){
    return API.graphql(graphqlOperation(followDeleteTemplate, JSON.stringify({
        id: follower+'-'+followee
    })));
}

export function createPost(author,topics,text,quoteid=false){
    return new Promise((resolve,reject)=>{

        var timeid    = new Date().toString()

        console.log(timeid);

        if(quoteid){

            API.graphql(graphqlOperation(quotePostCreateTemplate, JSON.stringify({
                postAuthorId: author,
                timestamp: timeid,
                text: text,
                quote: quoteid
            })))
                .then((res)=>{
                    var postid = res.data.createPost.id
                    for(var i=0; i<topics.length;i++){

                        const topic = topics[i]
                        API.graphql(graphqlOperation(createTopicTemplate, JSON.stringify({
                            id: topic
                        })))
                            .then((res)=>{

                                API.graphql(graphqlOperation(createTagTemplate, JSON.stringify({
                                    tagTopicId: topic,
                                    tagPostId: postid
                                }))).catch((err)=>{
                                        reject(err);
                                    });

                            },(err)=>{

                                if(err.errors[0].errorType === 'DynamoDB:ConditionalCheckFailedException'){

                                    console.log('dbops','create post','topic already exists, ignoring error');

                                    API.graphql(graphqlOperation(createTagTemplate, JSON.stringify({
                                        tagTopicId: topic,
                                        tagPostId: postid
                                    }))).catch((err)=>{
                                        reject(err);
                                    });

                                } else {
                                    console.log('dbops','create post','unhandled error',err);
                                }

                            });
                    }
                    resolve(res)
                },(err)=>{
                    reject(err)
                });

        } else{

            API.graphql(graphqlOperation(postCreateTemplate, JSON.stringify({
                postAuthorId: author,
                timestamp: timeid,
                text: text
            })))
                .then((res)=>{
                    var postid = res.data.createPost.id
                    for(var i=0; i<topics.length;i++){

                        const topic = topics[i]
                        API.graphql(graphqlOperation(createTopicTemplate, JSON.stringify({
                            id: topic
                        })))
                            .then((res)=>{

                                API.graphql(graphqlOperation(createTagTemplate, JSON.stringify({
                                    tagTopicId: topic,
                                    tagPostId: postid
                                }))).catch((err)=>{
                                        reject(err);
                                    });

                            },(err)=>{

                                if(err.errors[0].errorType === 'DynamoDB:ConditionalCheckFailedException'){

                                    console.log('dbops','create post','topic already exists, ignoring error');

                                    API.graphql(graphqlOperation(createTagTemplate, JSON.stringify({
                                        tagTopicId: topic,
                                        tagPostId: postid
                                    }))).catch((err)=>{
                                        reject(err);
                                    });

                                } else {
                                    console.log('dbops','create post','unhandled error',err);
                                }

                            });
                    }
                    resolve(res)
                },(err)=>{
                    reject(err)
                });
        }
    });
}

export function searchPost(id){
    return API.graphql(graphqlOperation(postSearchTemplate, JSON.stringify({
    	id: id
    })));
}

export function deletePost(id){
    return API.graphql(graphqlOperation(deletePostTemplate, JSON.stringify({
        id: id
    })));
}

export function createNotification(userid,text){

    var month, day, year;
    var today     = new Date();
    var monthNum  = 1 + parseInt(today.getMonth(), 10);
    var dayNum    = parseInt(today.getDate(), 10);
    var yearNum   = parseInt(today.getFullYear(), 10);
    var timeid    = monthNum * 1000000 + dayNum * 10000 + yearNum;

    return API.graphql(graphqlOperation(notifCreateTemplate, JSON.stringify({
    	userid: userid,
    	text: text,
    	time: timeid
    })));
}

export function deleteNotification(id){
    return API.graphql(graphqlOperation(notifDeleteTemplate,JSON.stringify({
    	id: id
    })));
}

export function getNotifications(userid){
    return API.graphql(graphqlOperation(getNotificationsTemplate,JSON.stringify({
        id: userid
    })));
}

export function searchNotification(id){
    return API.graphql(graphqlOperation(notifSearchTemplate,JSON.stringify({
    	id: id
    })));
}

export function createTopic(id){
    return API.graphql(graphqlOperation(createTopicTemplate,JSON.stringify({
    	id: id
    })));
}
export function searchTopic(id){
    return API.graphql(graphqlOperation(searchTopicTemplate, JSON.stringify({
      id: id
    })));
}
export function createTag(info){
    return API.graphql(graphqlOperation(createTagTemplate, info));
}
export function createLike(userid, postid){
    return API.graphql(graphqlOperation(createLikeTemplate, JSON.stringify({
        id: userid + '-' + postid,
        user: userid,
        post: postid
    })));
}
export function deleteLike(userid, postid){
    return API.graphql(graphqlOperation(deleteLikeTemplate, JSON.stringify({
        id: userid + '-' + postid
    })));
}
export function getFollowers(userid){
    return API.graphql(graphqlOperation(getFollowersTemplate, JSON.stringify({id: userid})));
}
export function getFollowing(userid){
    return API.graphql(graphqlOperation(getFollowingTemplate, JSON.stringify({id: userid})));
}
export function createEngagement(info) {
  return API.graphql(graphqlOperation(createEngagementTemplate, JSON.stringify(info)));
}
export function updateEngagement(info) {
  return API.graphql(graphqlOperation(updateEngagementTemplate, JSON.stringify(info)));
}
export function getEngagement(engagementId) {
  return API.graphql(graphqlOperation(getEngagementTemplate, JSON.stringify(engagementId)));
}
export function customQuery(template, params) {
  return API.graphql(graphqlOperation(template, JSON.stringify(params)));
}
export function getUserPosts(userid) {
  const template = `query getUser ($id: ID!){
    getUser(id: $id) {
      posts {
        items {
          id
          timestamp
        }
      }
    }
  }`
  return API.graphql(graphqlOperation(template, JSON.stringify({id: userid})));
}

function processDataIntoHashTable(data, topics) {
  if (data == null) {
    return topics;
  }
  var dataset = data.split(",");
  for (var i = 0; i < data.length; i++) {
    topics[dataset[i]] = true;
  }
  return topics;
}

function containsFollowedTopics(postTopics, topics) {
  for (var i = 0; i < postTopics.length; i++) {
    if (topics[postTopics[i].topic.id] == true) {
      return true;
    }
  }
  return false;
}

export function getFollowedTopics(follower, followee){
    return API.graphql(graphqlOperation(getFollowedTopicsTemplate,JSON.stringify({
        id: follower + '-' + followee
    })));
}
export function updateFollowedTopics(follower, followee, followedtopics){
    return API.graphql(graphqlOperation(updateFollowedTopicsTemplate,JSON.stringify({
        id: follower + '-' + followee,
        followedtopics: followedtopics
    })));
}

export function updateUnfollowedTopics(follower, followee, unfollowedtopics){
    return API.graphql(graphqlOperation(updateUnfollowedTopicsTemplate,JSON.stringify({
        id: follower + '-' + followee,
        unfollowedtopics: unfollowedtopics
    })));
}

export function updateNewTopics(follower, followee, newtopics){
    return API.graphql(graphqlOperation(updateNewTopicsTemplate,JSON.stringify({
        id: follower + '-' + followee,
        newtopics: newtopics
    })));
}

export async function getFollowedPost(userid) {
  const template = `query getUser($id: ID!) { getUser(id: $id) { following { items { followee { posts { items { id timestamp topics { items { topic { id } } } likes { items { id } } quoted { items { id } } } } } followedtopics unfollowedtopics newtopics } } engagement { items { value topic { id } } } } }`

  var userData = await API.graphql(graphqlOperation(template, JSON.stringify({id: userid})));
  var engagement = userData.data.getUser.engagement.items;
  var followedUsers = userData.data.getUser.following.items;
  var topicEngagement = []; // hash table with key as topic id and data as engagment value
  var allposts = []; // array to store {postid, pfe, relevance, timestamp}

  for (var i = 0; i < engagement.length; i++) {
    topicEngagement[engagement[i].topic.id] = engagement[i].value;
  }

  for (var i = 0; i < followedUsers.length; i++) {
    var followedtopics = (followedUsers[i].followedtopics == null) ? [] : followedUsers[i].followedtopics.split(","); // followed topics from that followed user
    var newtopics = (followedUsers[i].newtopics == null) ? [] : followedUsers[i].newtopics.split(","); // new topics of that followed user
    var posts = followedUsers[i].followee.posts.items; // post of that followed user
    var topics = []; // hash table with key as topic id and data as true

    // add followedtopics to hash table
    for (var index = 0; index < followedtopics.length; index++) {
      topics[followedtopics[index]] = true;
    }
    // add newtopics to hash table
    for (var index = 0; index < newtopics.length; index++) {
      topics[newtopics[index]] = true;
    }

    for (var j = 0; j < posts.length; j++) {
      if (containsFollowedTopics(posts[j].topics.items, topics) == false) {
        continue;
      }
      var postid = posts[j].id; // postid
      var likes = posts[j].likes.items.length; // number of likes the post has
      var quoted = posts[j].quoted.items.length; // number of times the post has been quoted
      var timestamp = posts[j].timestamp; // timestamp of the post
      var postTopics = posts[j].topics.items; // array of topics tagged onto the post
      var pfe_value = 0; // potential of engagement value
      for (var k = 0; k < postTopics.length; k++) {
        if (topicEngagement[postTopics[k].topic.id] != null) {
          pfe_value = topicEngagement[postTopics[k].topic.id];
        }
      }
      var data = {id: postid, pfe: pfe_value, relevance: likes + quoted * 5, timestamp: timestamp};
      allposts.push(data);
    }

  }
  return allposts;
}
export default DBOps;
