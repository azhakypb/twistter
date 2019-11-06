// import react modules
import React, { Component, } from 'react';
import { Button,  ListGroup } from 'react-bootstrap';
// import custom modules
import DBOps from '../DBOps.js';

class FollowList extends Component {
  // used to pull the followers and following names from the database
  async dataPull(){
    this.searchState = {id: this.props.username};
    console.log(this.searchState);
    var request = await new DBOps().searchUser(JSON.stringify(this.searchState)).catch((err)=>{console.log(err)});
    console.log(request);

    var i = 0; // counter to populate list of usernames
    var tempList = []; // temporary array to push to
    var usernameLen = this.props.username.length;

    if(this.state.type == 'follower'){
      while(request.getUser.followers.items[i] != undefined){
        // string must be manipulated to only show the follower
        var followerTemp = request.getUser.followers.items[i].id;
        tempList.push(followerTemp.substring(0, followerTemp.length - (usernameLen) ));
        i++;
      }
      // sets the current number of followers in case of change
      this.setState({
              'numFollowers' : i
              });
    }
    else if(this.state.type == 'following'){
      while(request.getUser.following.items[i] != undefined){
       // string manipulation to only show the following user
       var followingTemp = request.getUser.following.items[i].id;
       tempList.push(followingTemp.substring((usernameLen), followingTemp.length));
        i++;
      }
      // set the current num of following in case of change
      this.setState({
               'numFollowing' : i
               });
    }

    // populates the list state with contents of tempList
    this.setState(state => {
            const list = state.list.concat(tempList);
            return {
              list
                   };
            });

    console.log(this.state.list);

  }

  // pulls the num of followers and following on first render of component
  async initialPull() {
    this.searchState = {id: this.props.username};
    new DBOps().searchUser(JSON.stringify(this.searchState))
      .catch((err)=>{
        console.log('follow list','initial pull','error',err);
      })
      .then((res)=>{
        console.log('follow list','initial pull',res);
        var followNum = 0;
        var followingNum = 0;
        while(res.getUser.followers.items[followNum] != undefined){
          followNum++;
        }
        while(res.getUser.following.items[followingNum] != undefined){
          followingNum++;
        }
        this.setState({
          'numFollowers': followNum,
          'numFollowing' : followingNum,
          'type' : ''
        });
      });
  }

  constructor(props){
    super(props)
    this.state = {
      isHidden : true,
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
    this.dataPull = this.dataPull.bind(this);
    this.initialPull = this.initialPull.bind(this);
    this.handleFollowerClick = this.handleFollowerClick.bind(this);
    this.handleFollowingClick = this.handleFollowingClick.bind(this);
  }

  // handler for clicking the follower button
  handleFollowerClick(){
    console.log('Handle follower button click');

    if(this.state.isHidden || this.state.type != 'follower') {
      // cases of no list being rendered or following list rendered
      this.setState({
              'type' : 'follower',
              isHidden : false,
              list : []
              });
      this.dataPull();
    }
    else {
      // case of followers already rendered, so hide the list
      this.setState({
           'type' : '',
           isHidden : true,
           list: []
           });
    }
  }

  // handler for clicking the following buton
  handleFollowingClick(){
    console.log('follow list','handle following click','called');

    if(this.state.isHidden || this.state.type != 'following') {
      // cases of no list being rendered or follower list rendered
      this.setState({
              'type' : 'following',
              isHidden : false,
              list : []
              });
      this.dataPull();
    }
    else {
      // case of following already rendered, so hide the list
      this.setState({
              'type' : '',
              isHidden : true,
              'list' : []
              });
    }
  }

  render(){
    const {isHidden, type, list, numFollowers, numFollowing } = this.state;
    // initial call to pull num followers and following
    if(type == 'initial' && this.props.username){
      console.log(this.props.username);
      this.initialPull();
    }
    // setup header for when a list is displayed
    var header;
    if(type == 'follower'){
      header = numFollowers + " Followers";
    }
    else if(type == 'following'){
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
