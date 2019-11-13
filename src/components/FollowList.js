// import react modules
import React, { Component, } from 'react';
import { Button,  ListGroup } from 'react-bootstrap';
// import custom modules
import { searchUser, getFollowers, getFollowing } from '../DBOps.js';
import DBOps from '../DBOps.js';
import { searchUser } from '../DBOps.js'
class FollowList extends Component {

    // pulls the num of followers and following on first render of component
    async initialPull() {

        getFollowers(this.props.username)
            .then((res)=>{
                console.log('follow list','initial pull','success pulling followers',res);
                var followers = res.data.getUser.followers.items;
                this.setState({ 'numFollowers': followers.length });
                this.setState({ 'followers': followers.map((follower)=>follower.id) }, ()=>console.log(this.state.followers));
            }, (err) => {
                console.log('follow list','initial pull','error',err);
            });

        getFollowing(this.props.username)
            .then((res)=>{
                console.log('follow list','initial pull','success pulling following',res);
                var following = res.data.getUser.following.items;
                this.setState({ 'numFollowing': following.length });
                this.setState({ 'following': following.map((following)=>following.id) }, ()=>console.log(this.state.following));
            }, (err) => {
                console.log('follow list','initial pull','error',err);
            });

        this.setState({'type':''});
    }

    constructor(props){
        super(props)
        this.state = {
            'isHidden' : true,
            'type' : 'initial',
            'numFollowers' : '',
            'numFollowing' : '',
            'list' : []
        }
    // searchState for database
    this.searchState = {
      id: ""
    }

    // bind functions
    this.initialPull = this.initialPull.bind(this);
    this.handleFollowerClick = this.handleFollowerClick.bind(this);
    this.handleFollowingClick = this.handleFollowingClick.bind(this);
  }

  // handler for clicking the follower button
    handleFollowerClick(){
        console.log('Handle follower button click');

        if(this.state.isHidden || this.state.type !== 'follower') {
        // cases of no list being rendered or following list rendered
            this.setState({
                'type' : 'follower',
                'isHidden' : false,
                'list': this.state.followers
            });
        }
        else {
            // case of followers already rendered, so hide the list
            this.setState({
                'type' : '',
                'isHidden' : true,
                'list': []
            });
        }
  }
  	// handler for clicking the following buton
  	handleFollowingClick(){
    	console.log('FollowList.js','handleFollowingClick()','called');

    if(this.state.isHidden || this.state.type !== 'following') {
      // cases of no list being rendered or follower list rendered
        this.setState({
            'type' : 'following',
            'isHidden' : false,
            'list': this.state.following
        });
    }
    else {
      // case of following already rendered, so hide the list
        this.setState({
            'type' : '',
            'isHidden' : true,
            'list' : []
        });
    }
  }

  render(){
    const {isHidden, type, list, numFollowers, numFollowing } = this.state;
    // initial call to pull num followers and following
    if(type === 'initial' && this.props.username){
      console.log(this.props.username);
      this.initialPull();
    }
    // setup header for when a list is displayed
    var header;
    if(type === 'follower'){
      header = numFollowers + " Followers";
    }
    else if(type === 'following'){
      header = numFollowing + " Following";
    }
    return(
    <div>
      <Button onClick={this.handleFollowerClick}>{numFollowers} Followers</Button>
      <br />
      <br />
      <Button onClick ={this.handleFollowingClick}>{numFollowing} Following</Button>
      <br />
      <br />
      <h5>{header}</h5>
      <ListGroup>
        {list.map(item => (
          <ListGroup.Item href={'/otherprofile/'+item} action key={item}>{item}</ListGroup.Item>
        ))}
      </ListGroup>
      </div>
    )
  }
}

export default FollowList;
