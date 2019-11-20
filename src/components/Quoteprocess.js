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
		this.handleDouble			    = this.handleDouble.bind(this);
	}
    handleDouble(){
        //create a quoted post
		console.log(this.state.quoteText);
		console.log(this.state.quoteTopic);
        this.props.action();
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

    render() {
        const {
            quoteText,
            quoteTopic
        } = this.state;
        const enabled 	= 	this.handleLengthQuote(quoteText, quoteTopic) &&
                            this.handleTopicNumQuote(quoteTopic);
        let buttonColor = 	enabled ? "primary" : "secondary"
        return (
                <Modal show={this.props.showQuote} onHide={this.props.action}>
                    <Modal.Header closeButton>
                        <Modal.Title>Quoting @{this.props.username}</Modal.Title>
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
                                    value={this.props.text + "\n\n" + this.props.topics}
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
                        <Button variant="danger" onClick={this.props.action}>
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
