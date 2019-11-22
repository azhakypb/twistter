import React, { Component, } from 'react';
import { Button, InputGroup, FormControl, Form, Row, Modal, Container} from 'react-bootstrap';
import DBOps from '../DBOps.js'
import { createPost } from '../DBOps.js'
import { Auth } from 'aws-amplify'


class Quoteprocess extends Component {
    constructor(props){
		// props and states
		super(props);
		this.state = {
			quoteText		: ''
		}
		this.handleAddQuotePost 	    = this.handleAddQuotePost.bind(this);
		this.handleLengthQuote       	= this.handleLengthQuote.bind(this);
        this.handleCreatePost           = this.handleCreatePost.bind(this);
		this.handleDouble			    = this.handleDouble.bind(this);
	}
    handleDouble(){
        /*Create a quoted post
            should be done Here
        */
        this.handleCreatePost();
        this.props.quoteClick();
	}
	handleAddQuotePost (event){
		this.setState({ quoteText:	event.target.value}
		);
	}

	handleLengthQuote(quoteText, quoteTopic) {
		if(quoteText.length > 0) {
			return true;
		} else {
			console.log('Post and Topic Forms Require a text');
			return false
		}
	}
    handleCreatePost = async () => {
        Auth.currentAuthenticatedUser({ bypassCache: true })
            .catch((err)=>{console.log('error getting user', err);})
            .then((user)=>{
                createPost(user.username, this.props.topics, this.state.quoteText, this.props.id)
                    .then((res)=>{
                        console.log('single post', 'handle create quoted post', 'success', res);
                        window.location.reload();
                    },(err)=>{
                        console.log('single post', 'handle create quoted post', 'fail', err);
                    })
            });
    }
    render() {
        const {
            quoteText,
            quoteTopic
        } = this.state;
        const enabled 	= 	this.handleLengthQuote(quoteText, quoteTopic)
        let buttonColor = 	enabled ? "primary" : "secondary"
        return (
                <Modal show={this.props.showQuote} onHide={this.props.quoteClick}>
                    <Modal.Header closeButton>
                        <Modal.Title>Quoting @{this.props.usernameq}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <InputGroup
                                    value={this.state.quoteText}
                                    onChange={this.handleAddQuotePost}>
                                    <FormControl
                                        rows='5'
                                        placeholder='Quote Here'
                                        as='textarea'
                                        maxlength="407"

                                    />
                                </InputGroup>
                            </Row>
                            <Row>
                                <FormControl
                                    rows='3'
                                    as='textarea'
                                    value={this.props.text}
                                    disabled
                                />
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.quoteClick}>
                            Close
                        </Button>
                        <Button variant={buttonColor} disabled={!enabled} onClick={this.handleDouble} type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
        )
    }
}

export default Quoteprocess;
