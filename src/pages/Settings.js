import React, { Component } from 'react';
import { Button, Col, FormControl, InputGroup, Jumbotron, Row } from 'react-bootstrap';
import Navbar from '../components/Navbar.js'
import { Auth } from 'aws-amplify' 


class Settings extends Component {

  constructor(props){
    super(props);
    this.state = { 
      email:'', 
      phone_number:'', 
      old_password:'', 
      new_password:'', 
      name:'',
      url:''
    };

    this.handleChangeEmail        = this.handleChangeEmail.bind(this);
    this.handleChangeNewPassword  = this.handleChangeNewPassword.bind(this);
    this.handleChangeOldPassword  = this.handleChangeOldPassword.bind(this);
    this.handleChangePhoneNumber  = this.handleChangePhoneNumber.bind(this);
    this.handleSubmitEmail        = this.handleSubmitEmail.bind(this);
    this.handleSubmitNewPassword  = this.handleSubmitNewPassword.bind(this);
    this.handleSubmitPhoneNumber  = this.handleSubmitPhoneNumber.bind(this);
    this.handleChangeName         = this.handleChangeName.bind(this);
    this.handleSubmitName         = this.handleSubmitName.bind(this);
    this.handleChangeUrl          = this.handleChangeUrl.bind(this);
    this.handleSubmitUrl          = this.handleSubmitUrl.bind(this);

  }

  handleChangeEmail(event){
    this.setState({ email: event.target.value });
  }

  async handleSubmitEmail(event){
    var user = await Auth.currentAuthenticatedUser();
    console.log(Auth.updateUserAttributes(user,{email: this.state.email}));
  }

  handleChangePhoneNumber(event){
    this.setState({ phone_number: event.target.value });
  }

  async handleSubmitPhoneNumber(event){
    var user = await Auth.currentAuthenticatedUser();
    var res = await Auth.updateUserAttributes(user, {phone_number:this.state.phone_number}).catch((err) => { console.error(err); });
    console.log( res );
  }

  handleChangeOldPassword(event){
    this.setState({ old_password: event.target.value });
  }

  handleChangeNewPassword(event){
    this.setState({ new_password: event.target.value });
  }

  async handleSubmitNewPassword(event){
    var user = await Auth.currentAuthenticatedUser();
    var res = await Auth.changePassword(user, this.state.old_password, this.state.new_password);
    console.log(res);
  }

  handleChangeName(event){
    console.log(event.target.value);
    this.setState({ name: event.target.value });
  }

  async handleSubmitName(event){
    var user = await Auth.currentAuthenticatedUser();
    var res = await Auth.updateUserAttributes(user, {name:this.state.name}).catch((err) => { console.error(err); });
    console.log(res);
  }

  handleChangeUrl(event){
    this.setState({ url: event.target.value });
  }

  async handleSubmitUrl(event){
    var user = await Auth.currentAuthenticatedUser();
    console.log(Auth.updateUserAttributes(user,{picture: this.state.url}));
  }

  render() {
    return (
      <Row>
        <Col>
          <Navbar></Navbar>
        </Col>
        <Col xs="6">
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

            <InputGroup className="mb-3" value={this.state.phone_number} onChange={this.handleChangePhoneNumber}>
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

            <InputGroup className="mb-3">
              <FormControl
                value={this.state.name} onChange={this.handleChangeName}
                placeholder="Name"
                aria-label="Name"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.handleSubmitName}>Change Your Name</Button>
              </InputGroup.Append>
            </InputGroup>

            <InputGroup className="mb-3">
              <FormControl
                value={this.state.url} onChange={this.handleChangeUrl}
                placeholder="Picture URL"
                aria-label="Picture URL"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.handleSubmitUrl}>Change Your Picture</Button>
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