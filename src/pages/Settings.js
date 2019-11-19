// react modules
import React, { Component } from 'react';
import { Alert, Button, Col, FormControl, InputGroup, Jumbotron, Row } from 'react-bootstrap';
// aws modules
import { Auth } from 'aws-amplify'
// components
import Navbar from '../components/Navbar.js'

class Settings extends Component {

    constructor(props){
        // props and state
        super(props);
        this.state = {
            email           : '',
            phone_number    : '',
            old_password    : '',
            new_password    : '',
            name            : '',
            url             : '',
            alerts          : [], 
            errors          : []       
        };

        // bind functions
        this.handleChangeEmail        = this.handleChangeEmail.bind(this);
        this.handleChangeName         = this.handleChangeName.bind(this);
        this.handleChangeNewPassword  = this.handleChangeNewPassword.bind(this);
        this.handleChangeOldPassword  = this.handleChangeOldPassword.bind(this);
        this.handleChangePhoneNumber  = this.handleChangePhoneNumber.bind(this);
        this.handleChangeUrl          = this.handleChangeUrl.bind(this);
        this.handleSubmitEmail        = this.handleSubmitEmail.bind(this);
        this.handleSubmitName         = this.handleSubmitName.bind(this);
        this.handleSubmitNewPassword  = this.handleSubmitNewPassword.bind(this);
        this.handleSubmitPhoneNumber  = this.handleSubmitPhoneNumber.bind(this);
        this.handleSubmitUrl          = this.handleSubmitUrl.bind(this);
        this.addAlert                 = this.addAlert.bind(this);
        this.removeAlert              = this.removeAlert.bind(this);
        this.addError                 = this.addError.bind(this);
        this.removeError              = this.removeError.bind(this);
        console.log(Auth.currentAuthenticatedUser());
    }
    // input field handlers
    handleChangeEmail       (event){this.setState({ email:          event.target.value });}
    handleChangeName        (event){this.setState({ name:           event.target.value });}
    handleChangeNewPassword (event){this.setState({ new_password:   event.target.value });}
    handleChangeOldPassword (event){this.setState({ old_password:   event.target.value });}
    handleChangePhoneNumber (event){this.setState({ phone_number:   event.target.value });}
    handleChangeUrl         (event){this.setState({ url:            event.target.value });}
    // submission field handlers\
    addAlert(string){
        var alerts = this.state.alerts;
        alerts.push(string);
        this.setState({alerts: alerts});
    }
    removeAlert(index){
        var alerts = this.state.alerts;
        alerts.splice(index,1);
        this.setState({alerts: alerts});
    }
    addError(string){
        var errors = this.state.errors;
        errors.push(string);
        this.setState({errors: errors},()=>{
            console.log(this.state.errors);
        })
    }
    removeError(index){
        var errors = this.state.errors;
        errors.splice(index,1)
        this.setState({errors: errors});
    }
    async handleSubmitEmail(email){
    	if(this.state.email==='') {
            this.addError('cannot change email with an empty input'); 
        }
        else {
    	   Auth.currentAuthenticatedUser({ bypassCache: true })
                .catch((err)=>{
                    console.log('error getting user',err);
                    this.addError('Error retrieving user info; try again.');
                })
                .then((user)=>{
                    var req = {email: email};
                    Auth.updateUserAttributes(user,req)
                        .catch((err)=>{
                            console.log('error updating email',err);
                            this.addError('Error updating user email; try again.');
                        })
                        .then((res)=>{
                            console.log('successfully updated email',res);
                            this.addAlert('successfully updated email');
                        });
                });
    	}
    }
    async handleSubmitPhoneNumber(event){
        if(this.state.phone_number==='') { 
            this.addError('cannot change phone number with an empty input'); 
        }
        else {
            console.log('updating user phone no');
            var user = await Auth.currentAuthenticatedUser({ bypassCache: true })
                .catch((err) => { 
                    console.error(err); 
                });

            var res = await Auth.updateUserAttributes(user, {phone_number:this.state.phone_number})
                .catch((err) => { 
                    console.error(err); 
                })
                .then((res)=>{
                    this.addAlert('successfully updated phone number');
                })

            console.log(res);
        }
    }
    async handleSubmitNewPassword(event){
        if(this.state.old_password==='' || this.state.new_password==='') { 
            this.addError('cannot change password with empty input'); 
        }
	    else {
        console.log('updating user password');

        var user = await Auth.currentAuthenticatedUser({ bypassCache: true })
            .catch((err) => { 
                console.error(err); 
            });

        var res = await Auth.changePassword(user, this.state.old_password, this.state.new_password)
            .catch((err) => { 
                console.error(err); 
            })
            .then((res) => {
                this.addAlert('successfully updated password');
            });

            console.log(res);
        }
	
    }
    async handleSubmitName(event){
        if(this.state.name==='') { 
            this.addError('cannot change name with empty input');
        }
        else {

            console.log('updating user name');

            var user = await Auth.currentAuthenticatedUser({ bypassCache: true })
                .catch((err) => { 
                    console.error(err); 
                });

            var res = await Auth.updateUserAttributes(user, {name:this.state.name})
                .catch((err) => { 
                    console.error(err); 
                })
                .then((res)=>{
                    this.addAlert('successfully updated display name');
                });

            console.log(res);
        }
    }
    async handleSubmitUrl(event){
        if(this.state.url==='') { 
            this.addError('cannot change picture with empty input');
        }
    	else {

            console.log('updating user picture');

            var user = await Auth.currentAuthenticatedUser({ bypassCache: true })
                .catch((err) => { 
                    console.error(err);
                });

            var res = await Auth.updateUserAttributes(user,{picture: this.state.url})
                .catch((err) => { 
                    console.error(err); 
                }).then((res) => {
                    this.addAlert('successfully updated profile picture');
                });
    	}
    }


    render() {
        return (
            <div>

            {this.state.alerts.map((msg,index) => {
                return(
                    <Alert key={index} variant='success' dismissible onClose={()=>this.removeAlert(index)}>
                        {msg}
                    </Alert>
                );
            })}

            {this.state.errors.map((msg,index) => {
                return(
                    <Alert key={index} variant='danger' dismissible onClose={()=>this.removeError(index)}>
                        {msg}
                    </Alert>
                );
            })}

            <Row>
                <Col>
                    <Navbar></Navbar>
                </Col>
                <Col md="6" xs="10" >
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
                    <p>.</p>
                </Col>
            </Row>
            </div>

        );
    }
}

export default Settings;
