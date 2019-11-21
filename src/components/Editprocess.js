import React, { Component, } from 'react';
import { Button, InputGroup, FormControl, Form, Row, Modal, Container} from 'react-bootstrap';
import DBOps from '../DBOps.js'
import { createPost } from '../DBOps.js'
import { Auth } from 'aws-amplify'


class Editprocess extends Component {
    constructor(props){
		// props and states
		super(props);
		this.state = {
			editText		: '',
			editTopic		: ''
		}
		this.handleEditPost 	        = this.handleEditPost.bind(this);
		this.handleEditTopic 	        = this.handleEditTopic.bind(this);
		this.handleTopicNumEdit     	= this.handleTopicNumEdit.bind(this);
		this.handleLengthEdit       	= this.handleLengthEdit.bind(this);
		this.handleDouble			    = this.handleDouble.bind(this);
	}
    handleDouble(){
        /*delete old post:
            it should be a call from parent group
          create a new post:
            it should be a call here
        */

		console.log(this.state.editText);
		console.log(this.state.editTopic);
        this.props.action();
	}
	handleEditPost (event){
		this.setState({ editText:	event.target.value}
		);
	}
	handleEditTopic (event){
		event.target.value = (event.target.value.replace(/\s+/g, ''));
      	this.setState({ editTopic:   event.target.value.split(",")});
	}
    handleTopicNumEdit(editTopic) {
		if(editTopic.length > 5) {
			return false;
		}
		else {
			return true;
		}
	}
	handleLengthEdit(editText, editTopic) {
		if(editText.length > 0 && editTopic.length > 0) {
			return true;
		} else {
			console.log('Post and Topic Forms Require a text');
			return false
		}
	}

    render() {
        const {
            editText,
            editTopic
        } = this.state;
        const enabled 	= 	this.handleLengthEdit(editText, editTopic) &&
                            this.handleTopicNumEdit(editTopic);
        let buttonColor = 	enabled ? "primary" : "secondary"
        return (
                <Modal show={this.props.showEdit} onHide={this.props.action}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editing the post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <FormControl
                                    rows='5'
                                    as='textarea'
                                    value={this.props.text}
                                    disabled
                                />
                            </Row>
                            <Row>
                                <InputGroup
                                    value={this.state.editText}
                                    onChange={this.handleEditPost}>
                                    <FormControl
                                        rows='5'
                                        as='textarea'
                                        maxlength="407"
                                        placeholder="Edit your post here"

                                    />
                                </InputGroup>
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
                                    value={this.state.editTopic}
                                    onChange={this.handleEditTopic}>
                                    <FormControl
                                        rows='2'
                                        as='textarea'
                                        placeHolder="Edit your topics here, remember max limit is 5 topics"
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

export default Editprocess;
