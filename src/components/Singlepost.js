import React, { Component, } from 'react';
import { Button, InputGroup, FormControl, Form} from 'react-bootstrap';
import DBOps from '../DBOps.js'
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
      timestamp1    : 0
    }
    //bind functions
    this.handleAddPost      = this.handleAddPost.bind(this);
    this.handleAddTopic     = this.handleAddTopic.bind(this);
    this.handleSubmitable   = this.handleSubmitable.bind(this);
    this.handleTopicNum     = this.handleTopicNum.bind(this);
    this.handleLength       = this.handleLength.bind(this);
    this.handleCreatePost   = this.handleCreatePost.bind(this);
    this.handleTime         = this.handleTime.bind(this);
    this.handleDouble       = this.handleDouble.bind(this);
  }

  //handlers
  handleDouble() {
    this.handleTime();
    this.handleCreatePost();
  }
  handleTime() {
    var month, day, year;
    var today     = new Date();
    month         = today.getMonth();
    day           = today.getDate();
    year          = today.getFullYear();

    var monthNum  = 1 + parseInt(month, 10);
    var dayNum    = parseInt(day, 10);
    var yearNum   = parseInt(year, 10);

    var res       = monthNum * 1000000 + dayNum * 10000 + yearNum;
    this.setState({ timestamp1:     res});
  }
  handleSubmitable(){
    const {post, topics} = this.state;
  }
  handleAddPost (event){
    this.setState({ text1:     event.target.value}
    );
  }
  handleAddTopic (event){
    this.setState({ topics1:   event.target.value.split(",")});
  }
  handleTopicNum(topics1) {
    console.log('called');
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
    }else {
      console.log('Post and Topic Forms Require a text');
      return false
    }
  }

  handleCreatePost = async () => {
    Auth.currentAuthenticatedUser({ bypassCache: true })
        .catch((err)=>{console.log('error getting user',err);})
        .then((user)=>{
            var username = user.username;
            var toSend = {
                text: this.state.text1,
                timestamp: this.state.timestamp1,
                postAuthorId: username
            };
            new DBOps().createPost(JSON.stringify(toSend))
                .then((post)=>{
                    const topics = this.state.topics1;
                    console.log(topics);
                    for (var i = 0; i < topics.length; i++) {
                        const topic = topics[i];
                        new DBOps().createTopic(JSON.stringify({id: topic}))
                        .finally(()=>{
                            var tag_input = {tagTopicId: topic, tagPostId: post.id};
                            new DBOps().createTag(JSON.stringify(tag_input))
                                .catch((err)=>{
                                    console.log('create tag error',err);
                                })
                                .then((res)=>{
                                    console.log('create tag success',res);
                                });
                        })
                    }
                });
        });

    /*
    console.log(toSend);
    var topics = this.state.topics1.split(",");
    var post = await new DBOps().createPost(JSON.stringify(toSend));
    console.log(post);
    var postid = post.id;
    for (var i = 0; i < topics.length; i++) {
      var topic = await new DBOps().createTopic(JSON.stringify({id: topics[i]}));
      console.log(topic);
      var tag_input = {tagTopicId: topics[i], tagPostId: postid};
      var tag = await new DBOps().createTag(JSON.stringify(tag_input));
    }
    */
  }


  render() {
    const {text1, topics1} = this.state
    const enabled = this.handleLength(text1, topics1) &&
                    this.handleTopicNum(topics1);
    let buttonColor = enabled ? "primary" : "secondary"

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
                        maxlength="407"
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
                        maxlength="50"
                    />
                </InputGroup>
                <Button
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
