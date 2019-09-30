
// react modules
import React, { Component } from 'react';
import { Button, Card, Col, Container, FormControl, InputGroup, Jumbotron, Row, Image} from 'react-bootstrap';

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
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleCreate(event) {
    this.createState = {id: event.target.value};
    console.log("Set createState id to: " + event.target.value);
  }

  createUser = async () => {
    var user = null;
    try {
      user = await API.graphql(graphqlOperation(userCreation, this.createState));
      if (user.data.createUser == null) {
        console.log("User already exists");
      }
      else {
        console.log(JSON.stringify(user.data.createUser));
        console.log("User creation status: success");

      }
    }
    catch (error) {
      console.log(error);
    }
  }

  handleSearch(event) {
    this.searchState = {id: event.target.value};
    console.log("Set searchState id to: " + event.target.value);
  }

  searchUser = async () => {
    try {
      var user = await API.graphql(graphqlOperation(searchUser, this.searchState));
      if (user.data.getUser == null) {
        console.log("User does not exist!")
      }
      else {
        console.log(JSON.stringify(user.data.getUser));
      }
    }
    catch (error) {
      console.log("User does not exist!");
    }
  }

  render() {

    return (
      <div className="App">
        <p>User Operations</p>
        Enter Username: <input onChange={this.handleCreate}/>
        <button onClick={this.createUser}>Create User</button>
        <br/>
        Enter Username: <input onChange={this.handleSearch}/>
        <button onClick={this.searchUser}>Search User</button>
      </div>

    );
  }
}

export default Test;
