// react modules
import React, { Component } from 'react';
import { Alert, Button, Col, FormControl, InputGroup, Jumbotron, Row, Modal } from 'react-bootstrap';
// aws modules
import { Auth } from 'aws-amplify'
// components
import Navbar from '../components/Navbar.js'
import './pageCSS/shortPage.css'

class Settings extends Component {

    constructor(props){
        // props and state
        super(props);
        this.state = {
            email           : '',
            phone_number    : '',
            old_password    : '',
            new_password    : '',
			confirm_new_password : '',
            name            : '',
            url             : '',
            alerts          : [],
            errors          : [],
			show : false
        };

        // bind functions
        this.handleChangeEmail        = this.handleChangeEmail.bind(this);
        this.handleChangeName         = this.handleChangeName.bind(this);
        this.handleChangeNewPassword  = this.handleChangeNewPassword.bind(this);
		this.handleChangeConfirmNewPassword = this.handleChangeConfirmNewPassword.bind(this);
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
		this.handleShow				  = this.handleShow.bind(this);
		this.handleClose			  = this.handleClose.bind(this);
        console.log(Auth.currentAuthenticatedUser());
    }

	//password confirm handlers
	handleShow(){
		this.setState({
				show: true
			});
	}

	handleClose(){
		this.setState({
				show: false
			});
	}
    // input field handlers
    handleChangeEmail       (event){this.setState({ email:          event.target.value });}
    handleChangeName        (event){this.setState({ name:           event.target.value });}
    handleChangeNewPassword (event){this.setState({ new_password:   event.target.value });}
	handleChangeConfirmNewPassword (event){this.setState({ confirm_new_password: event.target.value });}
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
		var noError = true;
		var index = this.state.email.indexOf('@');
    	if(this.state.email==='') {
            this.addError('Cannot change email with an empty input');
        }
		else if(!this.state.email.includes('@', 1) || !this.state.email.includes('.', index)){
			this.addError('Email must be a valid format');
		}
        else {
    	   Auth.currentAuthenticatedUser({ bypassCache: true })
                .catch((err)=>{
                    console.log('Error getting user',err);
                    this.addError('Error retrieving user info; try again.');
                })
                .then((user)=>{
                    var req = {email: this.state.email};
						console.log('email change: ', req);
                    Auth.updateUserAttributes(user,req)
                        .catch((err)=>{
							noError = false;
                            console.log('Error updating email',err);
                            this.addError('Error updating user email; try again.');
                        })
                        .then((res)=>{
							if(noError){
                            	console.log('Successfully updated email',res);
                            	this.addAlert('Successfully updated email');
							}
                        });
                });
    	}
    }
    async handleSubmitPhoneNumber(event){
		var noError = true;
        if(this.state.phone_number==='') {
            this.addError('Cannot change phone number with an empty input');
        }
		else if(this.state.phone_number.length !== 10) {
			this.addError('Phone number must be 10 digits');
		}
		else if(this.state.phone_number.search(/[^0-9]/) !== -1){
			this.addError('Phone number can only contain numbers');
		}
        else {
            console.log('updating user phone no');
			//concat phone number with +1 at beginning
			this.setState({
					phone_number: '+1'.concat(this.state.phone_number)
				});
            Auth.currentAuthenticatedUser({ bypassCache: true })
                .catch((err) => {
					noError = false;
                    console.error('Error getting user', err);
					this.addError('Error updating phone number; try again.');
                })
				.then((user)=>{
					if(noError){
            			Auth.updateUserAttributes(user, {phone_number:this.state.phone_number})
                			.catch((err) => {
								noError = false;
                    			console.error('Error updating phone num', err);
								this.addError('Error updating phone number; try again.');
                			})
                			.then((res)=>{
								if(noError){
									console.log('Updated phone num', res);
                    				this.addAlert('Successfully updated phone number');
								}
                			})
        			}
				});
		}
    }
    async handleSubmitNewPassword(event){
		var noError = true;
        if(this.state.old_password==='' || this.state.new_password==='' || this.state.confirm_new_password==='') {
            this.addError('Cannot change password with empty input');
        }
		else if(this.state.new_password !== this.state.confirm_new_password){
			this.addError('New password must match confirmed password');
		}
		else if(this.state.old_password === this.state.new_password){
			this.addError('New password should not match old password');
		}
		else if(this.state.new_password.length < 8){
			this.addError('New password must be at least 8 characters');
		}
	    else {
        	console.log('updating user password');

        	Auth.currentAuthenticatedUser({ bypassCache: true })
            	.catch((err) => {
                	console.error('Error getting user', err);
					noError = false;
					this.addError('Error updating password; try again.');
            	})
				.then((user)=>{
					if(noError){
        				Auth.changePassword(user, this.state.old_password, this.state.new_password)
            				.catch((err) => {
								noError = false;
                				console.error(err);
								if(err.code === "NotAuthorizedException"){
									this.addError('Wrong password');
								}
								else{
									this.addError(err.code);
								}
            				})
            				.then((res) => {
								if(noError){
									console.log('Updated password', res);
									this.addAlert('Successfully updated password');
								}
            				});
        			}
				});
		}
		this.handleClose();
    }
    async handleSubmitName(event){
		var noError = true;
        if(this.state.name==='') {
            this.addError('Cannot change name with empty input');
        }
		else if(this.state.name.length > 24){
			this.addError('Display name must be at most 24 characters');
		}
        else {
			console.log('updating user name');
            Auth.currentAuthenticatedUser({ bypassCache: true })
                .catch((err) => {
					noError = false;
                    console.error('Error getting user', err);
					this.addError('Error updating display name; try again.');
                })
				.then((user)=>{
					if(noError){
            			Auth.updateUserAttributes(user, {name:this.state.name})
                			.catch((err) => {
								noError = false;
                    			console.error('Error updating display name', err);
								this.addError('Error updating display name; try again.');
                			})
                			.then((res)=>{
								if(noError){
									console.log('Updated display name', res);
                    				this.addAlert('Successfully updated display name');
								}
                			});
					}
				});
        }
    }
    async handleSubmitUrl(event){
		var noError = true;
        if(this.state.url==='') {
            this.addError('Cannot change picture with empty input');
        }
		else if(this.state.url.length > 2048){
			this.addError('URL must be 2048 characters or less');
		}
		else if(!(this.state.url.includes('.jpg', 8) || this.state.url.includes('.png', 8) || this.state.url.includes('.gif', 8))){
			this.addError('URL must be a .jpg, .png, or .gif');
		}
		else if((this.state.url.search(/(http:\/\/)/) !== 0) && (this.state.url.search(/(https:\/\/)/) !== 0)){
			this.addError('Must be a valid URL');
		}
    	else {
            console.log('updating user picture');

            Auth.currentAuthenticatedUser({ bypassCache: true })
                .catch((err) => {
					noError = false;
                    console.error('Error getting user', err);
					this.addError('Error updating image; try again.');
                })
				.then((user)=>{
					if(noError){
            			Auth.updateUserAttributes(user,{picture: this.state.url})
                			.catch((err) => {
								noError = false;
                    			console.error('Error updating image', err);
								this.addError('Error updating image; try again.');
                			})
							.then((res) => {
								if(noError){
                    				this.addAlert('Successfully updated profile picture');
								}
                			});
    				}
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
                                    onClick={this.handleSubmitEmail}
                                    className="settingsButton">
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
                                    onClick={this.handleSubmitPhoneNumber}
                                    className="settingsButton">
                                    Change Your Phone #
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>

                        {/* password input field */}
                        <InputGroup
                            className="mb-3">
                            <FormControl
								type="password"
                                value={this.state.old_password}
                                onChange={this.handleChangeOldPassword}
                                placeholder="Old Password"
                                aria-label="Old Password"
                                aria-describedby="basic-addon2"/>
                            <FormControl
								type="password"
                                value={this.state.new_password}
                                onChange={this.handleChangeNewPassword}
                                placeholder="New Password"
                                aria-label="New Password"
                                aria-describedby="basic-addon2"/>
							<FormControl
								type="password"
								value={this.state.confirm_new_password}
								onChange={this.handleChangeConfirmNewPassword}
								placeholder="Confirm New Password"
								aria-label="Confirm New Password"
								aria-describedby="basic-addon2"/>
                            <InputGroup.Append>
                                <Button
                                    variant="outline-secondary"
                                    onClick={this.handleShow}
                                    className="settingsButton">
                                    Change Your Password
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
						<Modal show={this.state.show} onHide={this.handleClose}>
							<Modal.Header>
								<Modal.Title>Confirm Password Change</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<p>Are you sure you want to change your password?</p>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
								<Button variant="primary" onClick={this.handleSubmitNewPassword}>Confirm</Button>
							</Modal.Footer>
						</Modal>

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
                                    onClick={this.handleSubmitName}
                                    className="settingsButton">
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
                                    onClick={this.handleSubmitUrl}
                                    className="settingsButton">
                                    Change Your Picture
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Jumbotron>
                </Col>
                <Col>
                </Col>
            </Row>
            </div>

        );
    }
}

export default Settings;
