// react modules
import React, { Component } from 'react';
import { Alert, Button, Col, FormControl, InputGroup, Jumbotron, Row, Modal } from 'react-bootstrap';
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
            visibleEmail    : false,
            visiblePhone    : false,
            visiblePW       : false,
            visibleName     : false,
            visibleURL      : false,
            visibleEmpty    : false,
			visibleModalPW	: true,
       };


        // bind functions
        this.handleChangeEmail        = this.handleChangeEmail.bind(this);
        this.handleChangeName         = this.handleChangeName.bind(this);
        this.handleChangeNewPassword  = this.handleChangeNewPassword.bind(this);
        this.handleChangeOldPassword  = this.handleChangeOldPassword.bind(this);
        this.handleChangePhoneNumber  = this.handleChangePhoneNumber.bind(this);
        this.handleChangeUrl          = this.handleChangeUrl.bind(this);
        this.handleSubmitName         = this.handleSubmitName.bind(this);
        this.handleSubmitNewPassword  = this.handleSubmitNewPassword.bind(this);
        this.handleSubmitPhoneNumber  = this.handleSubmitPhoneNumber.bind(this);
        this.handleSubmitUrl          = this.handleSubmitUrl.bind(this);
        this.handleSubmitEmail        = this.handleSubmitEmail.bind(this);

        console.log(Auth.currentAuthenticatedUser());
    }
    // input field handlers
    handleChangeEmail       (event){this.setState({ email:          event.target.value });}
    handleChangeName        (event){this.setState({ name:           event.target.value });}
    handleChangeNewPassword (event){this.setState({ new_password:   event.target.value });}
    handleChangeOldPassword (event){this.setState({ old_password:   event.target.value });}
    handleChangePhoneNumber (event){this.setState({ phone_number:   event.target.value });}
    handleChangeUrl         (event){this.setState({ url:            event.target.value });}
    // submission field handlers
    async handleSubmitEmail(email){
		if(this.state.email==='') { this.showAlertEmpty(); }
		else {
			Auth.currentAuthenticatedUser({ bypassCache: true })
        		.catch((err)=>{console.log('error getting user',err);})
        		.then((user)=>{
            		var req = {email: email};
        	Auth.updateUserAttributes(user,req)
            	.catch((err)=>{console.log('error updating email',err)})
            	.then((res)=>{console.log('successfully updated email',res)});
        	});
    		this.showAlertEmail();
		}
    }
    async handleSubmitPhoneNumber(event){
        if(this.state.phone_number==='') { this.showAlertEmpty(); }
        else {
        	console.log('updating user phone no');
        	var user    = await Auth.currentAuthenticatedUser({ bypassCache: true })
                                    .catch((err) => { console.error(err); });
        	var res     = await Auth.updateUserAttributes(user, {phone_number:this.state.phone_number})
                                    .catch((err) => { console.error(err); });
        	console.log(res);
        	this.showAlertPhone();
    	}
    }
    async handleSubmitNewPassword(event){
		if(this.state.old_password==='' || this.state.new_password==='') { this.showAlertEmpty(); }
		else {
        	console.log('updating user password');
        	var user    = await Auth.currentAuthenticatedUser({ bypassCache: true })
                                    .catch((err) => { console.error(err); });
        	var res     = await Auth.changePassword(user, this.state.old_password, this.state.new_password)
                                    .catch((err) => { console.error(err); });
        	console.log(res);
			this.showAlertPW();
		}
    }
    async handleSubmitName(event){
        if(this.state.name==='') { this.showAlertEmpty(); }
        else {
        	console.log('updating user name');
        	var user    = await Auth.currentAuthenticatedUser({ bypassCache: true })
                                    .catch((err) => { console.error(err); });
        	var res     = await Auth.updateUserAttributes(user, {name:this.state.name})
                                    .catch((err) => { console.error(err); });
        	console.log(res);
        	this.showAlertName();
    	}
    }
    async handleSubmitUrl(event){
    	if(this.state.url==='') { this.showAlertEmpty(); }
		else {
        	console.log('updating user picture');
        	var user    = await Auth.currentAuthenticatedUser({ bypassCache: true })
                                    .catch((err) => { console.error(err); });
        	var res     = await Auth.updateUserAttributes(user,{picture: this.state.url})
                                    .catch((err) => { console.error(err); });
        	console.log(res);
        	this.showAlertURL();
    	}
    }

    showAlertEmail() { this.setState({ visibleEmail: true }); }
    showAlertPhone() { this.setState({ visiblePhone: true }); }
    showAlertPW() { this.setState({ visiblePW: true }); }
    showAlertName() { this.setState({ visibleName: true }); }
    showAlertURL() { this.setState({ visibleURL: true }); }
    showAlertEmpty() { this.setState({ visibleEmpty: true }); }

    closeAlertEmail() { this.setState({ visibleEmail: false }); }
    closeAlertPhone() { this.setState({ visiblePhone: false }); }
    closeAlertPW() { this.setState({ visiblePW: false }); }
    closeAlertName() { this.setState({ visibleName: false }); }
    closeAlertURL() { this.setState({ visibleURL: false }); }
    closeAlertEmpty() { this.setState({ visibleEmpty: false }); }
	closeModal() { this.setState({ visibleModalPW: false }); }



    render() {
        return (
            <div>

        <Alert variant="success" show={this.state.visibleEmail} onClose={this.closeAlertEmail.bind(this)} dismissible>Email successfully updated.</Alert>
        <Alert variant="success" show={this.state.visiblePhone} onClose={this.closeAlertPhone.bind(this)} dismissible>Phone # successfully updated.</Alert>
        <Alert variant="success" show={this.state.visiblePW} onClose={this.closeAlertPW.bind(this)} dismissible>Password successfully updated.</Alert>
        <Alert variant="success" show={this.state.visibleName} onClose={this.closeAlertName.bind(this)} dismissible>Name successfully updated.</Alert>
        <Alert variant="success" show={this.state.visibleURL} onClose={this.closeAlertURL.bind(this)} dismissible>Image URL successfully updated.</Alert>
        <Alert variant="danger" show={this.state.visibleEmpty} onClose={this.closeAlertEmpty.bind(this)} dismissible>Cannot update info with empty content! Please enter a valid value.</Alert>


		<Modal show={this.state.visibleModalPW} onHide={this.closeModal.bind(this)}>
			<Modal.Header closeButton>
				<Modal.Title>Confirmation Required</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Please Reenter Password
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={this.closeModal.bind(this)}>Close</Button>
			</Modal.Footer>
		</Modal>

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
