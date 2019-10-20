
// react modules
import React, { Component } from 'react';
import { Button, Card, Col, Container, FormControl, InputGroup, Jumbotron, Row, Image} from 'react-bootstrap';
import DBOps from '../DBOps.js'

// graphql modules
import Amplify, { API, graphqlOperation } from 'aws-amplify';

const userCreation = `mutation createUser($id: ID!) {
  createUser(input:{
    id: $id
  }) {
    id
  }
}`

const searchUser = `query getUser($id: ID!) {
  getUser(
    id: $id
  ) {
    id
  }
}`

const userInfo = {
  id: "this is dsada tdest"
}

class Test extends Component {

  constructor(props) {
    super(props);
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
      timestamp: 0,
      postAuthorId: ""
    }
    this.searchPostState = {
      id: ""
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleFollowee = this.handleFollowee.bind(this);
    this.handleFollower = this.handleFollower.bind(this);
    this.handleUnfollowInput = this.handleUnfollowInput.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCTPost = this.handleCTPost.bind(this);
    this.handleCAPost = this.handleCAPost.bind(this);
    this.handleSPost = this.handleSPost.bind(this);
  }

  handleDelete(event) {
    this.deleteState.id = event.target.value;
    console.log("Set deleteState followee to: " + event.target.value);
  }

  handleDeleteUser = async () => {
    var temp = await new DBOps().deleteUser(JSON.stringify(this.deleteState));
    console.log(temp);
  }

  handleUnfollowInput(event) {
    this.unfollowState.id = event.target.value;
    console.log("Set followState followee to: " + event.target.value);
  }

  handleUnFollow = async () => {
    var temp = await new DBOps().deleteFollow(JSON.stringify(this.unfollowState));
    console.log(temp);
  }

  handleFollowee(event) {
    this.followState.followFolloweeId = event.target.value;
    console.log("Set followState followee to: " + event.target.value);
  }

  handleFollower(event) {
    this.followState.followFollowerId = event.target.value;
    console.log("Set followState follower to: " + event.target.value);
  }

  handleFollow = async () => {
    this.followState.id = this.followState.followFollowerId + "-" + this.followState.followFolloweeId;
    console.log("Set followState id to: " + this.followState.id);
    var temp = await new DBOps().createFollow(JSON.stringify(this.followState));
    console.log(temp);
  }

  handleCreate(event) {
    this.createState = {id: event.target.value};
    console.log("Set createState id to: " + event.target.value);
  }

  handleCreateUser = async () => {
    var temp = await new DBOps().createUser(JSON.stringify(this.createState));
    console.log(temp);
  }

  handleSearch(event) {
    this.searchState = {id: event.target.value};
    console.log("Set searchState id to: " + event.target.value);
  }

  handleSearchUser = async () => {
    var temp = await new DBOps().searchUser(JSON.stringify(this.searchState));
    console.log(temp);
  }

  handleCTPost(event) {
    this.createPostState.text = event.target.value;
    console.log("Set createPostState text to: " + event.target.value);
  }

  handleCAPost(event) {
    this.createPostState.postAuthorId = event.target.value;
    console.log("Set createPostState postAuthorId to: " + event.target.value);
  }

  handleCreatePost = async () => {
    this.createPostState.timestamp = 1234;
    var temp = await new DBOps().createPost(JSON.stringify(this.createPostState));
    console.log(temp);
  }

  handleSPost(event) {
    this.searchPostState.id = event.target.value;
    console.log("Set searchPostState id to: " + event.target.value);
  }

  handleSearchPost = async () => {
    var temp = await new DBOps().searchPost(JSON.stringify(this.searchPostState));
    console.log(temp);
  }

  render() {

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
        <button onClick={this.handleDeleteUser}>Search User</button>
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
        Post Author: <input onChange={this.handleCAPost}/><br/>
        <button onClick={this.handleCreatePost}>Create Post</button><br/>
        Search Post: <input onChange={this.handleSPost}/>
        <button onClick={this.handleSearchPost}>Search Post</button>
      </div>

    );
  }
}

export default Test;
