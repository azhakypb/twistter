
// react modules
import React, { Component } from 'react';
import { createUser, searchUser, deleteUser } from '../DBOps.js'                          // User methods
import { createPost, searchPost } from '../DBOps.js'                                      // Post methods
import { createFollow, deleteFollow } from '../DBOps.js'                                  // Follow methods
import { createNotification, searchNotification, deleteNotification } from '../DBOps.js'  // Noitification methods
import { createTopic, searchTopic } from '../DBOps.js'                                    // Topic methods
import { createTag } from '../DBOps.js'                                                   // Tag methods
import { customQuery } from '../DBOps.js'
import DBOps from '../DBOps.js'
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

  handleSearch(event) {
    this.searchState = {id: event.target.value};
    console.log("Set searchState id to: " + event.target.value);
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
    searchUser(this.searchState).then((result) => {
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
    console.log("Set followState id to: " + this.followState.id);
    this.createNotification.userid = this.followState.followFolloweeId;
    this.createNotification.text = "You have been followed by " + this.followState.followFollowerId;
    this.createNotification.time = 1234;
    var ret = await new DBOps().createNotification(JSON.stringify(this.createNotification));
    console.log("Created Notification for: " + this.followState.followFolloweeId);
    var temp = await new DBOps().createFollow(JSON.stringify(this.followState));
    console.log(temp);
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
    this.createPostState.timestamp = 1234;
    var topics = this.createPostState.topics.split(",");
    var post = await new DBOps().createPost(JSON.stringify(this.createPostState)); // create post
    var postid = post.id;
    for (var i = 0; i < topics.length; i++) {
      var temp2 = await new DBOps().createTopic(JSON.stringify({id: topics[i]}));
      var tag_input = {tagTopicId: topics[i], tagPostId: postid};
      var tag_ret = await new DBOps().createTag(JSON.stringify(tag_input));
    }
    console.log(post);
  }

  handleSearchPost = async () => {
    console.log('searching posts',this.searchPostState);
    var temp = await new DBOps().searchPost(JSON.stringify(this.searchPostState));
    console.log(temp)
  }

  /***** Notification Operations in Testing *****/

  handleSNotif(event) {
    this.searchNotifState.id = event.target.value;
    console.log("Set searchNotifState id to: " + event.target.value);
  }

  handleDNotif(event) {
    this.deleteNotifState.id = event.target.value;
    console.log("Set searchPostState id to: " + event.target.value);
  }

  searchNotif = async () => {
    var temp = await new DBOps().searchNotification(JSON.stringify(this.searchNotifState));
    console.log(temp);
  }

  deleteNotif = async () => {
    var temp = await new DBOps().deleteNotification(JSON.stringify(this.deleteNotifState));
    console.log(temp);
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
    var temp = await createTopic(JSON.stringify(this.createTopicState));
    console.log(temp);
  }

  searchTopic = async () => {
    var temp = await searchTopic(JSON.stringify(this.searchTopicState));
    console.log(temp);
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
        Wild Card User Search : <input onChange={this.handleWUSearch}/>
        <button onClick={this.WCUSearch}>Search Users with WildCard</button><br/>
      </div>

    );
  }
}

export default Test;
