import React, { Component, } from 'react';
import { Button, InputGroup, FormControl, Form} from 'react-bootstrap';
import DBOps from '../DBOps.js'

class Singlepost extends Component {


  constructor(props) {

    super(props);
    var today = new Date();
    this.state = {
      submitable    : false,
      text1: '',
      topics1: '',
      postAuthorId1: this.props.username,
      timestamp1: 132
    }
    //bind functions
    this.handleAddPost      = this.handleAddPost.bind(this);
    this.handleAddTopic     = this.handleAddTopic.bind(this);
    this.handleSubmitable   = this.handleSubmitable.bind(this);
    this.handleTopicNum     = this.handleTopicNum.bind(this);
    this.handleLength       = this.handleLength.bind(this);
    this.handleCreatePost   = this.handleCreatePost.bind(this);
  }

  //handlers
  handleSubmitable(){
    const {post, topics} = this.state;
  }
  handleAddPost (event){
    this.setState({ text1:     event.target.value}
    );
  }
  handleAddTopic (event){
    this.setState({ topics1:   event.target.value}
    );
  }
  handleTopicNum(topics1) {
    var topicNum = 0;
    for(var i = 0; i < topics1.length; i++){
      if (topics1[i] == ',') topicNum++;
    }
    if(topicNum >= 5) {
      console.log('Topic Limit is Exceeded');
      return false;
    }
    else{return true;}
  }
  handleLength(text1, topics1) {
    if(text1.length > 0 && topics1.length > 0) {
      return true;
    }else {
      console.log('Post and Topic Forms Require a text');
      return false
    }
  }

  handleCreatePost = async () => {
    var toSend = {
      text: this.state.text1,
      timestamp: this.state.timestamp1,
      postAuthorId: this.state.postAuthorId1
    };
    var temp = await new DBOps().createPost(JSON.stringify(toSend))
      .catch((err)=>{
        console.log(err);
      });
  }


  render() {
    const {text1, topics1} = this.state
    const enabled = this.handleLength(text1, topics1) &&
                    this.handleTopicNum(topics1);
    let buttonColor = enabled ? "primary" : "secondary"

    return (
      <Form onSubmit={this.props.action}>
        <InputGroup>
            <textarea
              rows="10"
              cols="62"
              placeholder="Write something here before submitting"
              maxlength="307"
              value={this.state.text1}
              onChange={this.handleAddPost}
              >
              </textarea>
              <textarea
              rows="2"
              cols="62"
              placeholder= "Add one to five topics, separate with space if necessary"
              maxlength="50"
              value={this.state.topics1}
              onChange={this.handleAddTopic}
              >
              </textarea>
              <Button
                variant={buttonColor}
                size="md"
                disabled={!enabled}
                type="submit"
                onClick={this.handleCreatePost}
                block>
                Submit
              </Button>
        </InputGroup>
      </Form>
    )
  }
}

export default Singlepost;
