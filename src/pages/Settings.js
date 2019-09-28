import React, { Component } from 'react';
import { Button, Col, FormControl, InputGroup, Jumbotron, Row } from 'react-bootstrap';
import Navbar from '../components/Navbar.js'


class Settings extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Navbar></Navbar>
        </Col>
        <Col>
          <Jumbotron>
            <h2>User Settings</h2>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="New Email Address"
                aria-label="New Email Address"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary">Change Your Email</Button>
              </InputGroup.Append>
            </InputGroup>

            <InputGroup className="mb-3">
              <FormControl
                placeholder="New Phone #"
                aria-label="New Phone #"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary">Change Your Phone #</Button>
              </InputGroup.Append>
            </InputGroup>

            <InputGroup className="mb-3">
              <FormControl
                placeholder="Old Password"
                aria-label="Old Password"
                aria-describedby="basic-addon2"
              />
              <FormControl
                placeholder="New Password"
                aria-label="New Password"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary">Change Your Password</Button>
              </InputGroup.Append>
            </InputGroup>
          </Jumbotron>
        </Col>
        <Col>
          <h1></h1>
        </Col>
      </Row>
    );
  }
}

export default Settings;
