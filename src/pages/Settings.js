import React, { Component } from 'react';
import { Button, Col, FormControl, InputGroup, Jumbotron, Row } from 'react-bootstrap';
import Navbar from '../components/Navbar.js'
import { Auth } from 'aws-amplify' 


class Settings extends Component {

  constructor(props){
    super(props);
    this.state = { email:'', phone_number:'', old_password:'', new_password:'' };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleSubmitEmail = this.handleSubmitEmail.bind(this);
    this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
    this.handleSubmitPhoneNumber = this.handleSubmitPhoneNumber.bind(this);
    this.handleChangeOldPassword = this.handleChangeOldPassword.bind(this);
    this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
    this.handleSubmitNewPassword = this.handleSubmitNewPassword.bind(this);
  }

  handleChangeEmail(event){
    this.setState({ email: event.target.value });
  }

  handleSubmitEmail(event){
    console.log(this.state.email);
  }

  handleChangePhoneNumber(event){
    this.setState({ phone_number: event.target.value });
  }

  handleSubmitPhoneNumber(event){
    console.log("submit phone no");
  }

  handleChangeOldPassword(event){
    this.setState({ old_password: event.target.value });
  }

  handleChangeNewPassword(event){
    this.setState({ new_password: event.target.value });
  }

  async handleSubmitNewPassword(event){
    var user = await Auth.currentAuthenticatedUser();
    console.log(Auth.changePassword(user, this.state.old_password, this.state.new_password));
  }

  render() {
    return (
      <Row>
        <Col>
          <Navbar></Navbar>
        </Col>
        <Col>
          <Jumbotron>
            <h2>User Settings</h2>
            <InputGroup className="mb-3" value={this.state.email} onChange={this.handleChangeEmail}>
              <FormControl
                placeholder="New Email Address"
                aria-label="New Email Address"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.handleSubmitEmail}>Change Your Email</Button>
              </InputGroup.Append>
            </InputGroup>

            <InputGroup className="mb-3" value={this.state.email} onChange={this.handleChangeEmail}>
              <FormControl
                placeholder="New Phone #"
                aria-label="New Phone #"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.handleSubmitPhoneNumber}>Change Your Phone #</Button>
              </InputGroup.Append>
            </InputGroup>

            <InputGroup className="mb-3">
              <FormControl
                value={this.state.old_password} onChange={this.handleChangeOldPassword}
                placeholder="Old Password"
                aria-label="Old Password"
                aria-describedby="basic-addon2"
              />
              <FormControl
                value={this.state.new_password} onChange={this.handleChangeNewPassword}
                placeholder="New Password"
                aria-label="New Password"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.handleSubmitNewPassword}>Change Your Password</Button>
              </InputGroup.Append>
            </InputGroup>
          </Jumbotron>
        </Col>
        <Col>
          <h1>.</h1>
        </Col>
      </Row>
    );
  }
}

export default Settings;