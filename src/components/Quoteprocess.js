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
			quoteText		: '',
			quoteTopic		: ''
		}
		this.handleAddQuotePost 	    = this.handleAddQuotePost.bind(this);
		this.handleAddQuoteTopic 	    = this.handleAddQuoteTopic.bind(this);
		this.handleTopicNumQuote     	= this.handleTopicNumQuote.bind(this);
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
	handleAddQuoteTopic (event){
		event.target.value = (event.target.value.replace(/\s+/g, ''));
      	this.setState({ quoteTopic:   event.target.value.split(",")});
	}
    handleTopicNumQuote(quoteTopic) {
		if(quoteTopic.length > 5) {
			return false;
		}
		else {
			return true;
		}
	}
	handleLengthQuote(quoteText, quoteTopic) {
		if(quoteText.length > 0 && quoteTopic.length > 0) {
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
                createPost(user.username, this.state.quoteTopic, this.state.quoteText, this.props.usernameq)
                    .then((res)=>{
                        console.log('single post', 'handle create quoted post', 'success', res);
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
        const enabled 	= 	this.handleLengthQuote(quoteText, quoteTopic) &&
                            this.handleTopicNumQuote(quoteTopic);
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
                            <Row>
                                <FormControl
                                    rows='1'
                                    as='textarea'
                                    value={this.props.topics}
                                    disabled
                                />
                            </Row>
                            <Row>
                                <InputGroup
                                    value={this.state.quoteTopic}
                                    onChange={this.handleAddQuoteTopic}>
                                    <FormControl
                                        rows='2'
                                        as='textarea'
                                        placeHolder="Add one to five topics, separate with comma if necessary"
                                        maxlength="100"
                                    />
                                </InputGroup>
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
