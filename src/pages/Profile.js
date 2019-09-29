import React, { Component } from 'react';
import { Button, Col, FormControl, InputGroup, Jumbotron, Row, Container, Image} from 'react-bootstrap';
import Navbar from '../components/Navbar.js'


class Profile extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Navbar></Navbar>
        </Col>
        <Col xs={6}>
        <Container className="My profile">
        <Jumbotron>
        <h1>My Profile</h1>
        <Image src="http://best-hack.net/customavatars/avatar98809_1.gif" roundedCircle/>
        <p>My Name <br /> My username</p>
        <Button variant="outline-success"> 27 Followers</Button>
        <Button variant="outline-danger">13 Following</Button>
        </Jumbotron>
        </Container>
        <Container className="timeline">
        <Jumbotron>
        <Image src="https://sc02.alicdn.com/kf/HTB1pfgTHFXXXXczXVXXq6xXFXXXc/110x110-size-Compressed-wooden-pallet.jpg_50x50.jpg" roundedCircle/>
        <p>My Name <br /> My username</p>
        </Jumbotron>
        </Container>
        </Col>
        <Col>
          <h1>Third col</h1>
        </Col>
      </Row>
    );
  }
}

export default Profile;
