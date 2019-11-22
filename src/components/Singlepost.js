import React, { Component, } from 'react';
import { Button, InputGroup, FormControl, Form} from 'react-bootstrap';
import DBOps from '../DBOps.js'
import { createPost } from '../DBOps.js'
import { Auth } from 'aws-amplify'

class Singlepost extends Component {


  	constructor(props) {

    	super(props);
  		//  var today = new Date();
    	this.state = {
      		submitable    : false,
      		text1         : '',
      		topics1       : '',
      		postAuthorId1 : this.props.username,
    	}
    	//bind functions
    	this.handleAddPost      = this.handleAddPost.bind(this);
    	this.handleAddTopic     = this.handleAddTopic.bind(this);
    	this.handleTopicNum     = this.handleTopicNum.bind(this);
    	this.handleLength       = this.handleLength.bind(this);
    	this.handleCreatePost   = this.handleCreatePost.bind(this);
    	this.handleDouble       = this.handleDouble.bind(this);
  	}

  	//handlers
  	handleDouble() {
    	this.handleCreatePost();
        //window.location.reload();
  	}
  	handleAddPost (event){
    	this.setState({ text1:     event.target.value}
    	);
  	}
  	handleAddTopic (event){
      event.target.value = (event.target.value.replace(/\s+/g, ''));
    	this.setState({ topics1:   event.target.value.split(",")});
  	}
  	handleTopicNum(topics1) {
    	console.log('Singlepost.js handleTopicNum() called');
    	if(topics1.length > 5) {
      		return false;
    	}
    	else {
      		return true;
    	}
  	}
  	handleLength(text1, topics1) {
    	if(text1.length > 0 && topics1.length > 0) {
      		return true;
    	} else {
      		console.log('Post and Topic Forms Require a text');
      		return false
    	}
  	}

  	handleCreatePost = async () => {
    	Auth.currentAuthenticatedUser({ bypassCache: true })
        	.catch((err)=>{console.log('error getting user',err);})
        	.then((user)=>{
            	createPost(user.username,this.state.topics1,this.state.text1)
                    .then((res)=>{
                        console.log('single post','handle create post','success',res);
                        window.location.reload();
                    },(err)=>{
                        console.log('single post','handle create post','success',err);
                    })
        	});
  	}


  	render() {
    	const {text1, topics1}  = this.state
    	const enabled           = this.handleLength(text1, topics1) &&
                              	this.handleTopicNum(topics1);
    	let buttonColor         = enabled ? "primary" : "secondary"

    	return (
        	<Form onSubmit={this.props.action}>
            	<InputGroup>
                	<InputGroup
                    	value={this.state.text1}
                    	onChange={this.handleAddPost}>
                    	<FormControl
                        	rows='5'
                        	placeholder="Write something here before submitting"
                        	as="textarea"
                        	aria-label="With textarea"
                        	maxLength="407"
                    	/>
                	</InputGroup>
                	<InputGroup
                    	value={this.state.topics1}
                    	onChange={this.handleAddTopic}>
                    	<FormControl
                        	rows='2'
                        	placeholder="Add one to five topics, separate with comma if necessary"
                        	as="textarea"
                        	aria-label="With textarea"
                        	maxLength="100"
                    	/>
                	</InputGroup>
                	<Button
                      type='button'
                    	variant={buttonColor}
                    	size="md"
                    	disabled={!enabled}
                    	type="submit"
                    	onClick={this.handleDouble}
                    	block>
                    	Submit
                	</Button>
            	</InputGroup>
        	</Form>
    	)
  	}
}

export default Singlepost;
