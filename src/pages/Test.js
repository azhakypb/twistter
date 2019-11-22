
// react modules
import React, { Component } from 'react';
import DBOps from '../DBOps.js';
import TopicView from  '../components/TopicView.js';
import { createUser, searchUser, deleteUser, createFollow, deleteFollow, createPost, createTopic, searchPost, createNotification, searchNotification, deleteNotification, customQuery, getFollowedPost } from '../DBOps.js'
import Post from '../components/Post.js'

class Test extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: ""
    }
    this.createState = {
      id: ""
    }
    this.searchState = {
      id: ""
    }
    this.followState = {
      id: "",
      followFollowerId: "",
      followFolloweeId: ""
    }
    this.unfollowState = {
      id: ""
    }
    this.deleteState = {
      id: ""
    }
    this.createPostState = {
      text: "",
      topics: "",
      timestamp: 0,
      postAuthorId: ""
    }
    this.searchPostState = {
      id: ""
    }
    this.createNotification = {
      userid: "",
      text: "",
      time: 0
    }
    this.searchNotifState = {
      id: ""
    }
    this.deleteNotifState = {
      id: ""
    }
    this.searchTopicState = {
      id: ""
    }
    this.createTopicState = {
      id: ""
    }
    this.createTagState = {
      tagTopicId: "",
      tagPostId: ""
    }
    this.wcustate = {
      input: ""
    }

    this.followedPostState = {
      userid: ""
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleFollowee = this.handleFollowee.bind(this);
    this.handleFollower = this.handleFollower.bind(this);
    this.handleUnfollowInput = this.handleUnfollowInput.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCTPost = this.handleCTPost.bind(this);
    this.handleCAPost = this.handleCAPost.bind(this);
    this.handleCTopPost = this.handleCTopPost.bind(this);
    this.handleSPost = this.handleSPost.bind(this);
    this.handleSNotif = this.handleSNotif.bind(this);
    this.handleDNotif = this.handleDNotif.bind(this);
    this.handleSTopic = this.handleSTopic.bind(this);
    this.handleCTopic = this.handleCTopic.bind(this);
    this.handleCTTag = this.handleCTTag.bind(this);
    this.handleCPTag = this.handleCPTag.bind(this);
    this.handleWUSearch = this.handleWUSearch.bind(this);
    this.handleFollowedPost = this.handleFollowedPost.bind(this);
  }

  /***** User Operations In Testing *****/

  handleCreate(event) {
    this.createState = {id: event.target.value};
    console.log("Set createState id to: " + event.target.value);
  }

  handleDelete(event) {
    this.deleteState.id = event.target.value;
    console.log("Set deleteState followee to: " + event.target.value);
  }

  handleDeleteUser = () => {
    deleteUser(this.deleteState.id)
        .then((res)=>{
            console.log('test','deleteUser','success',res)
        },(err)=>{
            console.log('test','deleteUser','error',err)
        });
  }

  handleCreateUser = async () => {
    createUser(this.createState).then((result) => {
      console.log("No Error!");
      console.log(result.data.createUser);
    }, (error) => {
      console.log("Error!\n");
      console.log(error.data.createUser);
    });
  }


  handleSearchUser = async () => {
    searchUser(this.searchState.id).then((result) => {
      console.log("No Error!");
      console.log(result);
    }, (error) => {
      console.log("Error!\n");
      console.log(error);
    });
  }

  handleDeleteUser = async () => {
    deleteUser(this.deleteState).then((result) => {
      console.log("No Error!");
      console.log(result);
    }, (error) => {
      console.log("Error!");
      console.log(error);
    })
  }

  /***** Follow Operations in Testing *****/

  handleFollowee(event) {
    this.followState.followFolloweeId = event.target.value;
    console.log("Set followState followee to: " + event.target.value);
  }

  handleFollower(event) {
    this.followState.followFollowerId = event.target.value;
    console.log("Set followState follower to: " + event.target.value);
  }

  handleUnfollowInput(event) {
    this.unfollowState.id = event.target.value;
    console.log("Set followState followee to: " + event.target.value);
  }

  handleUnFollow = async () => {
    var temp = await new DBOps().deleteFollow(JSON.stringify(this.unfollowState));
    console.log(temp);
  }

  handleFollow = async () => {
    this.followState.id = this.followState.followFollowerId + "-" + this.followState.followFolloweeId;
    createFollow(this.followState.followFollowerId,this.followState.followFolloweeId)
        .then((res)=>{
            console.log('test','create follow','success',res);
        },(err)=>{
            console.log('test','create follow','error',err);
        });
  }

  handleCreate(event) {
    this.createState = {id: event.target.value};
    console.log("Set createState id to: " + event.target.value);
  }

    handleCreateUser = () => {
        var username = this.createState.id
        createUser(username)
            .then((res)=>{
                console.log('test','create user','success',res)
            },(err)=>{
                console.log('test','create user','error',err)
            });

    }

  handleSearch(event) {
    this.searchState = {id: event.target.value};
    console.log("Set searchState id to: " + event.target.value);
  }

  /***** Post Operations in Testing *****/

  handleCTPost(event) {
    this.createPostState.text = event.target.value;
    console.log("Set createPostState text to: " + event.target.value);
  }

  handleCAPost(event) {
    this.createPostState.postAuthorId = event.target.value;
    console.log("Set createPostState postAuthorId to: " + event.target.value);
  }

  handleCTopPost(event) {
    this.createPostState.topics = event.target.value;
    console.log("Set createPostState topic to: " + event.target.value);
  }

  handleSPost(event) {
    this.searchPostState.id = event.target.value;
    console.log("Set searchPostState id to: " + event.target.value);
  }

  handleCreatePost = async () => {
    var topics = this.createPostState.topics.split(",");
    createPost(this.createPostState.postAuthorId,topics,this.createPostState.text)
        .then((res)=>{
            console.log('test','create post','success',res);
        },(err)=>{
            console.log('test','create post','error',err);
        });
    //var postid = post.id;
    //for (var i = 0; i < topics.length; i++) {
    //  var temp2 = await new DBOps().createTopic(JSON.stringify({id: topics[i]}));
    //  var tag_input = {tagTopicId: topics[i], tagPostId: postid};
    //  var tag_ret = await new DBOps().createTag(JSON.stringify(tag_input));
    //}
  }

  handleSearchPost = async () => {
    searchPost(this.searchPostState.id).
        then((res)=>{
            console.log('test','search post','success',res);
        },(err)=>{
            console.log('test','search post','error',err);
        });
  }

  /***** Notification Operations in Testing *****/

  handleSNotif(event) {
    this.searchNotifState.id = event.target.value;
    console.log("Set searchNotifState id to: " + event.target.value);
  }

  searchNotif = async () => {
    searchNotification(this.searchNotifState.id)
        .then((res)=>{
            console.log('test','search notification','success',res);
        },(err)=>{
            console.log('test','search notification','error',err);
        });
  }

  handleDNotif(event) {
    this.deleteNotifState.id = event.target.value;
    console.log("Set searchPostState id to: " + event.target.value);
  }

  deleteNotif = () => {
    deleteNotification(this.deleteNotifState.id)
        .then((res)=>{
            console.log('test','delete notification','success',res);
        },(err)=>{
            console.log('test','delete notification','error',err);
        });
  }

  /***** Topic Operations in Testing *****/

  handleSTopic(event) {
    this.searchTopicState.id = event.target.value;
    console.log("Set searchTopicState id to: " + event.target.value);
  }

  handleCTopic(event) {
    this.createTopicState.id = event.target.value;
    console.log("Set createTopicState id to: " + event.target.value);
  }

  createTopic = async () => {
    createTopic(this.createTopicState.id)
        .then((res)=>{
            console.log('test','create topic','success',res);
        },(err)=>{
            console.log('test','create topic','error',err);
        });
  }

  /***** Tag Operations in Testing *****/

  handleCTTag(event) {
    this.createTagState.tagTopicId = event.target.value;
    console.log("Set createTagState tagTopicId to: " + event.target.value);
  }

  handleCPTag(event) {
    this.createTagState.tagPostId = event.target.value;
    console.log("Set createTagState tagPostId to: " + event.target.value);
  }

  createTag = async () => {
    var temp = await new DBOps().createTag(JSON.stringify(this.createTagState));
    console.log(temp);
  }

  /***** WC User Search *****/

  handleWUSearch(event) {
    this.wcustate.input = event.target.value;
    console.log("Set wcustate input to: " + event.target.value);
  }

  WCUSearch = async () => {
    const template = `query searchUsers($input: ID!) {
      searchUsers(filter: {id: {wildcard: $input}}) {
        items {
          id
        }
      }
    }`
    var temp = await customQuery(template, {input: this.wcustate.input + "*"});
    console.log(temp.data.searchUsers.items);
  }

  handleFollowedPost(event) {
    this.followedPostState.userid = event.target.value;
    console.log("Set followedPostState userid to: " + event.target.value);
  }

  followPost = async () => {
    var temp = await getFollowedPost(this.followedPostState.userid);
    console.log(temp);
  }

  render() {

    const {id} = this.state;

    return (
      <div className="App">
        <p>User Operations</p>
        Enter Username: <input onChange={this.handleCreate}/>
        <button onClick={this.handleCreateUser}>Create User</button>
        <br/>
        Enter Username: <input onChange={this.handleSearch}/>
        <button onClick={this.handleSearchUser}>Search User</button>
        <br/>
        Delete user: <input onChange={this.handleDelete}/>
        <button onClick={this.handleDeleteUser}>Delete User</button>
        <br/>
        Follow A User: <br/>
        Enter Follower: <input onChange={this.handleFollower}/>
        <br/>
        Enter Followee: <input onChange={this.handleFollowee}/><br/>
        <button onClick={this.handleFollow}>Follow User</button>
        <br/>
        Unfollow User: <input onChange={this.handleUnfollowInput}/>
        <button onClick={this.handleUnFollow}>Unfollow User</button><br/>
        Create a Post: <br/>
        Post Text: <input onChange={this.handleCTPost}/><br/>
        Post Topics: <input onChange={this.handleCTopPost}/><br/>
        Post Author: <input onChange={this.handleCAPost}/><br/>
        <button onClick={this.handleCreatePost}>Create Post</button><br/>
        Search Post: <input onChange={this.handleSPost}/>
        <button onClick={this.handleSearchPost}>Search Post</button>
        <Post id={id}></Post><br/>
        <br/>
        Search Notification: <input onChange={this.handleSNotif}/>
        <button onClick={this.searchNotif}>Search Notification</button><br/>
        Delete Notification: <input onChange={this.handleDNotif}/>
        <button onClick={this.deleteNotif}>Delete Notification</button><br/>
        <br/>
        Create Topic : <input onChange={this.handleCTopic}/>
        <button onClick={this.createTopic}>Create Topic</button><br/>
        Search Topic : <input onChange={this.handleSTopic}/>
        <button onClick={this.searchTopic}>Search Topic</button><br/>
        <br/>
        Tag Topic ID : <input onChange={this.handleCTTag}/><br/>
        Tag Post ID : <input onChange={this.handleCPTag}/><br/>
        <button onClick={this.createTag}>Create Tag</button><br/>
        <TopicView/>
        Wild Card User Search : <input onChange={this.handleWUSearch}/>
        <button onClick={this.WCUSearch}>Search Users with WildCard</button><br/>
        <br/>
        <br/>
        getFollowedPost : <input onChange={this.handleFollowedPost}/>
        <button onClick={this.followPost}>getFollowedPost</button><br/>
        <br/>
      </div>

    );
  }
}

export default Test;
