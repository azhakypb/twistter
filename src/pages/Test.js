
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
    this.data = {
      id: ""
    }
  }

  createUser = async () => {
    const create = null;
    try {
      create = await API.graphql(graphqlOperation(userCreation, userInfo));
    }
    catch (error) {
      console.log(error);
    }
    if (create == null) {
      console.log("User already exists");
    }
    // return create;
  }

  searchUser = async () => {
    const user = await API.graphql(graphqlOperation(searchUser, userInfo));
    if (user.data.getUser == null) {
      this.data.id = "User does not exist!";
      console.log("User does not exist!")
    }
    else {
      this.data.id = user.data.getUser.id;
      console.log(user.data.getUser.id);
    }
  }

  render() {

    const {id} = this.data;

    return (
      <div className="App">
        <p>User Operations</p>
        <button onClick={this.createUser}>Create User</button>
        <button onClick={this.searchUser}>Search User</button>
      </div>
    );
  }
}

export default Test;
