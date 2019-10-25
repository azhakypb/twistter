import React, { Component, } from 'react';
import { Button, InputGroup, FormControl, Form} from 'react-bootstrap';

class Singlepost extends Component {

  constructor(props) {

    super(props);
    this.state = {
      post          : '',
      topics        : '',
      submitable    : false
    };
    //bind functions
    this.handleAddPost      = this.handleAddPost.bind(this);
    this.handleAddTopic     = this.handleAddTopic.bind(this);
    this.handleSubmitable   = this.handleSubmitable.bind(this);
    this.handleTopicNum     = this.handleTopicNum.bind(this);
    this.handleLength       = this.handleLength.bind(this);
    //this.handleSubmitPost = this.handleSubmitPost.bind(this);
  }

  //handlers
  handleSubmitable(){
    const {post, topics} = this.state;
  }
  handleAddPost (event){
    this.setState({ post:     event.target.value}
    );
  }
  handleAddTopic (event){
    this.setState({ topics:   event.target.value}
    );
  }
  handleTopicNum(topics) {
    var topicNum = 0;
    for(var i = 0; i < topics.length; i++){
      if (topics[i] == ' ') topicNum++;
    }
    if(topicNum > 5) {
      console.log('Topic Limit is Exceeded');
      return false;
    }
    else{return true;}
  }
  handleLength(post, topics) {
    if(post.length > 0 && topics.length > 0) {
      return true;
    }else {
      console.log('Post and Topic Forms Require a text');
      return false
    }
  }

  /*async handleSubmitPost(event){
      console.log('sending post');
      var user    = await Auth.currentAuthenticatedUser({ bypassCache: true })
                                  .catch((err) => { console.error(err); });
      var res     = await Auth.updateUserAttributes(user, {post:this.state.post, topics:this.state.topics})
                                  .catch((err) => { console.error(err); });
      console.log(res);
  }*/


  render() {
    const {post, topics} = this.state
    const enabled = this.handleLength(post, topics) &&
                    this.handleTopicNum(topics);
    let buttonColor = enabled ? "primary" : "secondary"
    let postExp;
    let topicExp;

    return (
      <Form onSubmit={this.props.action}>
        <InputGroup>
            <textarea
              rows="10"
              cols="62"
              placeholder="Write something here before submitting"
              maxlength="307"
              value={this.state.post}
              onChange={this.handleAddPost}
              >
              </textarea>

              <textarea
              rows="2"
              cols="62"
              placeholder= "Add one to five topics, separate with space if necessary"
              maxlength="50"
              value={this.state.topics}
              onChange={this.handleAddTopic}
              >
              </textarea>

              <Button
                variant={buttonColor}
                size="md"
                disabled={!enabled}
                type="submit"
                /*onClick={this.handleSubmitPost}*/
                block>
                Submit
              </Button>
        </InputGroup>
      </Form>
    )
  }
}

export default Singlepost;
