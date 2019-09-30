
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
      followee: "",
      follower: ""
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleFollowee = this.handleFollowee.bind(this);
    this.handleFollower = this.handleFollower.bind(this);
  }

  handleFollowee(event) {
    this.followState.followee = event.target.value;
    console.log("Set followState followee to: " + event.target.value);
  }

  handleFollower(event) {
    this.followState.follower = event.target.value;
    console.log("Set followState follower to: " + event.target.value);
  }

  handleFollow = () => {
    this.followState.id = this.followState.followee + this.followState.follower;
    console.log("Follow creation status: " + new DBOps().createFollow(JSON.stringify(this.followState)));
  }

  handleCreate(event) {
    this.createState = {id: event.target.value};
    console.log("Set createState id to: " + event.target.value);
  }

  handleCreateUser = () => {
    console.log("Creation Successful: " + new DBOps().createUser(JSON.stringify(this.createState)));
  }

  handleSearch(event) {
    this.searchState = {id: event.target.value};
    console.log("Set searchState id to: " + event.target.value);
  }

  handleSearchUser = () => {
    console.log("Search Successful: " + new DBOps().searchUser(JSON.stringify(this.searchState)));
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
        Follow A User: <br/>
        Enter Follower: <input onChange={this.handleFollower}/>
        <br/>
        Enter Followee: <input onChange={this.handleFollowee}/><br/>
        <button onClick={this.handleFollow}>Follow User</button>
      </div>

    );
  }
}

export default Test;
