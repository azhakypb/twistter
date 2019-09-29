// react modules
import React, { Component } from 'react';
import { Button, Col, FormControl, InputGroup, Jumbotron, Row } from 'react-bootstrap';
// aws modules
import { Auth } from 'aws-amplify' 
// components
import Navbar from '../components/Navbar.js'


class Settings extends Component {

    constructor(props){
        // props and state
        super(props);
        this.state = { 
            email           :   '', 
            phone_number    :   '', 
            old_password    :   '', 
            new_password    :   '', 
            name            :   '',
            url             :   ''
        };
        // bind functions
        this.handleChangeEmail        = this.handleChangeEmail          .bind(this);
        this.handleChangeName         = this.handleChangeName           .bind(this);
        this.handleChangeNewPassword  = this.handleChangeNewPassword    .bind(this);
        this.handleChangeOldPassword  = this.handleChangeOldPassword    .bind(this);
        this.handleChangePhoneNumber  = this.handleChangePhoneNumber    .bind(this);
        this.handleChangeUrl          = this.handleChangeUrl            .bind(this);
        this.handleSubmitEmail        = this.handleSubmitEmail          .bind(this);
        this.handleSubmitName         = this.handleSubmitName           .bind(this);
        this.handleSubmitNewPassword  = this.handleSubmitNewPassword    .bind(this);
        this.handleSubmitPhoneNumber  = this.handleSubmitPhoneNumber    .bind(this);
        this.handleSubmitUrl          = this.handleSubmitUrl            .bind(this);
    }
    // input field handlers
    handleChangeEmail       (event){this.setState({ email:          event.target.value });}
    handleChangeName        (event){this.setState({ name:           event.target.value });}
    handleChangeNewPassword (event){this.setState({ new_password:   event.target.value });}
    handleChangeOldPassword (event){this.setState({ old_password:   event.target.value });}
    handleChangePhoneNumber (event){this.setState({ phone_number:   event.target.value });}
    handleChangeUrl         (event){this.setState({ url:            event.target.value });}
    // submission field handlers
    async handleSubmitEmail(event){
        console.log('updating user email');
        var user    = await Auth.currentAuthenticatedUser()
                                    .catch((err) => { console.error(err); });
        var res     = await Auth.updateUserAttributes(user,{email: this.state.email})
                                    .catch((err) => { console.error(err); });
        console.log(res);
    }
    async handleSubmitPhoneNumber(event){
        console.log('updating user phone no');
        var user    = await Auth.currentAuthenticatedUser()
                                    .catch((err) => { console.error(err); });
        var res     = await Auth.updateUserAttributes(user, {phone_number:this.state.phone_number})
                                    .catch((err) => { console.error(err); });
        console.log(res);
    }
    async handleSubmitNewPassword(event){
        console.log('updating user password');
        var user    = await Auth.currentAuthenticatedUser()
                                    .catch((err) => { console.error(err); });
        var res     = await Auth.changePassword(user, this.state.old_password, this.state.new_password)
                                    .catch((err) => { console.error(err); });
        console.log(res);
    }
    async handleSubmitName(event){
        console.log('updating user name');
        var user    = await Auth.currentAuthenticatedUser()
                                    .catch((err) => { console.error(err); });
        var res     = await Auth.updateUserAttributes(user, {name:this.state.name})
                                    .catch((err) => { console.error(err); });
        console.log(res);
    }
    async handleSubmitUrl(event){
        console.log('updating user picture');
        var user    = await Auth.currentAuthenticatedUser()
                                    .catch((err) => { console.error(err); })
                                    .then(( res) => { console.log(  res); });
        var res     = await Auth.updateUserAttributes(user,{picture: this.state.url})
                                    .catch((err) => { console.error(err); });
        console.log(res);
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

                        {/* email field */}
                        <InputGroup 
                            className="mb-3" 
                            value={this.state.email} 
                            onChange={this.handleChangeEmail}>
                            <FormControl
                                placeholder="New Email Address"
                                aria-label="New Email Address"
                                aria-describedby="basic-addon2"/>
                            <InputGroup.Append>
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={this.handleSubmitEmail}>
                                    Change Your Email
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>

                        {/* phone no field */}
                        <InputGroup 
                            className="mb-3" 
                            value={this.state.phone_number} 
                            onChange={this.handleChangePhoneNumber}>
                            <FormControl
                                placeholder="New Phone #"
                                aria-label="New Phone #"
                                aria-describedby="basic-addon2"/>
                            <InputGroup.Append>
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={this.handleSubmitPhoneNumber}>
                                    Change Your Phone #
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>

                        {/* password input field */}
                        <InputGroup 
                            className="mb-3">
                            <FormControl
                                value={this.state.old_password} 
                                onChange={this.handleChangeOldPassword}
                                placeholder="Old Password"
                                aria-label="Old Password"
                                aria-describedby="basic-addon2"/>
                            <FormControl
                                value={this.state.new_password} 
                                onChange={this.handleChangeNewPassword}
                                placeholder="New Password"
                                aria-label="New Password"
                                aria-describedby="basic-addon2"/>
                            <InputGroup.Append>
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={this.handleSubmitNewPassword}>
                                    Change Your Password
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>

                        {/* name input field */}
                        <InputGroup 
                            className="mb-3">
                            <FormControl
                                value={this.state.name} 
                                onChange={this.handleChangeName}
                                placeholder="Name"
                                aria-label="Name"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button 
                                    variant="outline-secondary"
                                    onClick={this.handleSubmitName}>
                                    Change Your Name
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>

                        {/* picture input field */}
                        <InputGroup 
                            className="mb-3">
                            <FormControl
                                value={this.state.url}
                                onChange={this.handleChangeUrl}
                                placeholder="Picture URL"
                                aria-label="Picture URL"
                                aria-describedby="basic-addon2"/>
                            <InputGroup.Append>
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={this.handleSubmitUrl}>
                                    Change Your Picture
                                </Button>
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