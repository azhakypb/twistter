import React, { Component, } from 'react';
import { Button,  ListGroup } from 'react-bootstrap';
import DBOps from '../DBOps.js';

class FollowList extends Component {
  async dataPull(){
    this.searchState = {id: this.props.username};
    console.log(this.searchState);
    var request = await new DBOps().searchUser(JSON.stringify(this.searchState)).catch((err)=>{console.log(err)});
    console.log(request.followers.items);
    
    var i = 0;
    var tempList = [];

    if(this.state.type == 'follower'){
      while(request.followers.items[i] != undefined){
        console.log(i);
        tempList.push(request.followers.items[i].id);
        i++;
      }
      console.log(tempList);
      this.setState({
              'numFollowers' : i
              });
    }
    else if(this.state.type == 'following'){
      while(request.following.items[i] != undefined){
       tempList.push(request.following.items[i].id);
        i++;
      }
       console.log(tempList);
       this.setState({
               'numFollowing' : i
               });
    }     
 
    this.setState(state => {
            const list = state.list.concat(tempList);
            return {
              list
                   };
            });
 
    console.log(this.state.list);
    
}
  constructor(props){
    super(props)
    this.state = {
      isHidden : true,
      'id' : this.props.username,
      'type' : 'initial',
      'numFollowers' : '',
      'numFollowing' : '',
      'list' : []
    }
    this.searchState = {
      id: ""
    }
    this.dataPull = this.dataPull.bind(this);
    this.handleFollowerClick = this.handleFollowerClick.bind(this);
    this.handleFollowingClick = this.handleFollowingClick.bind(this);
    console.log(this.props.username);
  } 
 
  handleFollowerClick(){
    console.log('Handle follower button click');
    if(this.state.isHidden || this.state.type != 'follower') {
      this.setState({
              'type' : 'follower',
              isHidden : false,
              list : []
              });
      this.dataPull();
    }
    else {
      this.setState({
           'type' : '',
           isHidden : true,
           list: []
           });
    }
  }

  handleFollowingClick(){
    console.log('Handle following button click');
    if(this.state.isHidden || this.state.type != 'following') {
      this.setState({
              'type' : 'following',
              isHidden : false,
              list : []
              });
      this.dataPull();
    }
    else {
      this.setState({
              'type' : '',
              isHidden : true,
              'list' : []
              });
    }
  }

  render(){
    const {isHidden, type, list, followers, following } = this.state;
    return(
      <div>
      <Button onClick={this.handleFollowerClick}>{this.state.numFollowers} Followers</Button>
      <br />
      <Button onClick ={this.handleFollowingClick}>{this.state.numFollowing} Following</Button>
      <br />
      <ListGroup>
        {list.map(item => (
          <ListGroup.Item key={item}>{item}</ListGroup.Item>
        ))}
      </ListGroup>
      </div>
    )
  }
}

export default FollowList;
